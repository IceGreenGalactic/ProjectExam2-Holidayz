import { baseURL, appApiKey } from "./apiConstants";

export async function fetchVenues(id = null) {
  try {
    const url = id
      ? `${baseURL}/holidaze/venues/${id}?_owner=true&_bookings=true`
      : `${baseURL}/holidaze/venues?_owner=true&_bookings=true`;

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
    return data.data;
  } catch (error) {
    console.error("Error fetching venues:", error.message);
    throw error;
  }
}
