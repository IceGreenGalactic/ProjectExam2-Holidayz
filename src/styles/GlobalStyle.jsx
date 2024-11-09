import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400&family=Righteous&display=swap');

  :root {
    --primary-color: #ff8362;
    --secondary-color: #95e1d3; 
    --background-color: #effdff;
    --dark-color: #333333;
    --light-dark: #555555;
    --grey-color: #f5f5f5;
    --white: #ffffff; 
    --light-coral-color: rgba(255, 131, 98, 0.9);
  }

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--background-color);
    font-family: 'Raleway', sans-serif;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  main {
    min-height: 100%;
    flex: 1;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: 'Righteous', cursive;
  }

  button {
    background-color: var(--primary-color); 
    color: var(--dark-color);
    border-radius: 20px;
    padding: 10px 20px;
    font-family: 'Righteous', cursive;
    cursor: pointer;
    border: none;
    transition: background-color 0.3s ease;
  }

  button:hover {
    background-color: var(--light-coral-color); 
  }
`;

export default GlobalStyles;
