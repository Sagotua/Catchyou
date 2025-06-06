import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserProfileScreen() {
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
    <div className="w-[360px] h-[800px] bg-black text-white mx-auto p-6 rounded-2xl shadow-xl space-y-6 flex flex-col items-center text-center">
      <img
        src={profile.photo}
        alt="avatar"
        className="w-24 h-24 rounded-full border-4 border-purple-600"
      />
      <h2 className="text-2xl font-bold">{profile.name}, {profile.age}</h2>
      <p className="text-gray-400">{profile.bio}</p>

      <Link
        to="/edit-profile"
        className="bg-zinc-800 text-white px-6 py-2 rounded-xl font-semibold hover:bg-zinc-700 transition"
      >
        Редагувати профіль
      </Link>
    </div>
  );
}
