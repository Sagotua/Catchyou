import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import LanguageThemeSwitcher from "./LanguageThemeSwitcher";

export default function ForgotPasswordScreen() {
  const [language, setLanguage] = useState("ua");
  const { theme } = useTheme();

  const texts = {
    ua: {
      title: "Відновлення пароля",
      description: "Введіть пошту для відновлення",
      email: "Електронна пошта",
      submit: "Відновити",
      back: "Назад до входу"
    },
    en: {
      title: "Password Recovery",
      description: "Enter your email and we’ll send instructions",
      email: "Email",
      submit: "Recover",
      back: "Back to login"
    }
  };

  const t = texts[language];

  return (
    <div
      className={`flex flex-col justify-between items-center w-full h-full px-6 py-8 transition-all duration-300 ${
        theme === "light" ? "bg-warm text-black" : "bg-darkbg text-textwarm"
      }`}
    >
      <div className="w-full">
        <h2 className="text-2xl font-bold text-center mt-4 mb-11">{t.title}</h2>
        <p className="text-sm text-gray-400 dark:text-gray-500 text-center mt-1">{t.description}</p>

        <form className="w-full flex flex-col space-y-4 mt-12">
          <input
            type="email"
            placeholder={t.email}
            className={`px-4 py-3 rounded-xl focus:outline-none placeholder-gray-500 transition shadow-inner
              ${theme === "light" ? "bg-white text-black" : "bg-zinc-900 text-textwarm"}`}
          />
          <button
            type="submit"
            className={`py-3 rounded-xl font-semibold transition w-full ${
              theme === "light"
                ? "bg-pastelPurple text-textwarm hover:bg-purple-500"
                : "bg-purple-600 text-textwarm hover:bg-purple-700"
            }`}
          >
            {t.submit}
          </button>
        </form>

        <p className="text-sm text-center text-gray-400 dark:text-gray-500 pt-7">
          <Link to="/login" className="hover:underline">{t.back}</Link>
        </p>
      </div>

      <LanguageThemeSwitcher language={language} setLanguage={setLanguage} />
    </div>
  );
}
