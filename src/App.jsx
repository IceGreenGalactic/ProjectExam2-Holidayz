import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import GlobalStyles from "./styles/GlobalStyle.jsx";
import Theme from "./styles/Theme.jsx";
function App() {
  return (
    <HelmetProvider>
      <Router>
        <Theme>
          <GlobalStyles />
          <main></main>
        </Theme>
      </Router>
    </HelmetProvider>
  );
}

export default App;
