import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "./ThemeContext";

export default function LanguageThemeSwitcher({ language, setLanguage }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex justify-center items-center gap-4 text-sm opacity-80 pt-4 pb-2">
      <button
        onClick={() => setLanguage("ua")}
        className={`hover:underline ${language === "ua" ? "font-bold underline" : ""}`}
      >
        Українська
      </button>
      <span>•</span>
      <button
        onClick={() => setLanguage("en")}
        className={`hover:underline ${language === "en" ? "font-bold underline" : ""}`}
      >
        English
      </button>
      <span className="mx-1">|</span>
      <button
        onClick={toggleTheme}
        className="text-lg hover:text-purple-500 transition"
      >
        {theme === "light" ? <BsMoon /> : <BsSun />}
      </button>
    </div>
  );
}
