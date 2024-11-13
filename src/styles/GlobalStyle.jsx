import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
@import url('https://fonts.googleapis.com/css2?family=Raleway:wght@400;700&family=Righteous&display=swap');

  :root {
    --primary-color: #ff8362;
    --secondary-color: #95E1D3;
    --hover-color: #e96b50;
    --content-background: #ffffff;
    --background-color: #EAEAEA;
    --card-background: #f4f4f4;
    --card-shadow: rgba(0, 0, 0, 0.1);
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
    background-color: var(--content-background);
    display: flex;
    align-items: center; 
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
    }

  button:hover {
    background-color: var(--hover-color);
    color: var(--white-text);
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
