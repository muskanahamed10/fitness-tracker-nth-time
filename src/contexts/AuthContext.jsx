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

  const signup = async (email, password, name, age, gender, height, weight) => {
    // Dummy local signup function
    const calculatedBmi = (weight / ((height/100) * (height/100))).toFixed(1);
    
    setUserData({
      name: name || 'New User',
      email: email,
      bmi: calculatedBmi,
      weight: weight,
      targetWeight: weight + 5,
      height: height,
      points: 0,
      streak: 1,
      gender: gender,
    });
  };

  const logout = () => {
    setUserData(null);
  };

  const value = {
    userData,
    currentUser: userData,
    setUserData,
    login,
    signup,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}
