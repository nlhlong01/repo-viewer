import React from 'react';

const Dropdown = (props) => {
  const { category, options, selected, onSelectedChange } = props;

  const listItems = options.map((option) => (
    <li key={option}>
      <button
        id={`filter-${category.toLowerCase()}-${option.toLowerCase()}`}
        className="dropdown-item btn"
        onClick={() => onSelectedChange(option)}
      >
        {option}
      </button>
    </li>
  ));

  return (
    <div
      id={`filter-${category.toLowerCase()}`}
      className="dropdown"
    >
      <button
        className="btn btn-secondary dropdown-toggle"
        type="button"
        id="dropdownMenuButton"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <span className="selected">{`${category}: `}</span> {selected}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {listItems}
      </ul>
    </div>
  );
};

export default Dropdown;
