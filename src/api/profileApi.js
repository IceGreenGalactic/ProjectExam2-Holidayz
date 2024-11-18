import { baseURL, appApiKey } from "./apiConstants";

export async function fetchProfile(accessToken) {
  try {
    const savedAuth = localStorage.getItem("auth");

    if (!savedAuth) {
      throw new Error("User is not authenticated.");
    }

    const auth = JSON.parse(savedAuth);
    const { data } = auth;
    const { name } = data;

    if (!name) {
      throw new Error("User name is missing.");
    }

    const userIdentifier = name;
    const url = `${baseURL}/holidaze/profiles/${userIdentifier}?_venues=true&_bookings=true`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "X-Noroff-API-Key": appApiKey,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch profile.");
    }

    const profileData = await response.json();
    return profileData.data;
  } catch (error) {
    console.error("Error fetching profile:", error.message);
    throw error;
  }
}
