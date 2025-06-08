import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

export default function ProfileScreen({ navigation }) {
  const { theme } = useTheme();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const load = async () => {
      const data = await AsyncStorage.getItem('userProfile');
      if (data) {
        setProfile(JSON.parse(data));
      }
    };
    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, [navigation]);

  if (!profile) {
    return (
      <SafeAreaWrapper className={`items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>\
        <Text className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>Профіль не заповнено</Text>
        <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} className="mt-4 bg-blue-500 p-3 rounded">
          <Text className="text-white">Створити</Text>
        </TouchableOpacity>
      </SafeAreaWrapper>
    );
  }

    <SafeAreaWrapper className={`${theme === 'light' ? 'bg-white' : 'bg-black'}`}>\
          <ScrollView className="flex-1 p-4">\
      {profile.photos[0] && <Image source={{ uri: profile.photos[0] }} className="w-full h-64 rounded mb-4" />}
      <Text className={`text-2xl font-bold ${theme === 'light' ? 'text-black' : 'text-white'}`}>{profile.name}{profile.age && !profile.hideAge ? `, ${profile.age}` : ''}</Text>
      {profile.bio ? <Text className="mt-2 text-gray-500">{profile.bio}</Text> : null}
      {profile.interests.length > 0 && (
        <View className="flex-row flex-wrap mt-2">
          {profile.interests.map((i) => (
            <Text key={i} className="px-2 py-1 mr-2 mb-2 bg-gray-200 rounded">{i}</Text>
          ))}
        </View>
      )}
      <View className="mt-4 space-y-1">
        {profile.gender ? <Text className="text-gray-500">Стать: {profile.gender}</Text> : null}
        {profile.orientation ? <Text className="text-gray-500">Орієнтація: {profile.orientation}</Text> : null}
        {profile.job ? <Text className="text-gray-500">Робота: {profile.job}</Text> : null}
        {profile.education ? <Text className="text-gray-500">Освіта: {profile.education}</Text> : null}
        {profile.height && !profile.hideAge ? <Text className="text-gray-500">Зріст: {profile.height}</Text> : null}
      </View>
      {profile.photos.length > 1 && (
        <View className="flex-row flex-wrap mt-4">
          {profile.photos.slice(1).map((p, idx) => (
            <Image key={idx} source={{ uri: p }} className="w-24 h-24 mr-2 mb-2 rounded" />
          ))}
        </View>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('EditProfile')} className="mt-6 bg-blue-500 p-3 rounded">
        <Text className="text-white text-center">Редагувати</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaWrapper>
  );
}
