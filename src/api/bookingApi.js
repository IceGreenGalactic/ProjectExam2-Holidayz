import { baseURL, appApiKey } from "./apiConstants";

export async function getAllBookings(token) {
  try {
    const query = `_customer=true&_venue=true`;
    const url = `${baseURL}/holidaze/bookings?${query}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": appApiKey,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to fetch bookings");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching bookings:", error.message);
    throw error;
  }
}

export async function getBookingDetails(bookingId, token) {
  try {
    const query = `_customer=true&_venue=true`;
    const url = `${baseURL}/holidaze/bookings/${bookingId}?${query}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": appApiKey,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error fetching booking details:", errorResponse);
      throw new Error(
        errorResponse.message || "Failed to fetch booking details."
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching booking details:", error.message);
    throw error;
  }
}

export async function createBooking(bookingData, token) {
  try {
    const url = `${baseURL}/holidaze/bookings`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": appApiKey,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(bookingData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error response:", errorResponse);
      throw new Error(errorResponse.message || "Failed to create booking.");
    }

    const data = await response.json();
    const bookingId = data?.data?.id;
    if (bookingId) {
      localStorage.setItem("bookingId", bookingId);
    }
    return data;
  } catch (error) {
    console.error("Error creating booking:", error.message);
    throw error;
  }
}

export async function updateBooking(bookingId, updatedData, token) {
  try {
    const url = `${baseURL}/holidaze/bookings/${bookingId}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": appApiKey,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to update booking.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating booking:", error.message);
    throw error;
  }
}

export async function deleteBooking(bookingId, token) {
  try {
    const url = `${baseURL}/holidaze/bookings/${bookingId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": appApiKey,
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "Failed to delete booking.");
    }

    return;
  } catch (error) {
    console.error("Error deleting booking:", error.message);
    throw error;
  }
}
