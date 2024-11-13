import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Layout from "./components/layout/Layout.jsx";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes></Routes>
        </Layout>
      </Router>
    </HelmetProvider>
  );
}

export default App;
