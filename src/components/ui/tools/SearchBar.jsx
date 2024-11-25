import React, { useState } from "react";
import { StyledSearchbar, SearchBarButton } from "../../allUiComponents.styled";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBar = ({ onSearchChange }) => {
  const [query, setQuery] = useState("");

  const handleSearchChange = (e) => {
    setQuery(e.target.value);
    onSearchChange(e.target.value);
  };
  const handleSearchClick = () => {
    onSearchChange(query);
  };

  return (
    <div className="input-group flex-nowrap">
      <StyledSearchbar
        className="col-6 col-sm-8"
        type="text"
        value={query}
        onChange={handleSearchChange}
        placeholder="Search for venues..."
      />
      <SearchBarButton type="button" onClick={handleSearchClick}>
        <FontAwesomeIcon icon={faSearch} />
      </SearchBarButton>
    </div>
  );
};

export default SearchBar;
