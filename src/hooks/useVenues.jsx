import React, { createContext, useContext, useState, useCallback } from "react";
import { fetchVenues } from "../api/venueApi";

const VenuesContext = createContext();

export const VenuesProvider = ({ children }) => {
  const [venues, setVenues] = useState([]);
  const [singleVenue, setSingleVenue] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 25,
  });

  const loadVenues = useCallback(
    async ({ page = 1, limit = 25, searchQuery = "" } = {}) => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchVenues(null, page, limit, searchQuery); // Pass searchQuery here if it's available
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
    },
    []
  );

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
        searchQuery,
        loadVenues,
        loadSingleVenue,
        setVenues,
        setSearchQuery,
      }}
    >
      {children}
    </VenuesContext.Provider>
  );
};

export const useVenues = () => useContext(VenuesContext);
