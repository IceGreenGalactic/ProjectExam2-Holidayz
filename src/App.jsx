import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";

import Layout from "./components/layout/Layout.jsx";
import HomePage from "./pages/HomePage/HomePage.jsx";
import NotFoundPage from "./pages/404NotFound/404NotFound.jsx";
import LoginModal from "./components/modals/auth/LoginModal.jsx";
import RegisterModal from "./components/modals/auth/RegisterModal.jsx";
import Profile from "./pages/Profile/Profile.jsx";
import VenueListing from "./pages/VenueList/VenueList.jsx";
import SingleVenue from "./pages/SingleVenue/SingleVenue.jsx";
import CreateVenueModal from "./components/modals/venue/CreateVenueModal.jsx";

function App() {
  return (
    <HelmetProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<NotFoundPage />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/venues" element={<VenueListing />} />
            <Route path="/venue/:id" element={<SingleVenue />} />
          </Routes>
        </Layout>
        <LoginModal />
        <RegisterModal />
        <CreateVenueModal />
      </Router>
    </HelmetProvider>
  );
}

export default App;
