import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen() {
  const { theme } = useTheme();
  return (
    <View className={`flex-1 items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <Text className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>Profile Screen</Text>
    </View>
  );
}
