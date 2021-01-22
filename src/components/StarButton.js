import React, { useState } from 'react';
import { graphql } from '@octokit/graphql';

const StarButton = (props) => {
  const [isStarred, setIsStarred] = useState(props.isStarred);
  let mutationType;
  let content;

  if (isStarred) {
    mutationType = 'removeStar';
    content = (
      <div>
        <i className="bi bi-star-fill"></i> Unstar
      </div>
    );
  } else {
    mutationType = 'addStar';
    content = (
      <div>
        <i className="bi bi-star"></i> Star
      </div>
    );
  }

  const onStarClick = async () => {
    const res = await graphql(
      `
        mutation {
          ${mutationType}(input: {starrableId: "${props.repoId}"}) {
            starrable {
              viewerHasStarred
            }
          }
        }
      `,
      {
        headers: {
          authorization: `token ${process.env.REACT_APP_TOKEN}`
        },
      }
    );

    setIsStarred(res[mutationType].starrable.viewerHasStarred);
  };

  return (
    <button
      type="button"
      className="star-button btn"
      onClick={async () => onStarClick()}
    >
      {content}
    </button>
  );
};

export default StarButton;
