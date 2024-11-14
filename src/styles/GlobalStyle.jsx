import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: 'Raleway';
    src: url('../../public/fonts/Raleway-VariableFont_wght.ttf') format('truetype');
    font-weight: 400 700; 
    font-style: normal;
  }

  @font-face {
    font-family: 'Righteous';
    src: url('../../public/fonts/Righteous-Regular.ttf') format('truetype');
    font-weight: 400 700;
    font-style: normal;
  }

  :root {
    --primary-color: #ff8362;
    --secondary-color: #95E1D3;
    --hover-color: #e96b50;
    --background-color: #F7F7F7 ;
    --card-background: #f4f4f4;
    --card-shadow: rgba(0, 0, 0, 0.1);
    --box-shadow: 0px 10px 20px rgba(0, 0, 0, 0.1);
    --link-color: #5A5A5A; 
    --text-color: #333333;
    --white-text: #ffffff;
  

    --font-primary: 'Righteous', cursive;
    --font-secondary: 'Raleway', sans-serif;
}

  /* Global Styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    background-color: var(--background-color); 
    color: var(--text-color); 
    font-family: var(--font-secondary); 
    display: block; 
    height: 100%; 
    width: 100%; 
  }
    

  /* Header styling */
  header {
    background-color: var(--primary-color);
    padding: 20px;
    color: var(--white-text);
    width: 100%;
  }

  h1{
      font-family: var(--font-primary);
}


  /* Main content area */
  main {
    background-color: var(--background-color); 
    min-height: 100vh; 
    
  }

  .card {
    background-color: var(--card-background);
    box-shadow: 0 4px 8px var(--card-shadow);
    padding: 20px;
    border-radius: 8px;
    width: 100%;
    max-width: 300px;
  }

 button {
    background-color: var(--primary-color);
    color: var(--white-text);
    padding: 5px 20px;
    border: none;
    border-radius: 20px;
    cursor: pointer;
    font-family: var(--font-primary);
    font-size: 1rem;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
      background-color: var(--hover-color);
      color: var(--background-color);
      transform: scale(1.1);
    }


  /* Link Styles */
  a {
    color: var(--link-color);
    text-decoration: underline;
  }

  a:hover {
    color: var(--primary-color);
  }
`;

export default GlobalStyle;
