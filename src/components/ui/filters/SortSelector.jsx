import React from "react";
import PropTypes from "prop-types";
import { Select } from "../../../pages/VenueList/VenueList.styled";

const SortSelector = ({ sort, onSortChange }) => {
  return (
    <div className="d-block col-12 col-sm-6 justify-content-between  mb-4 mb-sm-0">
      <label htmlFor="sort-field" className="col-auto me-2">
        Sort By:
      </label>
      <Select
        id="sort-field"
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
      >
        <option value="price-asc">Lowest Price</option>
        <option value="price-desc">Highest Price</option>
        <option value="rating-desc">Highest Ratings</option>
        <option value="rating-asc">Lowest Ratings</option>
        <option value="name-asc">Name A-Z</option>
        <option value="name-desc">Name Z-A</option>
        <option value="created-desc">Newest Releases</option>
        <option value="created-asc">Oldest Releases</option>
      </Select>
    </div>
  );
};

SortSelector.propTypes = {
  sort: PropTypes.string,
  onSortChange: PropTypes.func,
};

export default SortSelector;
