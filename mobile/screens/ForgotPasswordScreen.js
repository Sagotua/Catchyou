import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import CustomButton from '../components/CustomButton';
import LanguageThemeSwitcher from '../components/LanguageThemeSwitcher';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';

export default function ForgotPasswordScreen({ navigation }) {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const [email, setEmail] = useState('');

  const texts = {
    ua: {
      title: 'Відновлення пароля',
      description: 'Введіть пошту для відновлення',
      email: 'Електронна пошта',
      submit: 'Відновити',
      back: 'Назад до входу',
    },
    en: {
      title: 'Password Recovery',
      description: 'Enter your email and we\u2019ll send instructions',
      email: 'Email',
      submit: 'Recover',
      back: 'Back to login',
    },
  };

  const t = texts[language];

  return (
    <View className={`flex-1 items-center justify-center p-4 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <Text className={`text-xl mb-2 ${theme === 'light' ? 'text-black' : 'text-white'}`}>{t.title}</Text>
      <Text className="text-sm text-gray-500 mb-4">{t.description}</Text>
      <TextInput
        className="w-full border p-2 mb-4 rounded"
        placeholder={t.email}
        value={email}
        onChangeText={setEmail}
      />
      <CustomButton title={t.submit} onPress={() => navigation.goBack()} />
      <TouchableOpacity onPress={() => navigation.goBack()} className="mt-4">
        <Text className="text-sm text-gray-500 underline">{t.back}</Text>
      </TouchableOpacity>
      <LanguageThemeSwitcher labels={{ ua: { ua: texts.ua.ua, en: texts.ua.en, toggle: texts.ua.toggle }, en: { ua: texts.en.ua, en: texts.en.en, toggle: texts.en.toggle } }} />
    </View>
  );
}
