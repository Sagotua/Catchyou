import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function WelcomeScreen({ navigation }) {
  const { language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  const texts = {
    ua: {
      welcome: 'Ласкаво просимо до CatchYou',
      ua: 'Українська',
      en: 'English',
      toggle: 'Змінити тему',
    },
    en: {
      welcome: 'Welcome to CatchYou',
      ua: 'Ukrainian',
      en: 'English',
      toggle: 'Toggle Theme',
    },
  };

  const t = texts[language];

  return (
    <View className={`flex-1 items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <Text className={`mb-4 text-lg ${theme === 'light' ? 'text-black' : 'text-white'}`}>{t.welcome}</Text>
      <View className="flex-row space-x-4">
        <TouchableOpacity onPress={() => setLanguage('ua')}>
          <Text className={`underline ${language === 'ua' ? 'font-bold' : ''}`}>{t.ua}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setLanguage('en')}>
          <Text className={`underline ${language === 'en' ? 'font-bold' : ''}`}>{t.en}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={toggleTheme} className="mt-4">
        <Text className="text-blue-500">{t.toggle}</Text>
      </TouchableOpacity>
      <View className="mt-6">
        <CustomButton title="Get Started" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
}
