import { useTheme } from "./ThemeContext";
import { useLanguage } from "./LanguageContext";
import LanguageThemeSwitcher from "./LanguageThemeSwitcher";

export default function AboutAppScreen() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  return (
    <div
      className={`w-full max-w-[430px] mx-auto min-h-[800px] p-6 rounded-2xl shadow-xl transition-all duration-300 flex flex-col gap-6 ${
        theme === "light" ? "bg-warm text-black" : "bg-darkbg text-textwarm"
      }`}
    >
      <h2 className="text-2xl font-bold text-center">{language === "ua" ? "\u041f\u0440\u043e \u0437\u0430\u0441\u0442\u043e\u0441\u0443\u043d\u043e\u043a" : "About App"}</h2>
      <p className="text-sm leading-relaxed">
        {language === "ua"
          ? "CatchYou \u2014 \u0446\u0435 \u0434\u0435\u043c\u043e \u0434\u043e\u0434\u0430\u0442\u043e\u043a \u0434\u043b\u044f \u043d\u0430\u0439\u043e\u0448\u0442\u0440\u0435\u043d\u0435\u043d\u043d\u044f \u0437\u043d\u0430\u0439\u043e\u043c\u0441\u0442\u0432. \u0412\u0456\u043d \u0441\u0442\u0432\u043e\u0440\u0435\u043d\u0438\u0439 \u0434\u043b\u044f \u0434\u043e\u043a\u0430\u0437\u0443 \u043a\u043e\u043d\u0446\u0435\u043f\u0446\u0456\u0457 \u0456 \u043d\u0435 \u043f\u0440\u0435\u0442\u0435\u043d\u0434\u0443\u0454 \u043d\u0430 \u043f\u043e\u0432\u043d\u0443 \u0444\u0443\u043d\u043a\u0446\u0456\u043e\u043d\u0430\u043b\u044c\u043d\u0456\u0441\u0442\u044c."
          : "CatchYou is a demo dating app showcasing basic interface ideas. It is built for concept demonstration and does not aim to provide full functionality."}
      </p>
      <LanguageThemeSwitcher />
    </div>
  );
}
