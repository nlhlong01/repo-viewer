import React from 'react';
import Dropdown from './Dropdown';

const Search = () => {
  return (
    <div class="d-flex bd-highlight">
      <div class="p-2 flex-grow-1 bd-highlight">
        <input class="form-control"></input>
      </div>
      <div class="p-2 bd-highlight">
        <Dropdown></Dropdown>
      </div>
      <div class="p-2 bd-highlight">
        <Dropdown></Dropdown>
      </div>
    </div>
  );
};

export default Search;
