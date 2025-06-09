import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import CustomButton from '../components/CustomButton';
import LanguageThemeSwitcher from '../components/LanguageThemeSwitcher';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function RegisterScreen({ navigation }) {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');

  const texts = {
    ua: {
      title: 'Реєстрація',
      email: 'Електронна пошта',
      password: 'Пароль',
      confirm: 'Підтвердіть пароль',
      submit: 'Зареєструватися',
      haveAccount: 'Вже маєте акаунт? Увійти',
    },
    en: {
      title: 'Sign Up',
      email: 'Email',
      password: 'Password',
      confirm: 'Confirm Password',
      submit: 'Register',
      haveAccount: 'Already have an account? Log in',
    },
  };

  const t = texts[language];

  const handleSubmit = () => {
    if (!email.includes('@') || password !== confirm) {
      setError(t.email);
      return;
    }
    setError('');
    login('demo-token');
  };

  return (
    <SafeAreaWrapper
      className={`flex-1 flex-col justify-between items-center w-full px-6 py-8 ${
        theme === 'light' ? 'bg-warm text-black' : 'bg-darkbg text-textwarm'
      }`}
    >
      <View className="flex flex-col w-full">
        <Text className="text-2xl font-bold text-center mt-4 mb-6">{t.title}</Text>
        {error ? <Text className="text-red-500 mb-2 text-center">{error}</Text> : null}
        <TextInput
          className={`px-4 py-3 rounded-xl mb-3 shadow-inner ${
            theme === 'light' ? 'bg-white text-black' : 'bg-zinc-900 text-textwarm'
          }`}
          placeholder={t.email}
          placeholderTextColor={theme === 'light' ? '#6b7280' : '#9ca3af'}
          value={email}
          onChangeText={setEmail}
        />
        <TextInput
          className={`px-4 py-3 rounded-xl mb-3 shadow-inner ${
            theme === 'light' ? 'bg-white text-black' : 'bg-zinc-900 text-textwarm'
          }`}
          placeholder={t.password}
          placeholderTextColor={theme === 'light' ? '#6b7280' : '#9ca3af'}
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          className={`px-4 py-3 rounded-xl mb-6 shadow-inner ${
            theme === 'light' ? 'bg-white text-black' : 'bg-zinc-900 text-textwarm'
          }`}
          placeholder={t.confirm}
          placeholderTextColor={theme === 'light' ? '#6b7280' : '#9ca3af'}
          secureTextEntry
          value={confirm}
          onChangeText={setConfirm}
        />
        <CustomButton title={t.submit} onPress={handleSubmit} />
        <View className="text-center pt-6">
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            className="min-h-[44px] justify-center"
          >
            <Text className="text-sm text-gray-400 underline">{t.haveAccount}</Text>
          </TouchableOpacity>
        </View>
      </View>
      <LanguageThemeSwitcher labels={{ ua: { ua: texts.ua.ua, en: texts.ua.en, toggle: texts.ua.toggle }, en: { ua: texts.en.ua, en: texts.en.en, toggle: texts.en.toggle } }} />
    </SafeAreaWrapper>
  );
}
