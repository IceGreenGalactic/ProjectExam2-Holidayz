import React from "react";
import "react-calendar/dist/Calendar.css";
import { StyledCalendar } from "./Calendar.styled";

const DateRangeCalendar = ({ dateRange, handleDateSelection, bookedDates }) => {
  return (
    <div className="position-relative col-12 col-md-11" style={{ zIndex: 10 }}>
      <StyledCalendar
        onChange={handleDateSelection}
        value={[dateRange.startDate, dateRange.endDate]}
        defaultView={"month"}
        selectRange={true}
        showNavigation={true}
        tileDisabled={({ date }) =>
          bookedDates.some((range) => date >= range.start && date <= range.end)
        }
      />
    </div>
  );
};

export default DateRangeCalendar;
