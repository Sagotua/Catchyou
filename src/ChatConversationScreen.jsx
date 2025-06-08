import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeContext";
import { users } from "./mockData";

export default function ChatConversationScreen() {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);
  const { theme } = useTheme();

  const id = parseInt(userId, 10);
  const partner =
    users.find((u) => u.id === id) || {
      id,
      name: "Користувач",
      avatar: "",
    };

  const currentUser = {
    name: "You",
    avatar: ""
  };

  useEffect(() => {
    const saved = localStorage.getItem(`chat-${id}`);
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, [id]);

  useEffect(() => {
    localStorage.setItem(`chat-${id}`, JSON.stringify(messages));
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    setTimeout(() => {
      chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight, behavior: "smooth" });
    }, 100);
  };

  const handleSend = () => {
    if (!input.trim()) return;

    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const newMessage = {
      id: Date.now(),
      from: currentUser.name,
      avatar: currentUser.avatar,
      text: input.trim(),
      time,
      side: "right"
    };

    setMessages(prev => [...prev, newMessage]);
    setInput("");

    // Simulate reply
    setTimeout(() => {
      const reply = {
        id: Date.now() + 1,
        from: partner.name,
        avatar: partner.avatar,
        text: "Це авто-відповідь 😄",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        side: "left"
      };
      setMessages(prev => [...prev, reply]);
    }, 1500);
  };

  return (
    <div
      className={`w-full max-w-[430px] h-[800px] mx-auto p-4 rounded-2xl shadow-xl flex flex-col transition-all duration-300 ${
        theme === "light" ? "bg-warm text-black" : "bg-darkbg text-textwarm"
      }`}
    >
      <h2 className="text-lg font-bold mb-4">Чат з {partner.name}</h2>

      <div
        ref={chatRef}
        className={`flex-1 rounded-lg p-4 overflow-y-auto space-y-4 ${
          theme === "light" ? "bg-zinc-200" : "bg-zinc-800"
        }`}
      >
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.side === "right" ? "justify-end" : "justify-start"}`}>
            <div className={`flex items-end gap-2 max-w-[70%] ${msg.side === "right" ? "flex-row-reverse" : ""}`}>
              {msg.avatar && (
                <img src={msg.avatar} alt={msg.from} className="w-8 h-8 rounded-full" />
              )}
              <div>
                <div
                  className={`px-4 py-2 rounded-xl text-sm ${
                    theme === "light" ? "bg-zinc-300 text-black" : "bg-zinc-900 text-white"
                  }`}
                >
                  {msg.text}
                </div>
                <div className="text-xs text-gray-500 mt-1 text-right">{msg.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <label htmlFor="chat-message" className="sr-only">
          Message
        </label>
        <input
          id="chat-message"
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Напишіть повідомлення..."
          className={`flex-1 px-4 py-2 rounded-lg focus:outline-none transition ${
            theme === "light" ? "bg-white text-black" : "bg-zinc-900 text-white"
          }`}
        />
        <button
          onClick={handleSend}
          className={`px-4 py-2 rounded-lg transition ${
            theme === "light"
              ? "bg-pastelPurple text-white hover:bg-purple-400"
              : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          Надіслати
        </button>
      </div>
    </div>
  );
}
