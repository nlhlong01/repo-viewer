import React, { useState, useEffect } from 'react';
import { graphql } from '@octokit/graphql';
import Dropdown from './Dropdown';
import RepoList from './RepoList';

const Search = () => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [languages, setLanguages] = useState([]);
  const [language, setLanguage] = useState('All');
  const [repoType, setRepoType] = useState('All');
  const [repos, setRepos] = useState([]);

  const repoTypes = {
    'All': '',
    'Forks': 'isFork',
    'Archived': 'isArchived',
    'Mirrors': 'isMirror'
  };

  const search = async (term) => {
    const res = await graphql(
      `
        {
          search(
            query: "org:facebook language:${language} ${term}",
            type: REPOSITORY,
            first: 50)
          {
            nodes {
              ... on Repository {
                name
                description
                url
                isArchived
                isFork
                isMirror
                languages(first: 1, orderBy: {field: SIZE, direction: DESC}) {
                  nodes {
                    name
                  }
                }
              }
            }
          }
        }
      `,
      {
        headers: {
          authorization: `token ce0b9573a80ac4f00ffc0f1c5702ec2fae0e9c70`,
        },
      }
    );
    return res;
  };

  /**
   * Look for the dominant languages in all repos.
   */
  useEffect(() => {
    const searchLanguages = async () => {
      const res = await search('');
      const languages = res.search.nodes
        .filter((val) => val.languages.nodes.length !== 0)
        .map((val) => val.languages.nodes[0].name)
        .filter((val, idx, arr) => arr.indexOf(val) === idx)
        .sort();
      setLanguages(['All', ...languages]);
    };
    searchLanguages();
  }, []);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);
    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const searchRepos = async () => {
      const res = await search(debouncedTerm);
      if (res.search.nodes.length === 0) setRepos([]);
      setRepos(res.search.nodes.map((node) => {
        return {
          name: node.name,
          description: node.description,
          url: node.url
        };
      }));
    };
    searchRepos();
  }, [debouncedTerm, language]);

  useEffect(() => {
    const searchRepos = async () => {
      const res = await search(debouncedTerm);
      if (res.search.nodes.length === 0) setRepos([]);
      const results = res.search.nodes
        .filter((node) => node[repoTypes[repoType]] === true)
        .map((node) => {
          return {
            name: node.name,
            description: node.description,
            url: node.url
          };
        });
      setRepos(results);
    };
    searchRepos();
  }, [repoType]);

  const getKeyFromValue = (obj, val) => {
    for (const key in obj) if (obj[key] === val) return key;
    return undefined;
  };

  return (
    <div>
      <div className="d-flex bd-highlight border-bottom">
        <div className="p-2 flex-grow-1 bd-highlight">
          <input
            className="form-control"
            value={term}
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>
        <div className="p-2 bd-highlight">
          <Dropdown
            options={Object.keys(repoTypes)}
            category="Type"
            selected={repoType}
            onSelectedChange={setRepoType}
          />
        </div>
        <div className="p-2 bd-highlight">
          <Dropdown
            options={languages}
            category="Language"
            selected={language}
            onSelectedChange={setLanguage}
          />
        </div>
      </div>
      <RepoList repos={repos}></RepoList>
    </div>
  );
};

export default Search;
