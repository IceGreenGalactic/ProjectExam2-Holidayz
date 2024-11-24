import React, { useState } from "react";

const SearchBar = ({ onSearchChange }) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    onSearchChange(e.target.value);
  };

  return (
    <input
      type="text"
      value={query}
      onChange={handleSearchChange}
      placeholder="Search for venues..."
    />
  );
};

export default SearchBar;
