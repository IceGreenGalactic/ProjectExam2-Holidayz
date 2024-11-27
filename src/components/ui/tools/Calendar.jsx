import React from "react";
import "react-calendar/dist/Calendar.css";
import { StyledCalendar, StyledPopupCalendar } from "./Calendar.styled";
import ReactCalendar from "react-calendar";

// Popup Calendar Component
export const PopupCalendar = ({
  dateRange,
  handleDateSelection,
  bookedDates,
}) => {
  return (
    <div
      style={{ maxWidth: "100%", zIndex: 100, left: "0", position: "absolute" }}
      className="ps-5 ps-md-0"
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
