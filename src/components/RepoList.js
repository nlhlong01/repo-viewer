import React from 'react';
import StarButton from './StarButton';

export const RepoList = (props) => {
  const { repos } = props; 
  const listItems = [];

  const maxLength = repos.length > 10 ? 10 : repos.length;
  for (let i = 0; i < maxLength; i++) {
    const { name, description, url } = repos[i];
    const listItem = (
      <li
        key={name}
        className={`list-group-item col-12 d-flex width-full py-4 border-bottom`}
      >
        <div className="col-10 col-lg-9 d-inline-block">
          <h3 className="wb-break-all">
            <a className="d-inline-block text-decoration-none" href={url}>
              {name}
            </a>
          </h3>
          <p className="break-word text-gray text-muted">
            {description}
          </p>
        </div>
        <div className="col-2 col-lg-3 d-flex justify-content-end align-items-center">
          <StarButton></StarButton>
        </div>
      </li>
    );
    listItems[i] = listItem;
  }

  return (
    <ul className="list-group-flush p-2">
      {listItems}
    </ul>
  );
};

export default RepoList;
