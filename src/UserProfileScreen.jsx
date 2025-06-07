import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";

export default function UserProfileScreen() {
  const { theme } = useTheme();
  const [profile, setProfile] = useState({
    name: "Користувач",
    age: 0,
    bio: "Поки що без опису.",
    photo: "https://placehold.co/100x100?text=Avatar"
  });

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    }
  }, []);

  return (
    <div
      className={`w-[360px] h-[800px] mx-auto p-6 rounded-2xl shadow-xl flex flex-col items-center text-center transition-all duration-300 ${theme === "light"
          ? "bg-warm text-black"
          : "bg-darkbg text-textwarm"
        }`}
    >
      <img
        src={profile.photo}
        alt="avatar"
        className="w-28 h-28 rounded-full border-[5px] border-purple-500 shadow-md mb-4"
      />
      <h2 className="text-2xl font-bold mb-1">{profile.name}, {profile.age}</h2>
      <p className="text-sm text-gray-500 dark:text-gray-400 mb-6 px-4">{profile.bio}</p>

      <Link to="/edit-profile" className="w-full">
        <button
          className={`w-full py-3 rounded-xl text-lg font-semibold transition ${theme === "light"
              ? "bg-pastelPurple text-white hover:bg-purple-400"
              : "bg-purple-600 text-textwarm hover:bg-purple-700"
            }`}
        >
          Редагувати профіль
        </button>
      </Link>
    </div>
  );
}
