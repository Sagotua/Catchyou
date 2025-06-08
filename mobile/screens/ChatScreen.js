import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../context/ThemeContext';
import { users } from '../mockData';

export default function ChatScreen({ route }) {
  const { theme } = useTheme();
  const { userId } = route.params || {};
  const id = userId ? parseInt(userId, 10) : null;
  const partner =
    users.find((u) => u.id === id) || { id, name: 'Користувач', avatar: '' };

  const currentUser = { name: 'You', avatar: '' };
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    if (id) {
      AsyncStorage.getItem(`chat-${id}`).then((saved) => {
        if (saved) setMessages(JSON.parse(saved));
      });
    }
  }, [id]);

  useEffect(() => {
    if (id) {
      AsyncStorage.setItem(`chat-${id}`, JSON.stringify(messages));
      scrollRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages, id]);

  const handleSend = () => {
    if (!input.trim()) return;
    const time = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const newMsg = {
      id: Date.now().toString(),
      from: currentUser.name,
      avatar: currentUser.avatar,
      text: input.trim(),
      time,
      side: 'right',
    };
    setMessages((prev) => [...prev, newMsg]);
    setInput('');

    setTimeout(() => {
      const reply = {
        id: (Date.now() + 1).toString(),
        from: partner.name,
        avatar: partner.avatar,
        text: 'Це авто-відповідь 😄',
        time: new Date().toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        }),
        side: 'left',
      };
      setMessages((prev) => [...prev, reply]);
    }, 1500);
  };

  if (!id) {
    return (
      <View className={`flex-1 items-center justify-center ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
        <Text className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>Немає чату</Text>
      </View>
    );
  }

  return (
    <View className={`flex-1 p-4 ${theme === 'light' ? 'bg-white' : 'bg-black'}`}>
      <Text className={`text-lg font-bold mb-4 ${theme === 'light' ? 'text-black' : 'text-white'}`}>Чат з {partner.name}</Text>
      <ScrollView
        ref={scrollRef}
        className={`flex-1 rounded-lg p-3 ${theme === 'light' ? 'bg-gray-100' : 'bg-zinc-800'}`}
      >
        {messages.map((msg) => (
          <View key={msg.id} className={`mb-2 ${msg.side === 'right' ? 'items-end' : 'items-start'} flex`}>
            <View className={`flex-row items-end ${msg.side === 'right' ? 'flex-row-reverse' : ''}`}>
              {msg.avatar ? (
                <Image source={{ uri: msg.avatar }} className="w-8 h-8 rounded-full mx-1" />
              ) : null}
              <View>
                <View className={`px-3 py-2 rounded-xl ${theme === 'light' ? 'bg-gray-200' : 'bg-zinc-900'}`}>
                  <Text className={theme === 'light' ? 'text-black' : 'text-white'}>{msg.text}</Text>
                </View>
                <Text className="text-xs text-gray-500 mt-1 text-right">{msg.time}</Text>
              </View>
            </View>
          </View>
        ))}
      </ScrollView>
      <View className="mt-3 flex-row items-center">
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Напишіть повідомлення..."
          className={`flex-1 border rounded-lg px-3 py-2 ${
            theme === 'light' ? 'bg-white text-black' : 'bg-zinc-900 text-white'
          }`}
        />
        <TouchableOpacity
          onPress={handleSend}
          className={`ml-2 px-4 py-2 rounded-lg ${
            theme === 'light' ? 'bg-purple-500' : 'bg-purple-600'
          }`}
        >
          <Text className="text-white">Надіслати</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
