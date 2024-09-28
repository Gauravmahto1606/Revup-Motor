// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem('access_token') ? localStorage.getItem('access_token') : null
  );
  const [user, setUser] = useState(() =>
    localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null
  );

  const navigate = useNavigate();

  const login = async (data) => {
    try {
      const response = await axiosInstance.post('/login/', data);
      setAuthTokens(response.data.access);
      setUser(response.data.user);
      // console.log(response.data)
      console.log(response.data.user)

      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      navigate('/car-models');
    } catch (error) {
      console.error('Login failed:', error);
      throw error
    }
  };

  const logout = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const contextData = {
    user,
    authTokens,
    login,
    logout,
  };

  useEffect(() => {
    if (authTokens) {
      setAuthTokens(localStorage.getItem('access_token'));
      setUser(JSON.parse(localStorage.getItem('user')));
    }
  }, []);

  return <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>;
};
const updateUser = (updatedUserData) => {
  setUser((prevUser) => ({
    ...prevUser,
    ...updatedUserData,
  }));
};
export default AuthContext;
