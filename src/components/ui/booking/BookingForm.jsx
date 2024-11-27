import React, { useRef, useEffect, useState } from "react";
import { PopupCalendar } from "../tools/Calendar";
import { formatDate } from "../../../utils/formatDate";
import { useNavigate } from "react-router-dom";

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
  const [guests, setGuests] = useState(1);
  const navigate = useNavigate();

  const handleClickOutside = (e) => {
    if (calendarRef.current && !calendarRef.current.contains(e.target)) {
      setShowCalendar(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const isDateRangeAvailable = (startDate, endDate) => {
    for (let booking of bookedDates) {
      if (
        (startDate >= booking.start && startDate <= booking.end) ||
        (endDate >= booking.start && endDate <= booking.end) ||
        (startDate <= booking.start && endDate >= booking.end)
      ) {
        return false;
      }
    }
    return true;
  };

  const handleAvailabilityCheck = (selectedDates) => {
    if (selectedDates && selectedDates.length === 2) {
      const [startDate, endDate] = selectedDates;
      if (!isDateRangeAvailable(startDate, endDate)) {
        setError("Selected dates are not available!");
      } else {
        setDateRange({
          startDate: selectedDates[0],
          endDate: selectedDates[1],
        });
        setShowCalendar(false);
        setError(null);
      }
    }
  };

  const handleGuestChange = (e) => {
    let newGuests = Number(e.target.value);

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
      setShowCalendar(true); // Show calendar if dates are not selected
    } else {
      localStorage.setItem("selectedDates", JSON.stringify(dateRange));
      localStorage.setItem("guests", guests);
      navigate("/booking");
    }
  };

  return (
    <form>
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
            setShowCalendar(true); // Trigger calendar when clicked
            e.stopPropagation();
          }}
          readOnly
          className="form-control"
        />
      </label>

      {error && (
        <p
          style={{
            color: "red",
            position: "absolute",
            top: "38%",
            left: "10%",
            zIndex: 10,
            fontSize: "14px",
          }}
        >
          {error}
        </p>
      )}

      {showCalendar && (
        <div ref={calendarRef}>
          <PopupCalendar
            dateRange={dateRange}
            handleDateSelection={handleAvailabilityCheck}
            bookedDates={bookedDates}
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
        {guestWarning && (
          <p
            style={{
              position: "relative",
              top: "10px",
              left: "5%",
              zIndex: 10,
              fontSize: "14px",
              background: "none",
              fontWeight: "200",
            }}
          >
            {guestWarning}
          </p>
        )}
      </label>

      <button type="button" onClick={handleBookingButtonClick}>
        {dateRange.startDate && dateRange.endDate
          ? "Book Venue"
          : "Select Dates"}
      </button>
    </form>
  );
};

export default BookingForm;
