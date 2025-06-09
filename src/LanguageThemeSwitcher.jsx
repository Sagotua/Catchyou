import { BsSun, BsMoon } from "react-icons/bs";
import { useTheme } from "./ThemeContext";
import { useLanguage } from "./LanguageContext";

export default function LanguageThemeSwitcher() {
  const { theme, toggleTheme } = useTheme();
  const { language, setLanguage } = useLanguage();

  return (
    <div className="flex justify-center items-center gap-4 text-sm opacity-80 pt-4 pb-2">
      <button
        onClick={() => setLanguage("ua")}
        className={`hover:underline min-h-[44px] flex items-center justify-center ${language === "ua" ? "font-bold underline" : ""}`}
      >
        Українська
      </button>
      <span>•</span>
      <button
        onClick={() => setLanguage("en")}
        className={`hover:underline min-h-[44px] flex items-center justify-center ${language === "en" ? "font-bold underline" : ""}`}
      >
        English
      </button>
      <span className="mx-1">|</span>
      <button
        onClick={toggleTheme}
        className={`text-lg transition min-h-[44px] flex items-center justify-center ${
          theme === "light" ? "hover:text-pastelPurple" : "hover:text-purple-500"
        }`}
      >
        {theme === "light" ? <BsMoon /> : <BsSun />}
      </button>
    </div>
  );
}
