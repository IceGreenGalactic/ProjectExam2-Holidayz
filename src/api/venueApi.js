import { baseURL, appApiKey } from "./apiConstants";

export async function fetchVenues(accessToken) {
  try {
    const url = `${baseURL}/holidaze/venues?_owner=true&_bookings=true`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": appApiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch venues.");
    }

    const venuesData = await response.json();
    return venuesData.data;
  } catch (error) {
    console.error("Error fetching venues:", error.message);
    throw error;
  }
}
