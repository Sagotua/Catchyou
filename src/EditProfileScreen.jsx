import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function EditProfileScreen() {
  const navigate = useNavigate();

  const defaultProfile = {
    name: "",
    age: "",
    bio: "",
    photo: "",
    media: [],
    interests: [],
    relationshipGoal: "",
    height: "",
    languages: [],
    moreAboutMe: {
      zodiac: "",
      education: "",
      familyPlans: "",
      personalityType: "",
      communicationStyle: "",
      loveStyle: ""
    },
    lifestyle: {
      pets: "",
      drinks: "",
      smoking: "",
      workouts: "",
      foodPreference: "",
      socialMedia: "",
      sleepHabits: ""
    },
    jobTitle: "",
    company: "",
    school: "",
    location: "",
    gender: "",
    orientation: "",
    hideAge: false,
    hideDistance: false
  };

  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      const parsed = JSON.parse(stored);
      setProfile((prev) => ({
        ...prev,
        ...parsed,
        moreAboutMe: {
          ...defaultProfile.moreAboutMe,
          ...parsed.moreAboutMe
        },
        lifestyle: {
          ...defaultProfile.lifestyle,
          ...parsed.lifestyle
        }
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleNestedChange = (section, name, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }));
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    navigate("/profile");
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 text-white bg-black min-h-screen space-y-4">
      <h2 className="text-xl font-bold text-center">Редагування профілю</h2>

      <input
        type="text"
        name="name"
        value={profile.name}
        onChange={handleChange}
        placeholder="Ім’я"
        className="w-full bg-zinc-800 px-4 py-3 rounded-xl placeholder-gray-400"
      />

      <input
        type="number"
        name="age"
        value={profile.age}
        onChange={handleChange}
        placeholder="Вік"
        className="w-full bg-zinc-800 px-4 py-3 rounded-xl placeholder-gray-400"
      />

      <textarea
        name="bio"
        value={profile.bio}
        onChange={handleChange}
        placeholder="Про себе"
        maxLength={500}
        className="w-full bg-zinc-800 px-4 py-3 rounded-xl placeholder-gray-400 resize-none h-24"
      />

      <input
        type="text"
        name="photo"
        value={profile.photo}
        onChange={handleChange}
        placeholder="URL основного фото"
        className="w-full bg-zinc-800 px-4 py-3 rounded-xl placeholder-gray-400"
      />

      {/* Більше про мене */}
      <div className="space-y-2">
        <h3 className="font-semibold text-lg mt-4">Більше про мене</h3>

        <input
          type="text"
          value={profile.moreAboutMe.zodiac}
          onChange={(e) => handleNestedChange("moreAboutMe", "zodiac", e.target.value)}
          placeholder="Знак зодіаку"
          className="w-full bg-zinc-800 px-4 py-3 rounded-xl placeholder-gray-400"
        />

        <input
          type="text"
          value={profile.moreAboutMe.education}
          onChange={(e) => handleNestedChange("moreAboutMe", "education", e.target.value)}
          placeholder="Освіта"
          className="w-full bg-zinc-800 px-4 py-3 rounded-xl placeholder-gray-400"
        />

        <input
          type="text"
          value={profile.moreAboutMe.familyPlans}
          onChange={(e) => handleNestedChange("moreAboutMe", "familyPlans", e.target.value)}
          placeholder="Плани на сім'ю"
          className="w-full bg-zinc-800 px-4 py-3 rounded-xl placeholder-gray-400"
        />

        <input
          type="text"
          value={profile.moreAboutMe.personalityType}
          onChange={(e) => handleNestedChange("moreAboutMe", "personalityType", e.target.value)}
          placeholder="Тип особистості"
          className="w-full bg-zinc-800 px-4 py-3 rounded-xl placeholder-gray-400"
        />

        <input
          type="text"
          value={profile.moreAboutMe.communicationStyle}
          onChange={(e) => handleNestedChange("moreAboutMe", "communicationStyle", e.target.value)}
          placeholder="Стиль спілкування"
          className="w-full bg-zinc-800 px-4 py-3 rounded-xl placeholder-gray-400"
        />

        <input
          type="text"
          value={profile.moreAboutMe.loveStyle}
          onChange={(e) => handleNestedChange("moreAboutMe", "loveStyle", e.target.value)}
          placeholder="Стиль кохання"
          className="w-full bg-zinc-800 px-4 py-3 rounded-xl placeholder-gray-400"
        />
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-purple-600 py-3 rounded-xl font-semibold hover:bg-purple-700 transition"
      >
        Зберегти
      </button>
    </div>
  );
}
