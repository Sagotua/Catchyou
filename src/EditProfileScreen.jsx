import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";

export default function EditProfileScreen() {
  const navigate = useNavigate();
  const { theme } = useTheme();

  const [profile, setProfile] = useState({
    name: "Данило",
    age: 25,
    bio: "Люблю мандрувати, каву і котиків 🐱",
    photo: "https://placehold.co/100x100?text=Avatar"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    navigate("/profile");
  };

  return (
    <div
      className={`w-[360px] h-[800px] mx-auto p-6 rounded-2xl shadow-xl flex flex-col space-y-4 transition-all duration-300 ${
        theme === "light"
          ? "bg-warm text-black"
          : "bg-darkbg text-textwarm"
      }`}
    >
      <h2 className="text-xl font-bold text-center mb-2">Редагування профілю</h2>

      <input
        type="text"
        name="name"
        value={profile.name}
        onChange={handleChange}
        placeholder="Ім’я"
        className={`w-full px-4 py-3 rounded-xl focus:outline-none placeholder-gray-400 transition shadow-inner ${
          theme === "light"
            ? "bg-white text-black"
            : "bg-zinc-900 text-textwarm"
        }`}
      />

      <input
        type="number"
        name="age"
        value={profile.age}
        onChange={handleChange}
        placeholder="Вік"
        className={`w-full px-4 py-3 rounded-xl focus:outline-none placeholder-gray-400 transition shadow-inner ${
          theme === "light"
            ? "bg-white text-black"
            : "bg-zinc-900 text-textwarm"
        }`}
      />

      <textarea
        name="bio"
        value={profile.bio}
        onChange={handleChange}
        placeholder="Про себе"
        className={`w-full px-4 py-3 rounded-xl placeholder-gray-400 transition shadow-inner resize-none h-24 focus:outline-none ${
          theme === "light"
            ? "bg-white text-black"
            : "bg-zinc-900 text-textwarm"
        }`}
      />

      <input
        type="text"
        name="photo"
        value={profile.photo}
        onChange={handleChange}
        placeholder="URL фото"
        className={`w-full px-4 py-3 rounded-xl focus:outline-none placeholder-gray-400 transition shadow-inner ${
          theme === "light"
            ? "bg-white text-black"
            : "bg-zinc-900 text-textwarm"
        }`}
      />

      <button
        onClick={handleSave}
        className={`w-full py-3 rounded-xl text-lg font-semibold transition ${
          theme === "light"
            ? "bg-pastelPurple text-white hover:bg-purple-400"
            : "bg-purple-600 text-textwarm hover:bg-purple-700"
        }`}
      >
        Зберегти
      </button>
    </div>
  );
}
