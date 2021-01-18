import React, { useState, useEffect } from 'react';
import { graphql } from '@octokit/graphql';
import Dropdown from './components/Dropdown';
import RepoList from './components/RepoList';

const repoTypes = {
  'All': '',
  'Sources': 'fork:false archived:false mirror:false',
  'Forks': 'fork:only',
  'Archived': 'archived:true',
  'Mirrors': 'mirror:true'
};

const App = () => {
  const [term, setTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState(term);
  const [languages, setLanguages] = useState([]);
  const [selectedLang, setSelectedLang] = useState('All');
  const [repoType, setRepoType] = useState('All');
  const [repos, setRepos] = useState([]);

  /**
   * Look for the dominant languages in all repos.
   */
  useEffect(() => {
    const queryLanguages = async () => {
      const { search } = await graphql(
        `
          query {
            search(
              query: "org:facebook",
              type: REPOSITORY,
              first: 50
            )
            {
              nodes {
                ... on Repository {
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
            authorization: `token ${process.env.REACT_APP_TOKEN}`
          }
        }
      );

      const languages = search.nodes
        .filter((val) => val.languages.nodes.length !== 0)
        .map((val) => val.languages.nodes[0].name)
        .filter((val, idx, arr) => arr.indexOf(val) === idx)
        .sort();

      setLanguages(['All', ...languages]);
    };

    queryLanguages();
  }, []);

  /**
   * Set a 500ms delay between last search keystroke and query sending. 
   */
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(term);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [term]);

  useEffect(() => {
    const queryRepos = async () => {
      const { search } = await graphql(
        `
          query {
            search(
              query: "
                org:facebook
                language:${selectedLang}
                ${repoTypes[repoType]}
                ${debouncedTerm}
              ",
              type: REPOSITORY,
              first: 50
            )
            {
              nodes {
                ... on Repository {
                  id
                  name
                  description
                  url
                  viewerHasStarred
                }
              }
            }
          }
        `,
        {
          headers: {
            authorization: `token ${process.env.REACT_APP_TOKEN}`
          }
        }
      );

      setRepos(search.nodes.map((node) => {
        return {
          id: node.id,
          name: node.name,
          description: node.description,
          url: node.url,
          isStarred: node.viewerHasStarred
        };
      }));
    };

    queryRepos();
  }, [debouncedTerm, repoType, selectedLang]);

  return (
    <div className="container">
      {/* Top menu */}
      <div className="menu d-flex bd-highlight border-bottom py-3">
        {/* Search bar */}
        <div className="menu-item flex-grow-1 bd-highlight">
          <input
            className="form-control"
            value={term}
            placeholder="Find a repository..."
            onChange={(e) => setTerm(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="menu-item bd-highlight">
          <Dropdown
            options={Object.keys(repoTypes)}
            category="Type"
            selected={repoType}
            onSelectedChange={setRepoType}
          />
        </div>
        <div className="menu-item bd-highlight">
          <Dropdown
            options={languages}
            category="Language"
            selected={selectedLang}
            onSelectedChange={setSelectedLang}
          />
        </div>
      </div>

      <RepoList repos={repos}></RepoList>
    </div>
  );
};

export default App;
