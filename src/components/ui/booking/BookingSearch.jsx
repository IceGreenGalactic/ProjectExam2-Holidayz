import React from "react";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  StyledInput,
  SearchBookingContainer,
} from "../../../pages/VenueList/VenueList.styled";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

const SearchBooking = ({ filters, setFilters, onSearch }) => (
  <SearchBookingContainer className="d-flex m-auto mt-3 my-5 justify-content-center">
    <section className="col-10 m-5">
      <div className="d-block d-md-flex m-auto justify-content-evenly mb-2">
        <StyledInput
          className="col-10 col-md-4 m-2"
          type="text"
          placeholder="Country"
          value={filters.country}
          onChange={(e) => setFilters({ ...filters, country: e.target.value })}
        />
        <StyledInput
          className="col-10 col-md-4 m-2"
          type="date"
          value={filters.date}
          onChange={(e) => setFilters({ ...filters, date: e.target.value })}
        />
        <StyledInput
          className="col-10 col-md-4 m-2"
          type="number"
          placeholder="Number of Guests"
          value={filters.guests}
          onChange={(e) => setFilters({ ...filters, guests: e.target.value })}
        />
      </div>

      <div className="d-block d-md-flex align-items-center justify-content-start gap-5 mb-4">
        <div>
          <StyledInput
            type="checkbox"
            checked={filters.pets}
            onChange={(e) => setFilters({ ...filters, pets: e.target.checked })}
          />
          <label className="mx-2">Pets Welcome</label>
          <FontAwesomeIcon icon={faPaw} />
        </div>
        <button className="m-auto m-md-0 my-2" onClick={onSearch}>
          Search
        </button>
      </div>
    </section>
  </SearchBookingContainer>
);

SearchBookingContainer.propTypes = {
  filters: PropTypes.object,
  setFilters: PropTypes.func,
  onSearch: PropTypes.func,
};

export default SearchBooking;
