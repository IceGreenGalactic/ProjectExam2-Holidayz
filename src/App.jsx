import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import "./App.css";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <main></main>
      </Router>
    </HelmetProvider>
  );
}

export default App;
