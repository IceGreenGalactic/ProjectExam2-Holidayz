import React, { createContext, useContext, useState } from "react";
import { loginUser, registerUser } from "../api/authApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const savedAuth = localStorage.getItem("auth");
    return savedAuth ? JSON.parse(savedAuth) : null;
  });

  const login = async (credentials) => {
    const userData = await loginUser(credentials);
    setAuth(userData);
    localStorage.setItem("auth", JSON.stringify(userData));
  };

  const register = async (userData) => {
    const newUser = await registerUser(userData);
    return newUser;
  };

  const logout = () => {
    setAuth(null);
    localStorage.removeItem("auth");
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, register }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
