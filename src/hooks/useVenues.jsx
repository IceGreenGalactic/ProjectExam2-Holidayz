import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
} from "react";
import {
  fetchVenues,
  createVenue,
  updateVenue,
  deleteVenue,
} from "../api/venueApi";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

const VenuesContext = createContext();

export const VenuesProvider = ({ children }) => {
  const [venues, setVenues] = useState([]);
  const [singleVenue, setSingleVenue] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sort, setSort] = useState("name-asc");
  const [venueId, setVenueId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    pageSize: 100,
  });

  const { auth } = useAuth();

  const isOwner = (venueOwnerEmail) => {
    return auth?.data?.email === venueOwnerEmail;
  };

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
        console.error("Error loading venues:", err);
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

      if (data?.data?.id) {
        setVenueId(data.data.id);
      } else {
        console.error("Invalid or missing venue ID in response.");
      }
    } catch (err) {
      setError(err.message || err);
      console.error("Error loading single venue:", err);
    } finally {
      setLoading(false);
    }
  }, []);

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

  const useUpdateVenue = async (id, updatedData) => {
    try {
      if (!auth?.data?.accessToken) {
        throw new Error("Authentication token is missing");
      }

      const token = auth.data.accessToken;
      const data = await updateVenue(id, updatedData, token);

      if (data) {
        setVenues((prev) =>
          prev.map((venue) =>
            venue.id === id ? { ...venue, ...data.data } : venue
          )
        );
        toast.success("Venue updated successfully!", {
          position: "bottom-center",
        });
      } else {
        toast.error("Failed to update venue.", {
          position: "bottom-center",
        });
      }
    } catch (err) {
      console.error("Error in useUpdateVenue:", err);
      toast.error(
        err.message || "An error occurred while updating the venue.",
        {
          position: "bottom-center",
        }
      );
    }
  };

  const useDeleteVenue = async (id) => {
    try {
      if (!auth?.data?.accessToken) {
        throw new Error("Authentication token is missing");
      }

      const token = auth.data.accessToken;

      await deleteVenue(id, token);
      setVenues((prev) => prev.filter((venue) => venue.id !== id));

      toast.success("Venue deleted successfully!", {
        position: "bottom-center",
      });
    } catch (err) {
      console.error("Error in useDeleteVenue:", err);
      toast.error(
        err.message || "An error occurred while deleting the venue.",
        {
          position: "bottom-center",
        }
      );
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
        venueId,
        setSearchQuery,
        setSort,
        setVenueId,
        loadVenues,
        loadSingleVenue,
        useCreateVenue,
        useUpdateVenue,
        useDeleteVenue,
        setSearchQuery,
        setSort,
        createVenue,
        updateVenue,
        isOwner,
      }}
    >
      {children}
    </VenuesContext.Provider>
  );
};

export const useVenues = () => useContext(VenuesContext);
