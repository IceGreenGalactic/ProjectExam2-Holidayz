import { baseURL, appApiKey } from "./apiConstants";

export async function loginUser(credentials) {
  const response = await fetch(`${baseURL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${appApiKey}`,
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    throw new Error("Failed to login. Check your credentials.");
  }
  return await response.json();
}

export async function registerUser(userData) {
  const response = await fetch(`${baseURL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${appApiKey}`,
    },
    body: JSON.stringify(userData),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Registration failed");
  }

  const result = await response.json();
  return result;
}
