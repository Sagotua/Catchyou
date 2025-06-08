import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('ua');

  useEffect(() => {
    AsyncStorage.getItem('language').then((saved) => {
      if (saved === 'ua' || saved === 'en') {
        setLanguage(saved);
      }
    });
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('language', language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
