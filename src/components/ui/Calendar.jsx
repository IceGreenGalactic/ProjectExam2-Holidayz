import React from "react";
import "react-calendar/dist/Calendar.css"; // Import default react-calendar styling
import { StyledCalendar, StyledPopupCalendar } from "./Calendar.styled"; // Import your custom StyledCalendar
import ReactCalendar from "react-calendar"; // Default react-calendar component

// Popup Calendar Component
export const PopupCalendar = ({
  dateRange,
  handleDateSelection,
  bookedDates,
}) => {
  return (
    <div
      className="position-absolute"
      style={{ maxWidth: "100%", zIndex: 100 }}
    >
      <StyledPopupCalendar
        onChange={handleDateSelection}
        value={[dateRange.startDate, dateRange.endDate]}
        selectRange={true}
        showNavigation={true}
        tileDisabled={({ date }) =>
          bookedDates.some((range) => date >= range.start && date <= range.end)
        }
      />
    </div>
  );
};

// Always Open Calendar Component
export const AlwaysOpenCalendar = ({
  dateRange,
  handleDateSelection,
  bookedDates,
}) => {
  return (
    <div style={{ zIndex: 1 }}>
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
