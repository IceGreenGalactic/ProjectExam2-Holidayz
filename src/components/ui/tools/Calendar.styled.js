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
    &:hover {
      background-color: transparent;
    }
  }

  .react-calendar__navigation button:disabled {
    color: gray;
  }

  .react-calendar__tile {
    color: ${({ theme }) => theme.colors.link};
    &--active {
      background-color: ${({ theme }) => theme.colors.hover};
      color: ${({ theme }) => theme.colors.white};
    }
    &:disabled {
      background-color: #79797931;
      color: ${({ theme }) => theme.colors.link};
      cursor: not-allowed;
    }
    &:enabled:hover {
      background-color: #ff8462ae;
      color: var(--bacground-color);
      transform: scale(1.1);
    }
    &:focus {
      background-color: ${({ theme }) => theme.colors.secondary};
      color: ${({ theme }) => theme.colors.text};
    }
    &--now {
      color: ${({ theme }) => theme.colors.text};
      text-decoration: underline;
      background-color: ${({ theme }) => theme.colors.background};
    }
  }
  button {
    padding: 5px;
    cursor: pointer;
    font-family: var(--font-primary);
  }
`;

export const StyledPopupCalendar = styled(Calendar)`
  position:relative;
    .react-calendar__tile {
      color: ${({ theme }) => theme.colors.text};
      padding: 2px;
      border-radius: 0px;
  
    &:disabled {
      background-color: #79797931;
      color: ${({ theme }) => theme.colors.link};
      }
    &--active {
      background-color: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.white};
      }
    &:focus, &:hover {
      background-color: ${({ theme }) => theme.colors.secondary};
      }
    &--now{
      color: ${({ theme }) => theme.colors.text};
      text-decoration: underline;
      background-color: ${({ theme }) => theme.colors.background};
      }
    }
  }
  .react-calendar__navigation {
    background-color: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.white};
    box-shadow: ${({ theme }) => theme.effects.shadow};
    button{
    padding:0px;
    }

    &button:hover {
    background: none;
    }
  }`;
