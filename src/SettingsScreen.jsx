import { useNavigate } from "react-router-dom";
import { ThemeToggle } from "./ThemeToggle";
import { useTheme } from "./ThemeContext";
import { useLanguage } from "./LanguageContext";
import LanguageThemeSwitcher from "./LanguageThemeSwitcher";

export default function SettingsScreen() {
  const { theme } = useTheme();
  const { language, setLanguage } = useLanguage();
  const navigate = useNavigate();

  const handleSignOut = () => {
    localStorage.removeItem("userProfile");
    navigate("/", { replace: true });
  };

  return (
    <div
      className={`w-full max-w-[430px] mx-auto min-h-[800px] p-6 rounded-2xl shadow-xl transition-all duration-300 flex flex-col gap-6 ${
        theme === "light" ? "bg-warm text-black" : "bg-darkbg text-textwarm"
      }`}
    >
      <h2 className="text-2xl font-bold text-center">{language === "ua" ? "\u041d\u0430\u043b\u0430\u0448\u0442\u0443\u0432\u0430\u043d\u043d\u044f" : "Settings"}</h2>

      <div className="flex justify-between items-center">
        <span>{language === "ua" ? "\u0422\u0435\u043c\u0430" : "Theme"}</span>
        <ThemeToggle />
      </div>

      <div className="flex justify-between items-center">
        <span>{language === "ua" ? "\u041c\u043e\u0432\u0430" : "Language"}</span>
        <div className="flex gap-2">
          <button
            onClick={() => setLanguage("ua")}
            className={`px-3 py-1 rounded transition border text-sm ${
              language === "ua"
                ? theme === "light"
                  ? "bg-pastelPurple text-white"
                  : "bg-purple-600 text-textwarm"
                : theme === "light"
                ? "border-zinc-300"
                : "border-zinc-700"
            }`}
          >
            UA
          </button>
          <button
            onClick={() => setLanguage("en")}
            className={`px-3 py-1 rounded transition border text-sm ${
              language === "en"
                ? theme === "light"
                  ? "bg-pastelPurple text-white"
                  : "bg-purple-600 text-textwarm"
                : theme === "light"
                ? "border-zinc-300"
                : "border-zinc-700"
            }`}
          >
            EN
          </button>
        </div>
      </div>

      <button
        onClick={handleSignOut}
        className={`mt-auto py-3 rounded-xl font-semibold transition w-full ${
          theme === "light" ? "bg-pastelPurple text-white hover:bg-purple-400" : "bg-purple-600 text-textwarm hover:bg-purple-700"
        }`}
      >
        {language === "ua" ? "\u0412\u0438\u0439\u0442\u0438" : "Sign Out"}
      </button>

      <LanguageThemeSwitcher />
    </div>
  );
}
