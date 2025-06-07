import { useState } from "react";
import { Link } from "react-router-dom";

export default function MessagesScreen() {
  const [matches] = useState([
    {
      id: 1,
      name: "Анна",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Анна&backgroundColor=0f172a"
    },
    {
      id: 2,
      name: "Олег",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Олег&backgroundColor=0f172a"
    },
    {
      id: 3,
      name: "Марія",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Марія&backgroundColor=0f172a"
    },
    {
      id: 4,
      name: "Ірина",
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Ірина&backgroundColor=0f172a"
    }
  ]);

  const [messages] = useState([
    {
      id: 1,
      name: "Анна",
      text: "Привіт! Як справи?",
      time: "10:45",
      unread: true,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Анна&backgroundColor=0f172a"
    },
    {
      id: 2,
      name: "Олег",
      text: "Підемо на каву?",
      time: "09:12",
      unread: false,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Олег&backgroundColor=0f172a"
    },
    {
      id: 3,
      name: "Марія",
      text: "Ти сьогодні вільний?",
      time: "Вчора",
      unread: true,
      avatar: "https://api.dicebear.com/7.x/initials/svg?seed=Марія&backgroundColor=0f172a"
    }
  ]);

  return (
    <div className="w-[360px] h-[800px] bg-black text-white mx-auto flex flex-col p-4 rounded-2xl shadow-xl space-y-6">
      {/* Matches */}
      <div>
        <h2 className="text-lg font-bold mb-2">Матчі</h2>
        <div className="flex gap-3 overflow-x-auto pb-1">
          {matches.map(match => (
            <img
              key={match.id}
              src={match.avatar}
              alt={match.name}
              className="w-12 h-12 rounded-full border-2 border-purple-600"
            />
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto">
        <h2 className="text-lg font-bold mb-2">Повідомлення</h2>
        <div className="space-y-4">
          {messages.map(msg => (
            <Link to={`/chat/${msg.id}`} key={msg.id} className="block">
              <div className="flex items-center gap-3 hover:bg-zinc-900 p-2 rounded-lg transition">
                <img src={msg.avatar} alt={msg.name} className="w-10 h-10 rounded-full" />
                <div className="flex-1">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{msg.name}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">{msg.time}</span>
                      {msg.unread && (
                        <span className="bg-purple-600 text-white text-xs px-2 py-0.5 rounded-full">
                          1
                        </span>
                      )}
                    </div>
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
