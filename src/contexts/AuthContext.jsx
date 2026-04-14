import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [userData, setUserData] = useState({
    name: 'Student User',
    email: 'user@example.com',
    bmi: 17.5,
    weight: 50,
    targetWeight: 60,
    height: 170,
    points: 120,
    streak: 5,
    gender: 'Male',
  });

  const login = (email, password) => {
    setUserData({
      ...userData,
      email
    });
  };

  const logout = () => {
    setUserData(null);
  };

  const value = {
    userData,
    setUserData,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
