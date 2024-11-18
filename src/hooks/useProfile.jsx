import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchProfile } from "../api/profileApi";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedAuth = localStorage.getItem("auth");

        if (!savedAuth) {
          setError("User is not authenticated.");
          return;
        }

        const auth = JSON.parse(savedAuth);
        const { data } = auth;
        const { accessToken } = data;

        if (!accessToken) {
          setError("Authorization token is missing.");
          return;
        }

        const profileData = await fetchProfile(accessToken);
        setProfile(profileData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, loading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
