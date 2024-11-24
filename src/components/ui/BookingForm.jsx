import React, { useRef, useEffect } from "react";
import { PopupCalendar } from "./Calendar";
const BookingForm = ({
  dateRange,
  setDateRange,
  maxGuests,
  bookedDates,
  showCalendar,
  setShowCalendar,
  handleDateSelection,
}) => {
  const calendarRef = useRef(null);

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

  return (
    <form>
      <label>
        Dates
        <input
          type="text"
          value={
            dateRange.startDate && dateRange.endDate
              ? `${dateRange.startDate.toDateString()} - ${dateRange.endDate.toDateString()}`
              : "check-in - check-out"
          }
          onClick={(e) => {
            setShowCalendar(true);
            e.stopPropagation();
          }}
          readOnly
          className="form-control"
        />
      </label>

      {showCalendar && (
        <div ref={calendarRef} className="">
          <PopupCalendar
            dateRange={dateRange}
            handleDateSelection={handleDateSelection}
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
          required
          className="\"
        />
      </label>

      <button type="submit">Find Dates</button>
    </form>
  );
};

export default BookingForm;
