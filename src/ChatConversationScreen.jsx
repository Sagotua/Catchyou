import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

export default function ChatConversationScreen() {
  const { userId } = useParams();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatRef = useRef(null);

  const partner = {
    id: userId,
    name: "Анна",
    avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Анна&backgroundColor=0f172a"
  };

  const currentUser = {
    name: "You",
    avatar: ""
  };

  useEffect(() => {
    const saved = localStorage.getItem(`chat-${userId}`);
    if (saved) {
      setMessages(JSON.parse(saved));
    }
  }, [userId]);

  useEffect(() => {
    localStorage.setItem(`chat-${userId}`, JSON.stringify(messages));
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
    <div className="w-full max-w-[430px] h-[800px] mx-auto bg-black text-white p-4 rounded-2xl shadow-xl flex flex-col">
      <h2 className="text-lg font-bold mb-4">Чат з {partner.name}</h2>

      <div ref={chatRef} className="flex-1 bg-zinc-800 rounded-lg p-4 overflow-y-auto space-y-4">
        {messages.map(msg => (
          <div key={msg.id} className={`flex ${msg.side === "right" ? "justify-end" : "justify-start"}`}>
            <div className={`flex items-end gap-2 max-w-[70%] ${msg.side === "right" ? "flex-row-reverse" : ""}`}>
              {msg.avatar && (
                <img src={msg.avatar} alt={msg.from} className="w-8 h-8 rounded-full" />
              )}
              <div>
                <div className="bg-zinc-900 px-4 py-2 rounded-xl text-sm text-white">
                  {msg.text}
                </div>
                <div className="text-xs text-gray-500 mt-1 text-right">{msg.time}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="Напишіть повідомлення..."
          className="flex-1 bg-zinc-900 text-white px-4 py-2 rounded-lg focus:outline-none"
        />
        <button
          onClick={handleSend}
          className="bg-purple-600 px-4 py-2 rounded-lg hover:bg-purple-700 transition"
        >
          Надіслати
        </button>
      </div>
    </div>
  );
}
