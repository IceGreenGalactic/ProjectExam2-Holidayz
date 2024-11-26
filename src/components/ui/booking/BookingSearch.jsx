import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  StyledInput,
  SearchBookingContainer,
} from "../../../pages/VenueList/VenueList.styled";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

const SearchBooking = ({ filters, setFilters, onSearch }) => {
  const handleSearch = () => {
    onSearch(filters);
  };

  return (
    <SearchBookingContainer className="d-flex m-auto mt-3 my-5 justify-content-center">
      <section className="col-10 m-5">
        <div className="d-block d-md-flex m-auto justify-content-evenly mb-2">
          <StyledInput
            className="col-10 col-md-4 m-2"
            type="text"
            placeholder="Country"
            value={filters.country}
            onChange={(e) => {
              const newFilters = { ...filters, country: e.target.value };
              setFilters(newFilters);
            }}
          />
          <StyledInput
            className="col-10 col-md-4 m-2"
            type="date"
            value={filters.date}
            onChange={(e) => {
              const newFilters = { ...filters, date: e.target.value };
              setFilters(newFilters);
            }}
          />
          <StyledInput
            className="col-10 col-md-4 m-2"
            type="number"
            placeholder="Number of Guests"
            value={filters.guests}
            onChange={(e) => {
              const newFilters = { ...filters, guests: e.target.value };
              setFilters(newFilters);
            }}
          />
        </div>

        <div className="d-block d-md-flex align-items-center justify-content-start gap-5 mb-4">
          <div>
            <StyledInput
              type="checkbox"
              checked={filters.pets}
              onChange={(e) => {
                const newFilters = { ...filters, pets: e.target.checked };
                setFilters(newFilters);
              }}
            />
            <label className="mx-2">Pets Welcome</label>
            <FontAwesomeIcon icon={faPaw} />
          </div>
          <button className="m-auto m-md-0 my-2" onClick={handleSearch}>
            Search
          </button>
        </div>
      </section>
    </SearchBookingContainer>
  );
};

export default SearchBooking;
