import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Image, Switch } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';

export default function EditProfileScreen({ navigation }) {
  const { theme } = useTheme();
  const defaultProfile = {
    name: '',
    age: '',
    bio: '',
    photos: [],
    interests: [],
    relationshipGoal: '',
    height: '',
    languages: [],
    gender: '',
    orientation: '',
    job: '',
    education: '',
    hideAge: false,
    hideDistance: false,
  };

  const [profile, setProfile] = useState(defaultProfile);
  const popularInterests = ['Подорожі', 'Музика', 'Фільми', 'Спорт', 'Йога', 'Танці', 'Кавові побачення', 'Відеоігри', 'Меми', 'Книги'];
  const goals = ['Серйозні', 'Дружба', 'Флірт', 'Невизначено', 'Відкриті стосунки', 'Шлюб'];
  const langs = ['Українська', 'Англійська', 'Польська', 'Німецька', 'Французька'];

  useEffect(() => {
    AsyncStorage.getItem('userProfile').then((data) => {
      if (data) {
        setProfile({ ...defaultProfile, ...JSON.parse(data) });
      }
    });
  }, []);

  const updateField = (name, value) => {
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const toggleArrayValue = (key, value, limit) => {
    setProfile((prev) => {
      const exists = prev[key].includes(value);
      if (exists) {
        return { ...prev, [key]: prev[key].filter((v) => v !== value) };
      }
      if (prev[key].length < limit) {
        return { ...prev, [key]: [...prev[key], value] };
      }
      return prev;
    });
  };

  const addPhoto = () => {
    if (profile.photos.length >= 9) return;
    if (profile.tempPhoto?.trim()) {
      setProfile((prev) => ({
        ...prev,
        photos: [...prev.photos, prev.tempPhoto.trim()],
        tempPhoto: '',
      }));
    }
  };

  const removePhoto = (idx) => {
    setProfile((prev) => ({
      ...prev,
      photos: prev.photos.filter((_, i) => i !== idx),
    }));
  };

  const saveProfile = async () => {
    await AsyncStorage.setItem('userProfile', JSON.stringify(profile));
    navigation.goBack();
  };

  return (
    <SafeAreaWrapper className={`${theme === 'light' ? 'bg-white' : 'bg-black'}`}>\
      <ScrollView className="flex-1 p-4">\

      <Text className={`mb-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Фото (до 9)</Text>
      <View className="flex-row flex-wrap mb-4">
        {profile.photos.map((p, idx) => (
          <TouchableOpacity key={idx} onPress={() => removePhoto(idx)} className="mr-2 mb-2">
            <Image source={{ uri: p }} className="w-20 h-20 rounded" />
          </TouchableOpacity>
        ))}
      </View>
      {profile.photos.length < 9 && (
        <View className="flex-row items-center mb-4">
          <TextInput
            placeholder="https://..."
            value={profile.tempPhoto || ''}
            onChangeText={(v) => updateField('tempPhoto', v)}
            className="border flex-1 mr-2 p-2 rounded"
          />
          <TouchableOpacity onPress={addPhoto} className="bg-blue-500 p-3 rounded">
            <Text className="text-white">Add</Text>
          </TouchableOpacity>
        </View>
      )}

      <Text className={`mb-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Ім'я</Text>
      <TextInput
        value={profile.name}
        onChangeText={(v) => updateField('name', v)}
        className="border p-2 rounded mb-4"
      />

      <Text className={`mb-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Вік</Text>
      <TextInput
        value={profile.age}
        onChangeText={(v) => updateField('age', v)}
        keyboardType="numeric"
        className="border p-2 rounded mb-4"
      />

      <Text className={`mb-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Біо (до 500 символів)</Text>
      <TextInput
        value={profile.bio}
        onChangeText={(v) => updateField('bio', v)}
        multiline
        maxLength={500}
        className="border p-2 rounded mb-4 h-24"
      />

      <Text className={`mb-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Інтереси (до 10)</Text>
      <View className="flex-row flex-wrap mb-4">
        {popularInterests.map((int) => {
          const selected = profile.interests.includes(int);
          return (
            <TouchableOpacity
              key={int}
              onPress={() => toggleArrayValue('interests', int, 10)}
              className={`px-3 py-1 mr-2 mb-2 rounded-full border ${selected ? 'bg-blue-500 border-blue-500' : ''}`}
            >
              <Text className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>{int}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text className={`mb-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Ціль стосунків</Text>
      <View className="flex-row flex-wrap mb-4">
        {goals.map((g) => (
          <TouchableOpacity
            key={g}
            onPress={() => updateField('relationshipGoal', g)}
            className={`px-3 py-1 mr-2 mb-2 rounded-full border ${profile.relationshipGoal === g ? 'bg-blue-500 border-blue-500' : ''}`}
          >
            <Text className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>{g}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text className={`mb-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Зріст</Text>
      <TextInput
        value={profile.height}
        onChangeText={(v) => updateField('height', v)}
        keyboardType="numeric"
        className="border p-2 rounded mb-4"
      />

      <Text className={`mb-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Мови</Text>
      <View className="flex-row flex-wrap mb-4">
        {langs.map((l) => {
          const selected = profile.languages.includes(l);
          return (
            <TouchableOpacity
              key={l}
              onPress={() => toggleArrayValue('languages', l, 5)}
              className={`px-3 py-1 mr-2 mb-2 rounded-full border ${selected ? 'bg-blue-500 border-blue-500' : ''}`}
            >
              <Text className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>{l}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

      <Text className={`mb-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Стать</Text>
      <TextInput
        value={profile.gender}
        onChangeText={(v) => updateField('gender', v)}
        className="border p-2 rounded mb-4"
      />

      <Text className={`mb-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Орієнтація</Text>
      <TextInput
        value={profile.orientation}
        onChangeText={(v) => updateField('orientation', v)}
        className="border p-2 rounded mb-4"
      />

      <Text className={`mb-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Робота</Text>
      <TextInput
        value={profile.job}
        onChangeText={(v) => updateField('job', v)}
        className="border p-2 rounded mb-4"
      />

      <Text className={`mb-1 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Освіта</Text>
      <TextInput
        value={profile.education}
        onChangeText={(v) => updateField('education', v)}
        className="border p-2 rounded mb-4"
      />

      <View className="flex-row items-center mb-4">
        <Text className={`mr-2 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Приховати вік</Text>
        <Switch value={profile.hideAge} onValueChange={(v) => updateField('hideAge', v)} />
      </View>
      <View className="flex-row items-center mb-4">
        <Text className={`mr-2 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Приховати відстань</Text>
        <Switch value={profile.hideDistance} onValueChange={(v) => updateField('hideDistance', v)} />
      </View>

      <TouchableOpacity onPress={saveProfile} className="bg-blue-500 p-3 rounded mb-10">
        <Text className="text-white text-center">Зберегти</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaWrapper>
  );
