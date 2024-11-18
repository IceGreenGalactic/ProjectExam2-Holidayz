import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchVenues } from "../api/venueApi";

const VenuesContext = createContext();

export const VenuesProvider = ({ children }) => {
  const [venues, setVenues] = useState([]);
  const [singleVenue, setSingleVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch all venues
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

  // Function to fetch a single venue by ID
  const loadSingleVenue = async (id) => {
    try {
      const venueData = await fetchVenues(id);
      setSingleVenue(venueData);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <VenuesContext.Provider
      value={{
        venues,
        singleVenue,
        loading,
        error,
        loadSingleVenue,
      }}
    >
      {children}
    </VenuesContext.Provider>
  );
};

export const useVenues = () => useContext(VenuesContext);
