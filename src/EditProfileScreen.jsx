import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfileScreen() {
  const navigate = useNavigate();

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
    // Зберігаємо в localStorage
    localStorage.setItem("userProfile", JSON.stringify(profile));
    navigate("/profile");
  };

  return (
    <div className="w-[360px] h-[800px] bg-black text-white mx-auto p-6 rounded-2xl shadow-xl space-y-4">
      <h2 className="text-xl font-bold">Редагування профілю</h2>

      <input
        type="text"
        name="name"
        value={profile.name}
        onChange={handleChange}
        placeholder="Ім’я"
        className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl placeholder-gray-400"
      />

      <input
        type="number"
        name="age"
        value={profile.age}
        onChange={handleChange}
        placeholder="Вік"
        className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl placeholder-gray-400"
      />

      <textarea
        name="bio"
        value={profile.bio}
        onChange={handleChange}
        placeholder="Про себе"
        className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl placeholder-gray-400 resize-none h-24"
      />

      <input
        type="text"
        name="photo"
        value={profile.photo}
        onChange={handleChange}
        placeholder="URL фото"
        className="w-full bg-zinc-800 text-white px-4 py-3 rounded-xl placeholder-gray-400"
      />

      <button
        onClick={handleSave}
        className="w-full bg-purple-600 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
      >
        Зберегти
      </button>
    </div>
  );
}
