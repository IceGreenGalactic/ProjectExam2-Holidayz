import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import { fetchVenues, createVenue } from "../api/venueApi";
import { toast } from "react-toastify";

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

  // Create a venue
  const useCreateVenue = async (venueData, token) => {
    try {
      const data = await createVenue(venueData, token);
      if (data) {
        setVenues((prev) => [...prev, data]);
        toast.success("Venue created successfully!", {
          position: "bottom-center",
        });
      } else {
        toast.error("Failed to create venue.", {
          position: "bottom-center",
        });
      }
    } catch (err) {
      console.error("Error in useCreateVenue:", err);
      toast.error(err.message || "An error occurred while creating venue.", {
        position: "bottom-center",
      });
    }
  };

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
        setSearchQuery,
        setSort,
        loadVenues,
        loadSingleVenue,
        useCreateVenue,
        setSearchQuery,
        setSort,
      }}
    >
      {children}
    </VenuesContext.Provider>
  );
};

export const useVenues = () => useContext(VenuesContext);
