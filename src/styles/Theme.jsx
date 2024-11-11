import { children } from "react";
import { ThemeProvider } from "styled-components";

const theme = {
  colors: {
    primary: "var(--primary-color)",
    secondary: "var(--secondary-color)",
    background: "var(--background-color)",
    text: "var(--text-color)",
    hover: "var(--hover-color)",
    white: "var(--white-text)",
    gradient:
      "linear-gradient(135deg, var(--primary-color), var(--secondary-color) 90%)",
  },

  fonts: {
    body: "var(--font-secondary)",
    heading: "var(--font-primary)",
  },
};

export const Theme = ({ children }) => (
  <ThemeProvider theme={theme}>{children}</ThemeProvider>
);

export default Theme;
