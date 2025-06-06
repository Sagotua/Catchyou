import { NavLink } from "react-router-dom";
import { FaHome, FaComment, FaHeart, FaUser, FaMoon, FaSun } from "react-icons/fa";
import { useEffect, useState } from "react";

export default function BottomNavBar() {
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    document.documentElement.classList.add("dark"); // темна тема за замовчуванням
  }, []);

  const toggleTheme = () => {
    const html = document.documentElement;
    if (html.classList.contains("dark")) {
      html.classList.remove("dark");
      setIsDark(false);
    } else {
      html.classList.add("dark");
      setIsDark(true);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-zinc-900 border-t border-zinc-300 dark:border-zinc-800 h-16 flex justify-around items-center text-black dark:text-white z-50">

      <NavLink to="/swipe" className={({ isActive }) =>
        `flex flex-col items-center transition ${isActive ? "text-purple-500" : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"}`
      }>
        <FaHome size={20} />
      </NavLink>

      <NavLink to="/messages" className={({ isActive }) =>
        `flex flex-col items-center transition ${isActive ? "text-purple-500" : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"}`
      }>
        <FaComment size={20} />
      </NavLink>

      <NavLink to="/likes" className={({ isActive }) =>
        `flex flex-col items-center transition ${isActive ? "text-purple-500" : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"}`
      }>
        <FaHeart size={20} />
      </NavLink>

      <NavLink to="/profile" className={({ isActive }) =>
        `flex flex-col items-center transition ${isActive ? "text-purple-500" : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"}`
      }>
        <FaUser size={20} />
      </NavLink>

      {/* Перемикач теми */}
      <button onClick={toggleTheme} className="absolute top-1 left-2 text-sm opacity-60 hover:opacity-100 transition">
        {isDark ? <FaSun size={16} /> : <FaMoon size={16} />}
      </button>
    </div>
  );
}
