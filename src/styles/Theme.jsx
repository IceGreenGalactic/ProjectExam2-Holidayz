import { children } from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "var(--primary-color)",
    secondary: "var(--secondary-color)",
    background: "var(--background-color)",
    dark: "var(--dark-color)",
    hover: "var(--light-coral-color)",
    grey: "var(--grey-color)",
    white: "var(--white)",
    gradient:
      "linear-gradient(135deg, var(--primary-color), var(--secondary-color) 90%)",
  },

  fonts: {
    body: "'Raleway', sans-serif",
    heading: "'Righteous', cursive",
  },
};

export const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
