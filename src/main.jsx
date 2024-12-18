import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { AuthProvider } from "./hooks/useAuth.jsx";
import { ProfileProvider } from "./hooks/useProfile.jsx";
import { VenuesProvider } from "./hooks/useVenues.jsx";
import { BookingProvider } from "./hooks/useBookings.jsx";
import { ToastContainer } from "react-toastify";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "bootstrap-icons/font/bootstrap-icons.css";

import App from "./App.jsx";
import "./index.css";
import GlobalStyle from "./styles/GlobalStyle.jsx";
import Theme from "./styles/Theme.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />
    <AuthProvider>
      <ProfileProvider>
        <BookingProvider>
          <VenuesProvider>
            <Theme>
              <GlobalStyle />
              <App />
            </Theme>
          </VenuesProvider>
        </BookingProvider>
      </ProfileProvider>
    </AuthProvider>
  </StrictMode>
);
