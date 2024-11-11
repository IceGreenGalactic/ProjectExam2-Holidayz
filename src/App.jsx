import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import GlobalStyles from "./styles/GlobalStyle.jsx";
import Theme from "./styles/Theme.jsx";
import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/Home/Home.jsx";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Theme>
          <GlobalStyles />
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
