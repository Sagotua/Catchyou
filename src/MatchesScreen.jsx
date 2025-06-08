import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

export default function MatchesScreen() {
  const [searchTerm, setSearchTerm] = useState("");
  const { theme } = useTheme();

  const newMatches = [
    {
      id: 1,
      name: "Аліса",
      photo: "https://placehold.co/120x180?text=Аліса"
    },
    {
      id: 2,
      name: "Даша",
      photo: "https://placehold.co/120x180?text=Даша"
    },
    {
      id: 3,
      name: "Ірина",
      photo: "https://placehold.co/120x180?text=Ірина"
    }
  ];

  const messages = [
    {
      id: 1,
      name: "Анна",
      text: "Привіт! Як справи?",
      time: "10:45",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Анна&backgroundColor=0f172a"
    },
    {
      id: 2,
      name: "Марія",
      text: "Ти сьогодні вільний?",
      time: "Вчора",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Марія&backgroundColor=0f172a"
    }
  ];

  const filteredMessages = messages.filter(m =>
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
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className={`w-full px-4 py-2 rounded-xl placeholder-gray-400 focus:outline-none transition ${
          theme === "light" ? "bg-white text-black" : "bg-zinc-800 text-white"
        }`}
      />

      {/* Нові пари */}
      <div>
        <h2 className="text-lg font-bold mb-2">Нові пари</h2>
        <div className="flex space-x-3 overflow-x-auto pb-1">
          {newMatches.map(match => (
            <div
              key={match.id}
              className={`min-w-[120px] flex-shrink-0 rounded-xl overflow-hidden ${
                theme === "light" ? "bg-[#f0e4d7]" : "bg-zinc-800"
              }`}
            >
              <img src={match.photo} alt={match.name} className="w-full h-48 object-cover" />
              <p className="text-center py-2">{match.name}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Повідомлення */}
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-lg font-bold mb-2">Повідомлення</h2>
        <div className="space-y-3">
          {filteredMessages.map(msg => (
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
