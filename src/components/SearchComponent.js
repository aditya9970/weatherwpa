import React, { useState } from "react";
import "../App.css";

function SearchComponent() {
  const [input, setInput] = useState("");

  const handleChange = (event) => {
    setInput(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(input);
  };
  return (
    <div className="search__container">
      <input
        className="search__input"
        placeholder="Search"
        type="text"
        value={input}
        onChange={handleChange}
      />
      <button className="btn__search" onClick={handleSubmit}>
        <i className="fa fa-search btn__icon"></i>
      </button>
    </div>
  );
}

export default SearchComponent;
