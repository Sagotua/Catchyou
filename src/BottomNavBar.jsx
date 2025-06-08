import { NavLink } from "react-router-dom";
import { FaHome, FaComment, FaUser, FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "./ThemeContext";

export default function BottomNavBar() {
  const { theme, toggleTheme } = useTheme();

  const navItemClass = ({ isActive }) =>
    `flex flex-col items-center text-xs gap-1 transition duration-200 ${
      isActive
        ? theme === "light"
          ? "text-pastelPurple scale-110"
          : "text-purple-500 scale-110"
        : "text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white"
    }`;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-warm dark:bg-zinc-900 border-t border-zinc-300 dark:border-zinc-800 h-16 flex justify-around items-center text-black dark:text-white z-50">

      <NavLink to="/swipe" className={navItemClass} aria-label="Swipe">
        <FaHome size={20} />
      </NavLink>

      <NavLink to="/matches" className={navItemClass} aria-label="Matches">
        <FaComment size={20} />
      </NavLink>

      <NavLink to="/profile" className={navItemClass} aria-label="Profile">
        <FaUser size={20} />
      </NavLink>

      {/* Theme Toggle */}
      <button
        onClick={toggleTheme}
        className="absolute top-1 left-2 text-sm opacity-60 hover:opacity-100 transition"
        aria-label="Toggle Theme"
      >
        {theme === "light" ? <FaMoon size={16} /> : <FaSun size={16} />}
      </button>
    </div>
  );
}
