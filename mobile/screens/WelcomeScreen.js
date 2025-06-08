import React from 'react';
import { View, Text } from 'react-native';
import CustomButton from '../components/CustomButton';
import LanguageThemeSwitcher from '../components/LanguageThemeSwitcher';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';

export default function WelcomeScreen({ navigation }) {
  const { language } = useLanguage();
  const { theme } = useTheme();

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
      <LanguageThemeSwitcher labels={{ ua: { ua: texts.ua.ua, en: texts.ua.en, toggle: texts.ua.toggle }, en: { ua: texts.en.ua, en: texts.en.en, toggle: texts.en.toggle } }} />
      <View className="mt-6">
        <CustomButton title="Get Started" onPress={() => navigation.navigate('Login')} />
      </View>
    </View>
  );
}
