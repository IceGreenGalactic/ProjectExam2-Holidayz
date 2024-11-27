import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { PopupCalendar } from "../tools/Calendar";
import { formatDate } from "../../../utils/formatDate";
import {
  StyledInput,
  SearchBookingContainer,
} from "../../../pages/VenueList/VenueList.styled";
import { faPaw } from "@fortawesome/free-solid-svg-icons";

const SearchBooking = ({ filters, setFilters, onSearch, bookedDates }) => {
  const [showCalendar, setShowCalendar] = useState(false);

  const handleDateSelection = (dateRange) => {
    const [startDate, endDate] = dateRange;
    const newFilters = {
      ...filters,
      checkInDate: startDate,
      checkOutDate: endDate,
    };
    setFilters(newFilters);
    setShowCalendar(false);
  };

  const handleSearch = () => {
    onSearch(filters);
  };

  const toggleCalendar = () => {
    setShowCalendar(!showCalendar);
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
            type="text"
            placeholder="Select Dates"
            value={
              filters.checkInDate && filters.checkOutDate
                ? `${formatDate(filters.checkInDate)} - ${formatDate(filters.checkOutDate)}`
                : ""
            }
            readOnly
            onClick={toggleCalendar}
          />
          {showCalendar && (
            <PopupCalendar
              dateRange={{
                startDate: filters.checkInDate,
                endDate: filters.checkOutDate,
              }}
              handleDateSelection={handleDateSelection}
              bookedDates={bookedDates}
            />
          )}

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
