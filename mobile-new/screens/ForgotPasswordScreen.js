import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
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
    <SafeAreaWrapper
      className={`flex-1 flex-col justify-between items-center w-full px-6 py-8 ${
        theme === 'light' ? 'bg-warm text-black' : 'bg-darkbg text-textwarm'
      }`}
    >
      <View className="w-full">
        <Text className="text-2xl font-bold text-center mt-4 mb-6">{t.title}</Text>
        <Text className="text-sm text-gray-400 text-center mb-4">{t.description}</Text>
        <TextInput
          className={`px-4 py-3 rounded-xl mb-4 shadow-inner ${
            theme === 'light' ? 'bg-white text-black' : 'bg-zinc-900 text-textwarm'
          }`}
          placeholder={t.email}
          placeholderTextColor={theme === 'light' ? '#6b7280' : '#9ca3af'}
          value={email}
          onChangeText={setEmail}
        />
        <CustomButton title={t.submit} onPress={() => navigation.goBack()} />
        <TouchableOpacity onPress={() => navigation.goBack()} className="pt-6 min-h-[44px] justify-center">
          <Text className="text-sm text-gray-400 underline text-center">{t.back}</Text>
        </TouchableOpacity>
      </View>
      <LanguageThemeSwitcher labels={{ ua: { ua: texts.ua.ua, en: texts.ua.en, toggle: texts.ua.toggle }, en: { ua: texts.en.ua, en: texts.en.en, toggle: texts.en.toggle } }} />
    </SafeAreaWrapper>
  );
}
