import { Link } from "react-router-dom";

export default function LikesScreen() {
  const likes = [
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
    }
  ];

  return (
    <div className="w-[360px] h-[800px] mx-auto bg-black text-white p-4 rounded-2xl shadow-xl space-y-6">
      <h2 className="text-xl font-bold">Хто вас лайкнув</h2>
      <div className="grid grid-cols-3 gap-4">
        {likes.map(user => (
          <Link
            to={`/chat/${user.id}`}
            key={user.id}
            className="flex flex-col items-center hover:scale-105 transition"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-20 h-20 rounded-full border-2 border-purple-600"
            />
            <span className="mt-2 text-sm text-gray-300">{user.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
