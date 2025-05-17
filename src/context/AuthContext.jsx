import React, { createContext, useContext, useState, useEffect } from "react";
import { getToken, removeToken, setToken } from "../utils/auth";
import api from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loadingUser, setLoadingUser] = useState(true); // 👈 NEW

  useEffect(() => {
    const token = getToken();
    if (token) {
      api
        .get("/auth/profile")
        .then((res) => setUser(res.data))
        .catch((err) => {
          if (err.response?.status === 401) {
            removeToken();
          }
          setUser(null);
        })
        .finally(() => {
          setLoadingUser(false); // 👈 Done loading
        });
    } else {
      setUser(null);
      setLoadingUser(false);
    }
  }, []);

  const login = async (email, password) => {
    const response = await api.post("/auth/login", { email, password });
    const { token, user } = response.data;
    setToken(token);
    setUser(user);
  };

  const logout = () => {
    removeToken();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loadingUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
