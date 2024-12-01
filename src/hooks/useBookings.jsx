import React, { createContext, useContext, useState, useEffect } from "react";
import {
  createBooking,
  getBookingDetails,
  getAllBookings,
} from "../api/bookingApi";
import { useAuth } from "./useAuth";
import { toast } from "react-toastify";

const BookingContext = createContext();

export const BookingProvider = ({ children }) => {
  const { auth } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const createNewBooking = async (bookingData) => {
    if (!auth?.data?.accessToken) {
      toast.error("Authentication token is missing", {
        position: "bottom-center",
      });
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await createBooking(bookingData, auth.data.accessToken);
      toast.success("Booking created successfully!", {
        position: "bottom-center",
      });
      return data;
    } catch (err) {
      setError(err.message || "An error occurred while creating the booking.");
      toast.error(err.message || "Failed to create booking.", {
        position: "bottom-center",
      });
    } finally {
      setLoading(false);
    }
  };

  const useGetBookingDetails = (bookingId) => {
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      if (!bookingId) return;

      setLoading(true);
      setError(null);

      const fetchBookingDetails = async () => {
        try {
          const data = await getBookingDetails(
            bookingId,
            auth?.data?.accessToken
          );
          setDetails(data?.data);
        } catch (err) {
          setError(err.message || "Failed to fetch booking details.");
        } finally {
          setLoading(false);
        }
      };

      fetchBookingDetails();
    }, [bookingId]);

    return { bookingDetails: details, loading, error };
  };

  const useGetAllBookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
      const fetchBookings = async () => {
        if (!auth?.data?.accessToken) {
          setError("Authentication token is missing.");
          return;
        }

        setLoading(true);
        setError(null);

        try {
          const data = await getAllBookings(auth.data.accessToken);
          setBookings(data?.data || []);
        } catch (err) {
          setError(err.message || "Failed to fetch all bookings.");
        } finally {
          setLoading(false);
        }
      };

      if (auth?.data?.accessToken) {
        fetchBookings();
      }
    }, [auth]);

    return { bookings, loading, error };
  };

  return (
    <BookingContext.Provider
      value={{ createNewBooking, useGetBookingDetails, useGetAllBookings }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => useContext(BookingContext);
