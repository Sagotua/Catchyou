import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import SafeAreaWrapper from '../components/SafeAreaWrapper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { users } from '../mockData';

export default function MatchesScreen({ navigation }) {
  const { theme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [conversations, setConversations] = useState([]);

  useEffect(() => {
    const load = async () => {
      const chats = await Promise.all(
        users.map(async (u) => {
          const saved = await AsyncStorage.getItem(`chat-${u.id}`);
          if (saved) {
            const arr = JSON.parse(saved);
            const last = arr[arr.length - 1];
            if (last) {
              return {
                id: u.id,
                name: u.name,
                avatar: u.avatar,
                text: last.text,
                time: last.time,
              };
            }
          }
          return null;
        })
      );
      setConversations(chats.filter(Boolean));
    };
    const unsubscribe = navigation.addListener('focus', load);
    return unsubscribe;
  }, [navigation]);

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const matchedIds = conversations.map((c) => c.id);
  const newMatches = users.filter((u) => !matchedIds.includes(u.id));
  const filteredMatches = newMatches.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaWrapper className={`p-4 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <TextInput
        placeholder="Пошук..."
        value={searchTerm}
        onChangeText={setSearchTerm}
        className={`border px-3 py-2 rounded mb-4 ${
          theme === 'light' ? 'text-black bg-white' : 'text-white bg-zinc-800'
        }`}
      />

      <View>
        <Text
          className={`font-bold mb-2 ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}
        >
          Нові пари
        </Text>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} className="pb-2">
          {filteredMatches.map((match) => (
            <TouchableOpacity
              key={match.id}
              onPress={() => navigation.navigate('Chat', { userId: match.id })}
              className="items-center mr-4"
            >
              <Image
                source={{ uri: match.avatar }}
                className="w-16 h-16 rounded-full border-2 border-purple-500"
              />
              <Text className="text-xs mt-1 text-center text-gray-500 w-16" numberOfLines={1}>
                {match.name}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <View className="flex-1 mt-4">
        <Text
          className={`font-bold mb-2 ${
            theme === 'light' ? 'text-black' : 'text-white'
          }`}
        >
          Повідомлення
        </Text>
        <ScrollView>
          {filteredConversations.map((msg) => (
            <TouchableOpacity
              key={msg.id}
              onPress={() => navigation.navigate('Chat', { userId: msg.id })}
              className={`flex-row items-center p-2 rounded-lg mb-2 ${
                theme === 'light' ? 'bg-gray-100' : 'bg-zinc-800'
              }`}
            >
              <Image
                source={{ uri: msg.avatar }}
                className="w-10 h-10 rounded-full mr-3"
              />
              <View className="flex-1">
                <View className="flex-row justify-between">
                  <Text
                    className={`font-semibold ${
                      theme === 'light' ? 'text-black' : 'text-white'
                    }`}
                  >
                    {msg.name}
                  </Text>
                  <Text className="text-xs text-gray-400">{msg.time}</Text>
                </View>
                <Text className="text-sm text-gray-500" numberOfLines={1}>
                  {msg.text}
                </Text>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </SafeAreaWrapper>
  );
}
