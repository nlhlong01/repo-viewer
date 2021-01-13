const Dropdown = (props) => {
  const { category, options, selected, onSelectedChange } = props;

  const listItems = options.map((option) => (
    <li key={option}>
      <a
        className="dropdown-item"
        href="#"
        onClick={() => onSelectedChange(option)}
      >
        {option}
      </a>
    </li>
  ));

  return (
    <div className="dropdown">
      <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-bs-toggle="dropdown" aria-expanded="false">
        {`${category}: ${selected}`}
      </button>
      <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton">
        {listItems}
      </ul>
    </div>
  );
};

export default Dropdown;
