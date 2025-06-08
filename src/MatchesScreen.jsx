import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import { users } from "./mockData";

export default function MatchesScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const [conversations, setConversations] = useState([]);
  const { theme } = useTheme();

  useEffect(() => {
    const chats = users
      .map((u) => {
        const saved = localStorage.getItem(`chat-${u.id}`);
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
      .filter(Boolean);
    setConversations(chats);
  }, []);

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const matchedIds = conversations.map((c) => c.id);
  const newMatches = users.filter((u) => !matchedIds.includes(u.id));
  const filteredMatches = newMatches.filter((m) =>
    m.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className={`w-[360px] h-[800px] mx-auto p-4 rounded-2xl shadow-xl flex flex-col space-y-4 transition-all duration-300 ${
        theme === "light" ? "bg-warm text-black" : "bg-darkbg text-textwarm"
      }`}
    >
      {/* Пошук */}
      <input
        type="text"
        placeholder="Пошук..."
        aria-label="Search"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`w-full px-4 py-2 rounded-xl placeholder-gray-400 focus:outline-none transition ${
          theme === "light" ? "bg-white text-black" : "bg-zinc-800 text-white"
        }`}
      />

      {/* Нові пари */}
      <div>
        <h2 className="text-lg font-bold mb-2">Нові пари</h2>
        <div className="flex space-x-4 overflow-x-auto pb-1">
          {filteredMatches.map((match) => (
            <Link
              key={match.id}
              to={`/chat/${match.id}`}
              className="flex flex-col items-center gap-1"
            >
              <img
                src={match.avatar}
                alt={match.name}
                className="w-16 h-16 rounded-full border-2 border-purple-500"
              />
              <span className="text-xs w-16 truncate text-center">{match.name}</span>
            </Link>
          ))}
        </div>
      </div>

      {/* Повідомлення */}
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-lg font-bold mb-2">Повідомлення</h2>
        <div className="space-y-3">
          {filteredConversations.map((msg) => (
            <Link to={`/chat/${msg.id}`} key={msg.id} className="block">
              <div
                className={`flex items-center gap-3 p-2 rounded-lg transition ${
                  theme === "light" ? "hover:bg-zinc-100" : "hover:bg-zinc-900"
                }`}
              >
                <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{msg.name}</span>
                    <span className="text-sm text-gray-400">{msg.time}</span>
                  </div>
                  <p className="text-sm text-gray-400 truncate">{msg.text}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
