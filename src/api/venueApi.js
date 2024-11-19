import { baseURL, appApiKey } from "./apiConstants";

export async function fetchVenues(id = null, page = 1, limit = 25) {
  try {
    const query = `_owner=true&_bookings=true`;

    const url = id
      ? `${baseURL}/holidaze/venues/${id}?${query}`
      : `${baseURL}/holidaze/venues?${query}&page=${page}&limit=${limit}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "X-Noroff-API-Key": appApiKey,
      },
    });

    if (!response.ok) {
      throw new Error(
        id ? `Failed to fetch venue with ID: ${id}` : "Failed to fetch venues."
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching venues:", error.message);
    throw error;
  }
}
