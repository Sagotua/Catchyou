import { useTheme } from "./ThemeContext";
import { BsSun, BsMoon } from "react-icons/bs";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={`text-lg p-1 rounded-full transition ${
        theme === "light" ? "text-zinc-800 hover:text-zinc-600" : "text-white hover:text-gray-300"
      }`}
      aria-label="Перемикач теми"
    >
      {theme === "light" ? <BsMoon size={20} /> : <BsSun size={20} />}
    </button>
  );
}
