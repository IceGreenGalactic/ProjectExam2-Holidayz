import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchProfile } from "../api/profileApi";
import { useAuth } from "./useAuth";

const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const { auth } = useAuth();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProfile = async () => {
      if (!auth) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }

      const { accessToken } = auth.data;

      if (!accessToken) {
        setError("Authorization token is missing.");
        setLoading(false);
        return;
      }

      try {
        const profileData = await fetchProfile(accessToken);
        setProfile(profileData);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (auth) loadProfile();
  }, [auth]);

  return (
    <ProfileContext.Provider value={{ profile, loading, error }}>
      {children}
    </ProfileContext.Provider>
  );
};

export const useProfile = () => useContext(ProfileContext);
