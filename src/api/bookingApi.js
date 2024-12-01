import { baseURL, appApiKey } from "./apiConstants";
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
