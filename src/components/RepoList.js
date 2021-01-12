import React from 'react';
import StarButton from './StarButton';

export const RepoList = (props) => {
  const listItems = props.repos.map((repo, idx, arr) => {
    const extraBorder = idx === 0
      ? 'border-top'
      : idx === arr.length - 1
      ? 'border-bottom'
      : '';
    return (
      <li class={`list-group-item col-12 d-flex width-full py-4 no-padding ${extraBorder}`}>
        <div class="col-10 col-lg-9 d-inline-block">
          <h3 class="wb-break-all">
            <a class="d-inline-block text-decoration-none" href={repo.url}>
              {repo.name}
            </a>
          </h3>
          <p class="break-word text-gray text-muted">
            {repo.description}
          </p>
        </div>
        <div class="col-2 col-lg-3 d-flex justify-content-end align-items-center">
          <StarButton></StarButton>
        </div>
      </li>
    );
  });

  return (
    <ul class="list-group-flush p-2">
      {listItems}
    </ul>
  );
};

export default RepoList;
