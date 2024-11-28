import React, { useRef, useEffect, useState } from "react";
import { PopupCalendar } from "../tools/Calendar";
import { formatDate } from "../../../utils/formatDate";
import { useNavigate } from "react-router-dom";
import { StyledBookingform } from "../allUiComponents.styled";

const BookingForm = ({
  dateRange,
  setDateRange,
  maxGuests,
  bookedDates,
  showCalendar,
  setShowCalendar,
  handleDateSelection,
}) => {
  const [error, setError] = useState(null);
  const [guestWarning, setGuestWarning] = useState(null);
  const calendarRef = useRef(null);
  const buttonRef = useRef(null);
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  const handleClickOutside = (e) => {
    if (
      calendarRef.current &&
      !calendarRef.current.contains(e.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(e.target) &&
      showCalendar
    ) {
      setShowCalendar(false);
    }
  };

  const isDateRangeAvailable = (startDate, endDate) => {
    return !bookedDates.some(
      (booking) =>
        (startDate >= booking.start && startDate <= booking.end) ||
        (endDate >= booking.start && endDate <= booking.end) ||
        (startDate <= booking.start && endDate >= booking.end)
    );
  };

  const handleAvailabilityCheck = (selectedDates) => {
    if (!showCalendar) {
      setError(null);
    }

    if (selectedDates?.length === 2) {
      const [startDate, endDate] = selectedDates;
      if (!isDateRangeAvailable(startDate, endDate)) {
        setError("Selected dates are not available!");
        setDateRange({ startDate: null, endDate: null });
      } else {
        setDateRange({ startDate, endDate });
        setShowCalendar(false);
        setError(null);
      }
    }
  };

  const handleGuestChange = (e) => {
    const newGuests = Number(e.target.value);
    if (newGuests === maxGuests) {
      setGuestWarning(`Max number of guests is ${maxGuests}`);
    } else {
      setGuestWarning(null);
    }
    if (newGuests <= maxGuests) {
      setGuests(newGuests);
      localStorage.setItem("selectedGuests", newGuests);
    }
  };

  const handleBookingButtonClick = () => {
    if (!dateRange?.startDate || !dateRange?.endDate) {
      setShowCalendar(true);
    } else {
      localStorage.setItem("selectedDates", JSON.stringify(dateRange));
      localStorage.setItem("guests", guests);
      navigate("/booking");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showCalendar]);

  return (
    <StyledBookingform>
      <label>
        Dates
        <input
          type="text"
          value={
            dateRange.startDate && dateRange.endDate
              ? `${formatDate(dateRange.startDate)} - ${formatDate(dateRange.endDate)}`
              : "check-in - check-out"
          }
          onClick={(e) => {
            if (!showCalendar) setShowCalendar(true);
            e.stopPropagation();
          }}
          readOnly
          className="form-control"
        />
      </label>

      {showCalendar && (
        <div ref={calendarRef}>
          <PopupCalendar
            dateRange={dateRange}
            handleDateSelection={handleAvailabilityCheck}
            bookedDates={bookedDates}
            error={error}
          />
        </div>
      )}

      <label>
        Guests
        <input
          type="number"
          name="guests"
          min="1"
          max={maxGuests}
          value={guests}
          onChange={handleGuestChange}
          required
          className="form-control"
        />
        {guestWarning && <p className="guest-warning">{guestWarning}</p>}
      </label>

      <button ref={buttonRef} type="button" onClick={handleBookingButtonClick}>
        {dateRange.startDate && dateRange.endDate
          ? "Book Venue"
          : "Select Dates"}
      </button>
    </StyledBookingform>
  );
};

export default BookingForm;
