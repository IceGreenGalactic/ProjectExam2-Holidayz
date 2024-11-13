import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import GlobalStyle from "./styles/GlobalStyle.jsx";
import Theme from "./styles/Theme.jsx";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Theme>
          <GlobalStyle />
          <Layout>
            <Routes>
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Layout>
        </Theme>
      </Router>
    </HelmetProvider>
  );
}

export default App;
