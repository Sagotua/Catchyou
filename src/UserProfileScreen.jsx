import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";

export default function UserProfileScreen() {
  const { theme } = useTheme();
  const navigate = useNavigate();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    const storedProfile = localStorage.getItem("userProfile");
    if (storedProfile) {
      setProfile(JSON.parse(storedProfile));
    } else {
      navigate("/edit-profile", { replace: true });
    }
  }, [navigate]);

  if (!profile) {
    return (
      <div className="text-center p-6 text-white">Завантаження профілю...</div>
    );
  }

  return (
    <div
      className={`w-[360px] min-h-[800px] mx-auto p-6 rounded-2xl shadow-xl flex flex-col gap-4 items-center text-center transition-all duration-300 ${
        theme === "light"
          ? "bg-warm text-black"
          : "bg-darkbg text-textwarm"
      }`}
    >
      {/* Фото */}
      <img
        src={profile.photo || "https://placehold.co/100x100?text=Avatar"}
        alt="avatar"
        className="w-28 h-28 rounded-full border-[5px] border-purple-500 shadow-md"
      />

      {/* Ім'я та вік */}
      <h2 className="text-2xl font-bold">
        {profile.name}
        {profile.age && !profile.hideAge && <span>, {profile.age}</span>}
      </h2>

      {/* Біо */}
      {profile.bio && (
        <p className="text-sm text-gray-500 dark:text-gray-400">{profile.bio}</p>
      )}

      {/* Ціль стосунків */}
      {profile.relationshipGoal && (
        <p className="text-sm text-gray-400">
          🎯 Ціль стосунків: {profile.relationshipGoal}
        </p>
      )}

      {/* Місцезнаходження */}
      {profile.location && (
        <p className="text-sm text-gray-400">📍 {profile.location}</p>
      )}

      {/* Стать, орієнтація */}
      <div className="text-sm text-gray-400 space-y-1 mt-2">
        {profile.gender && <p>Стать: {profile.gender}</p>}
        {profile.orientation && <p>Орієнтація: {profile.orientation}</p>}
        {profile.height && !profile.hideAge && (
          <p>Зріст: {profile.height} см</p>
        )}
      </div>

      {/* Інтереси */}
      {profile.interests?.length > 0 && (
        <div className="w-full text-left mt-4">
          <h3 className="font-semibold mb-2 text-sm">Інтереси:</h3>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((interest) => (
              <span
                key={interest}
                className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-gray-300"
              >
                {interest}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Мови */}
      {profile.languages?.length > 0 && (
        <div className="w-full text-left mt-4">
          <h3 className="font-semibold mb-2 text-sm">Мови:</h3>
          <div className="flex flex-wrap gap-2">
            {profile.languages.map((lang) => (
              <span
                key={lang}
                className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-gray-300"
              >
                {lang}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Додаткові фото */}
      {profile.media?.length > 0 && (
        <div className="w-full mt-6">
          <h3 className="font-semibold text-sm mb-2 text-left">Додаткові фото:</h3>
          <div className="grid grid-cols-3 gap-2">
            {profile.media.map((url, idx) => (
              <img
                key={idx}
                src={url}
                alt={`media-${idx}`}
                className="w-full h-20 object-cover rounded-lg"
              />
            ))}
          </div>
        </div>
      )}

      {/* Кнопка */}
      <Link to="/edit-profile" className="w-full mt-6">
        <button
          className={`w-full py-3 rounded-xl text-lg font-semibold transition ${
            theme === "light"
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
