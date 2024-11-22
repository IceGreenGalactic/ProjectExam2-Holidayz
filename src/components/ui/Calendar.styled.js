import styled from "styled-components";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

export const StyledCalendar = styled(Calendar)`
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
  padding: 0px 0px 10px 0px;
  box-shadow: ${({ theme }) => theme.effects.shadow};
  font-family: ${({ theme }) => theme.fonts.body};

  .react-calendar__navigation {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    padding: 8px;
    border-radius: 8px 8px 0px 0px;
    box-shadow: ${({ theme }) => theme.effects.shadow};
  }

  .react-calendar__navigation button {
    background: none;
    border: none;
    color: ${({ theme }) => theme.colors.white};
    font-size: 16px;
    cursor: pointer;
    padding: 5px;
&:hover{
  background-color: transparent;
     }}

  .react-calendar__navigation button:disabled {
    color: gray;
  }

  .react-calendar__navigation__label {
    font-size: 16px;
    font-weight: bold;
  }
  .react-calendar__tile {
    color: ${({ theme }) => theme.colors.primary};
  &--active {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
}
    &:disabled {
    background-color: #79797931;
    color: ${({ theme }) => theme.colors.link};
    cursor: not-allowed;
}  &:enabled:hover {
      background-color: #ff8462ae;
      color: var(--bacground-color);
      transform: scale(1.1);
    }
  }
    
  
    

  .react-calendar__month-view__weekdays {
    font-weight: bold;
    color: ${({ theme }) => theme.colors.text};
  }

  .react-calendar__month-view__weekdays__weekday {
    padding: 10px;
  }

   button {
    padding: 5px 5px;
    cursor: pointer;
    font-family: var(--font-primary);
    
  
`;
