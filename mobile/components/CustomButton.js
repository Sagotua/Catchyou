import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

export default function CustomButton({ title, onPress }) {
  return (
    <TouchableOpacity className="bg-blue-500 p-3 rounded" onPress={onPress}>
      <Text className="text-white text-center">{title}</Text>
    </TouchableOpacity>
  );
}
