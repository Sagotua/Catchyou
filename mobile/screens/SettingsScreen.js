import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen() {
  const { theme } = useTheme();
  const { logout } = useAuth();
  return (
    <SafeAreaWrapper className={`items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <TouchableOpacity
        onPress={logout}
        className="bg-blue-500 p-3 rounded min-h-[44px] justify-center"
      >
        <Text className="text-white">Logout</Text>
      </TouchableOpacity>
    </SafeAreaWrapper>
  );
}
