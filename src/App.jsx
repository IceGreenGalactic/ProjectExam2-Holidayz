import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import NotFoundPage from "./pages/404NotFound/404NotFound.jsx";
import LoginModal from "./components/modals/auth/LoginModal.jsx";
import RegisterModal from "./components/modals/auth/RegisterModal.jsx";
import Profile from "./pages/profile/Profile";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </Layout>
        <LoginModal />
        <RegisterModal />
      </Router>
    </HelmetProvider>
  );
}

export default App;
