import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { FontAwesome } from '@expo/vector-icons';
import CustomButton from '../components/CustomButton';
import LanguageThemeSwitcher from '../components/LanguageThemeSwitcher';
import { useTheme } from '../context/ThemeContext';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';

export default function LoginScreen({ navigation }) {
  const { theme } = useTheme();
  const { language } = useLanguage();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const texts = {
    ua: {
      title: 'Увійти',
      email: 'Електронна пошта',
      password: 'Пароль',
      submit: 'Увійти',
      noAccount: 'Ще не маєте акаунту? Зареєструватися',
      forgot: 'Забули пароль?',
      or: 'Або увійти через',
    },
    en: {
      title: 'Log In',
      email: 'Email',
      password: 'Password',
      submit: 'Log In',
      noAccount: "Don't have an account? Sign up",
      forgot: 'Forgot password?',
      or: 'Or continue with',
    },
  };

  const t = texts[language];

  const handleSubmit = () => {
    if (!email.includes('@') || password.length === 0) {
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
      <CustomButton title={t.submit} onPress={handleSubmit} />
      <TouchableOpacity
        onPress={() => navigation.navigate('ForgotPassword')}
        className="mt-2 min-h-[44px] justify-center"
      >
        <Text className="text-blue-500 underline">{t.forgot}</Text>
      </TouchableOpacity>
      <View className="flex-row space-x-3 mt-6">
        {[ 'apple', 'google', 'facebook', 'instagram' ].map((icon, i) => (
          <TouchableOpacity
            key={i}
            className="p-3 rounded-full bg-gray-200 min-w-[44px] min-h-[44px] justify-center items-center"
          >
            <FontAwesome
              name={icon}
              size={20}
              color={theme === 'light' ? '#000' : '#fff'}
            />
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Register')}
        className="mt-4 min-h-[44px] justify-center"
      >
        <Text className="text-sm text-gray-500 underline">{t.noAccount}</Text>
      </TouchableOpacity>
      <LanguageThemeSwitcher labels={{ ua: { ua: texts.ua.ua, en: texts.ua.en, toggle: texts.ua.toggle }, en: { ua: texts.en.ua, en: texts.en.en, toggle: texts.en.toggle } }} />
    </SafeAreaWrapper>
  );
}
