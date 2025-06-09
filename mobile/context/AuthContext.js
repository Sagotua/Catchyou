import React, { createContext, useContext, useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [userToken, setUserToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    SecureStore.getItemAsync('userToken').then((token) => {
      if (token) {
        setUserToken(token);
      }
      setLoading(false);
    });
  }, []);

  const login = async (token) => {
    await SecureStore.setItemAsync('userToken', token, {
      keychainAccessible: SecureStore.ALWAYS,
    });
    setUserToken(token);
  };

  const logout = async () => {
    await SecureStore.deleteItemAsync('userToken');
    setUserToken(null);
  };

  return (
    <AuthContext.Provider value={{ userToken, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
