import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

export default function SettingsScreen() {
  const { theme } = useTheme();
  const { logout } = useAuth();
  return (
    <View className={`flex-1 items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <TouchableOpacity onPress={logout} className="bg-blue-500 p-3 rounded">
        <Text className="text-white">Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
