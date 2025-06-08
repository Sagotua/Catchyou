import React, { useState } from 'react';
import { View, Text, TextInput } from 'react-native';
import CustomButton from '../components/CustomButton';
import { useTheme } from '../context/ThemeContext';

export default function RegisterScreen({ navigation }) {
  const { theme } = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <View className={`flex-1 items-center justify-center p-4 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <Text className={`text-xl mb-4 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Register</Text>
      <TextInput
        className="w-full border p-2 mb-3 rounded"
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        className="w-full border p-2 mb-6 rounded"
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <CustomButton title="Sign Up" onPress={() => navigation.replace('Home')} />
      <View className="mt-4">
        <CustomButton title="Back to Login" onPress={() => navigation.goBack()} />
      </View>
    </View>
  );
}
