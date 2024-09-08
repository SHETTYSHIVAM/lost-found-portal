import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userId, setUserId] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Restore user information from localStorage
    const storedUserId = parseInt(localStorage.getItem('userId'), 10);
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');
    const accessToken = localStorage.getItem('access_token');
    const refreshToken = localStorage.getItem('refresh_token');

    if (accessToken && refreshToken && storedUserId && storedName && storedEmail) {
      setIsLoggedIn(true);
      setUserId(storedUserId);
      setName(storedName);
      setEmail(storedEmail);
    }
  }, []);

  const handleLogin = (userData) => {
    setIsLoggedIn(true);
    setUserId(parseInt(userData.userId, 10));
    setName(userData.name);
    setEmail(userData.email);

    // Save user information to localStorage
    localStorage.setItem('userId', userData.userId);
    localStorage.setItem('name', userData.name);
    localStorage.setItem('email', userData.email);
    localStorage.setItem('access_token', userData.accessToken);
    localStorage.setItem('refresh_token', userData.refreshToken);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserId(null);
    setName("");
    setEmail("");

    localStorage.removeItem('userId');
    localStorage.removeItem('name');
    localStorage.removeItem('email');
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/signin');
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, userId, name, email, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
