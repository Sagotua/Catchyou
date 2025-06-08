import { useState } from "react";
import { Link } from "react-router-dom";
import { useTheme } from "./ThemeContext";
import LanguageThemeSwitcher from "./LanguageThemeSwitcher";
import { FaApple, FaGoogle, FaFacebookF, FaInstagram } from "react-icons/fa";

export default function SignUpScreen() {
  const [language, setLanguage] = useState("ua");
  const { theme } = useTheme();

  const texts = {
    ua: {
      title: "Реєстрація",
      email: "Електронна пошта",
      password: "Пароль",
      confirm: "Підтвердіть пароль",
      submit: "Зареєструватися",
      haveAccount: "Вже маєте акаунт? Увійти",
      or: "Або зареєструватися через"
    },
    en: {
      title: "Sign Up",
      email: "Email",
      password: "Password",
      confirm: "Confirm Password",
      submit: "Register",
      haveAccount: "Already have an account? Log in",
      or: "Or sign up with"
    }
  };

  const t = texts[language];

  return (
    <div
      className={`flex flex-col justify-between items-center w-full h-full px-6 py-8 transition-all duration-300 ${theme === "light" ? "bg-warm text-black" : "bg-darkbg text-textwarm"
        }`}
    >
      <div className="flex flex-col w-full">
        <h2 className="text-2xl font-bold text-center mt-4 mb-6">{t.title}</h2>
        <form className="w-full flex flex-col space-y-4 mt-6">
          <input
            type="email"
            placeholder={t.email}
            className={`px-4 py-3 rounded-xl focus:outline-none placeholder-gray-500 transition shadow-inner
            ${theme === "light" ? "bg-white text-black" : "bg-zinc-900 text-textwarm"}`}
          />
          <input
            type="password"
            placeholder={t.password}
            className={`px-4 py-3 rounded-xl focus:outline-none placeholder-gray-500 transition shadow-inner
            ${theme === "light" ? "bg-white text-black" : "bg-zinc-900 text-textwarm"}`}
          />
          <input
            type="password"
            placeholder={t.confirm}
            className={`px-4 py-3 rounded-xl focus:outline-none placeholder-gray-500 transition shadow-inner
            ${theme === "light" ? "bg-white text-black" : "bg-zinc-900 text-textwarm"}`}
          />
          <button
            type="submit"
            className={`py-3 rounded-xl font-semibold transition w-full ${theme === "light"
              ? "bg-pastelPurple text-white hover:bg-purple-400"
              : "bg-purple-600 text-textwarm hover:bg-purple-700"
              }`}
          >
            {t.submit}
          </button>
        </form>
      </div>
      {/* Блок соцмереж */}
      <div className="text-center pt-6 mb-8">
        <p className="text-sm text-gray-400 dark:text-gray-500 mb-2">{t.or}</p>
        <div className="flex justify-center gap-4">
          {[FaApple, FaGoogle, FaFacebookF, FaInstagram].map((Icon, i) => (
            <button
              key={i}
              className={`p-3 rounded-full transition
                ${theme === "light"
                  ? "bg-[#f0e4d7] hover:bg-[#e2cdb9]"
                  : "bg-zinc-800 hover:bg-zinc-700"}`}
            >
              <Icon
                size={20}
                className={`${theme === "light" ? "text-[#3e2f1c]" : "text-textwarm"
                  }`}
              />
            </button>
          ))}
        </div>

        {/* Текст + перемикач */}
        <p className="text-sm text-center text-gray-400 dark:text-gray-500 pt-4">
          <Link to="/login" className="hover:underline">
            {t.haveAccount}
          </Link>
        </p>
      </div>
      <LanguageThemeSwitcher
        language={language}
        setLanguage={setLanguage}
      />
    </div>
  );
}
