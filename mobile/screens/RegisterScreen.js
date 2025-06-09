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
    <SafeAreaWrapper className={`items-center justify-center p-4 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <Text className={`text-xl mb-4 ${theme === 'light' ? 'text-black' : 'text-white'}`}>{t.title}</Text>
      {error ? <Text className="text-red-500 mb-2">{error}</Text> : null}
      <TextInput
        className="w-full border p-2 mb-3 rounded"
        placeholder={t.email}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="w-full border p-2 mb-3 rounded"
        placeholder={t.password}
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        className="w-full border p-2 mb-6 rounded"
        placeholder={t.confirm}
        secureTextEntry
        value={confirm}
        onChangeText={setConfirm}
      />
      <CustomButton title={t.submit} onPress={handleSubmit} />
      <TouchableOpacity
        onPress={() => navigation.goBack()}
        className="mt-4 min-h-[44px] justify-center"
      >
        <Text className="text-sm text-gray-500 underline">{t.haveAccount}</Text>
      </TouchableOpacity>
      <LanguageThemeSwitcher labels={{ ua: { ua: texts.ua.ua, en: texts.ua.en, toggle: texts.ua.toggle }, en: { ua: texts.en.ua, en: texts.en.en, toggle: texts.en.toggle } }} />
    </SafeAreaWrapper>
  );
}
