import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, removeToken, setToken } from "../utils/auth";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = getToken();
    if (token) {
      // Replace this with a real API call
      setUser({ name: "Demo User", email: "demo@example.com" });
    }
  }, []);

  const login = (userData, token) => {
    setToken(token);
    setUser(userData);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
