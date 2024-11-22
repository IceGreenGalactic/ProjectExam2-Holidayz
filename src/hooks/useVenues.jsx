import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchVenues } from "../api/venueApi";

const VenuesContext = createContext();

export const VenuesProvider = ({ children }) => {
  const [venues, setVenues] = useState([]);
  const [singleVenue, setSingleVenue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 25,
  });

  const loadVenues = async ({ page = 1, limit = 25 } = {}) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchVenues(null, page, limit);
      if (page === 1) {
        setVenues(data.data || []);
      } else {
        setVenues((prevVenues) => [...prevVenues, ...(data.data || [])]);
      }

      setPagination({
        currentPage: data.meta?.currentPage || page,
        totalPages: data.meta?.pageCount || 1,
        pageSize: limit,
      });

      return data;
    } catch (err) {
      setError(err.message || err);
    } finally {
      setLoading(false);
    }
  };

  const loadSingleVenue = useCallback(async (id) => {
    setLoading(true);
    setError(null);

    try {
      const data = await fetchVenues(id);
      setSingleVenue(data.data || null);
    } catch (err) {
      setError(err.message || err);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <VenuesContext.Provider
      value={{
        venues,
        singleVenue,
        loading,
        error,
        pagination,
        loadVenues,
        loadSingleVenue,
        setVenues,
      }}
    >
      {children}
    </VenuesContext.Provider>
  );
};

export const useVenues = () => useContext(VenuesContext);
