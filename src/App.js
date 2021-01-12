import React, { useState, useEffect } from 'react';
import { graphql } from '@octokit/graphql';
import RepoList from './components/RepoList';
import Search from './components/Search';

const App = () => {
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    (async () => {
      const response = await graphql(
        `
          {
            search(query: "org:facebook react", type: REPOSITORY, first: 10) {
              edges {
                node {
                  ... on Repository {
                    name
                    description
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
      setRepos(response.search.edges.map((edge) => ({
        name: edge.node.name,
        description: edge.node.description,
        url: edge.node.url
      })));
    })();
  }, []);

  return (
    <div class="container-sm">
      <Search></Search>
      <RepoList repos={repos}></RepoList>
    </div>
  );
};

export default App;
