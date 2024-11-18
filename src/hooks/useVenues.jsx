import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchVenues } from "../api/venueApi";

const VenuesContext = createContext();

export const VenuesProvider = ({ children }) => {
  const [venues, setVenues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadVenues = async () => {
      try {
        const venueData = await fetchVenues();
        setVenues(venueData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadVenues();
  }, []);

  return (
    <VenuesContext.Provider value={{ venues, loading, error }}>
      {children}
    </VenuesContext.Provider>
  );
};

export const useVenues = () => useContext(VenuesContext);
