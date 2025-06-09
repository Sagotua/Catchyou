import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function LanguageThemeSwitcher({ labels }) {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const t = labels ? labels[language] : { ua: 'UA', en: 'EN', toggle: 'Toggle Theme' };

  return (
    <View className="items-center mt-6">
      <View className="flex-row space-x-4">
        <TouchableOpacity
          onPress={() => setLanguage('ua')}
          className="min-h-[44px] justify-center"
        >
          <Text className={`underline ${language === 'ua' ? 'font-bold' : ''} ${theme === 'light' ? 'text-black' : 'text-white'}`}>{t.ua}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setLanguage('en')}
          className="min-h-[44px] justify-center"
        >
          <Text className={`underline ${language === 'en' ? 'font-bold' : ''} ${theme === 'light' ? 'text-black' : 'text-white'}`}>{t.en}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={toggleTheme} className="mt-2 min-h-[44px] justify-center">
        <Text className="text-blue-500">{t.toggle}</Text>
      </TouchableOpacity>
    </View>
  );
}
