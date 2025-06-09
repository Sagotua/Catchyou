import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { useTheme } from '../context/ThemeContext';

export default function CustomButton({ title, onPress }) {
  const { theme } = useTheme();
  return (
    <TouchableOpacity
      className={`p-3 rounded min-h-[44px] justify-center ${theme === 'light' ? 'bg-pastelPurple' : 'bg-purple-600'}`}
      onPress={onPress}
    >
      <Text className="text-white text-center">{title}</Text>
    </TouchableOpacity>
  );
}
