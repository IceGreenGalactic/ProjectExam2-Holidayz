import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { fetchVenues } from "../api/venueApi";

const VenuesContext = createContext();

export const VenuesProvider = ({ children }) => {
  const [venues, setVenues] = useState([]);
  const [singleVenue, setSingleVenue] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("name-asc");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 100,
  });

  const loadVenues = useCallback(
    async ({
      page = 1,
      limit = 100,
      searchQuery = "",
      sort = "name-asc",
    } = {}) => {
      setLoading(true);
      setError(null);

      let allVenues = [];
      let totalPages = 1;

      try {
        while (page <= totalPages) {
          const data = await fetchVenues(null, page, limit, searchQuery, sort);

          allVenues = [...allVenues, ...(data.data || [])];

          totalPages = data.meta?.pageCount || 1;

          page++;
        }

        setVenues(allVenues);

        setPagination({
          currentPage: 1,
          totalPages: 1,
          pageSize: limit,
        });
      } catch (err) {
        setError(err.message || err);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    loadVenues({ sort, searchQuery });
  }, [sort, searchQuery, loadVenues]);

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
        sort,
        loadVenues,
        loadSingleVenue,
        setVenues,
        setSearchQuery,
        setSort,
      }}
    >
      {children}
    </VenuesContext.Provider>
  );
};

export const useVenues = () => useContext(VenuesContext);
