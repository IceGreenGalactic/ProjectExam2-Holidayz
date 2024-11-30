import { baseURL, appApiKey } from "./apiConstants";

export async function fetchVenues(
  id = null,
  page = 1,
  limit = 100,
  searchQuery = "",
  sort = "name-asc"
) {
  try {
    const query = `_owner=true&_bookings=true`;
    const searchQueryParams = `&q=${searchQuery}`;
    const [sortField, sortOrder] = sort.split("-");
    const sortParams = sortField
      ? `&sort=${sortField}&sortOrder=${sortOrder || "asc"}`
      : "";
    const url = id
      ? `${baseURL}/holidaze/venues/${id}?${query}`
      : searchQuery
        ? `${baseURL}/holidaze/venues/search?${query}${searchQueryParams}&page=${page}&limit=${limit}`
        : `${baseURL}/holidaze/venues?${query}${sortParams}&page=${page}&limit=${limit}`;

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

export async function createVenue(venueData, token) {
  try {
    const response = await fetch(`${baseURL}/holidaze/venues`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Noroff-API-Key": appApiKey,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(venueData),
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      console.error("Error response:", errorResponse);
      throw new Error(errorResponse.message || `Failed to create venue.`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating venue:", error.message);
    throw error;
  }
}

export async function updateVenue(id, updatedData, token) {
  try {
    const response = await fetch(`${baseURL}/holidaze/venues/${id}`, {
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
      console.error("Error response:", errorResponse);
      throw new Error(errorResponse.message || "Failed to update venue");
    }

    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Error updating venue:", err.message);
    throw err;
  }
}
