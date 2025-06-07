import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import LanguageThemeSwitcher from "./LanguageThemeSwitcher";

export default function WelcomeScreen() {
  const [language, setLanguage] = useState("ua");
  const { theme } = useTheme();

  const texts = {
    ua: {
      register: "Зареєструватися",
      login: "Увійти"
    },
    en: {
      register: "Register",
      login: "Login"
    }
  };

  const t = texts[language];

  return (
    <div
      className={`flex flex-col justify-between items-center w-full h-full px-6 py-8 transition-all duration-300 ${theme === "light" ? "bg-warm text-black" : "bg-darkbg text-textwarm"
        }`}
    >
      {/* Logo */}
      <div className="flex-1 flex items-center justify-center">
        <h1 className="text-4xl font-handwritten font-bold border-r-2 border-white overflow-hidden whitespace-nowrap w-0 animate-typing">
          CatchYou
          <span className="text-purple-500 animate-pulse">💜</span>
        </h1>
      </div>

      {/* Buttons */}
      <div className="w-full space-y-4">
        <Link to="/signup" className="block w-full">
          <button
            className={`w-full py-3 rounded-xl text-lg font-semibold transition ${theme === "light"
              ? "bg-pastelPurple text-white hover:bg-purple-400"
              : "bg-purple-600 text-textwarm hover:bg-purple-700"
              }`}
          >
            {t.register}
          </button>
        </Link>
        <Link to="/login" className="block w-full">
          <button
            className={`w-full py-3 rounded-xl text-lg font-semibold border transition ${theme === "light"
              ? "border-zinc-300 bg-white text-black hover:bg-zinc-100"
              : "bg-zinc-900 text-textwarm border-zinc-700 hover:bg-zinc-800"
              }`}
          >
            {t.login}
          </button>
        </Link>
      </div>

      {/* Language and Theme Switcher */}
      <LanguageThemeSwitcher language={language} setLanguage={setLanguage} />
    </div>
  );
}
