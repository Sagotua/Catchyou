import { useContext } from "react";
import { useTheme } from "./ThemeContext";
import { FaHeart, FaTimes, FaStar } from "react-icons/fa";

export default function SwipeScreen() {
  const { theme } = useTheme();

  const profiles = [
    {
      id: 1,
      name: "Анна, 25",
      image: "https://placehold.co/320x400?text=Анна",
      about: "Люблю подорожі та каву ☕️"
    },
    {
      id: 2,
      name: "Олег, 28",
      image: "https://placehold.co/320x400?text=Олег",
      about: "Фанат спорту та гір"
    }
  ];

  return (
    <div className="w-[360px] h-[800px] bg-white text-black dark:bg-black dark:text-white mx-auto flex flex-col justify-between p-4 rounded-2xl shadow-xl">
      {/* Profile card */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        <img
          src={profiles[0].image}
          alt={profiles[0].name}
          className="w-full h-[400px] object-cover rounded-xl shadow-md"
        />
        <div className="text-center">
          <h2 className="text-xl font-bold">{profiles[0].name}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{profiles[0].about}</p>
        </div>
      </div>

      {/* Swipe buttons */}
      <div className="flex justify-around mt-6">
        <button className="border border-red-500 text-red-500 p-4 rounded-full hover:bg-red-500/10 transition">
          <FaTimes size={24} />
        </button>
        <button
          className={`p-5 rounded-full transition border ${
            theme === "light"
              ? "border-pastelPurple text-pastelPurple hover:bg-pastelPurple/10"
              : "border-purple-500 text-purple-500 hover:bg-purple-500/10"
          }`}
        >
          <FaHeart size={28} />
        </button>
        <button className="border border-yellow-600 text-yellow-600 p-4 rounded-full hover:bg-yellow-600/10 transition">
          <FaStar size={24} />
        </button>
      </div>
    </div>
  );
}
