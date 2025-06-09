import { useTheme } from "./ThemeContext";
import { useLanguage } from "./LanguageContext";
import LanguageThemeSwitcher from "./LanguageThemeSwitcher";

export default function HelpScreen() {
  const { theme } = useTheme();
  const { language } = useLanguage();

  const faqs = {
    ua: [
      {
        q: "\u042f\u043a \u0441\u0442\u0432\u043e\u0440\u0438\u0442\u0438 \u043f\u0440\u043e\u0444\u0456\u043b?",
        a: "\u041f\u0435\u0440\u0435\u0439\u0434\u0456\u0442\u044c \u0434\u043e \u0420\u0435\u0434\u0430\u0433\u0443\u0432\u0430\u043d\u043d\u044f \u043f\u0440\u043e\u0444\u0456\u043b\u044e \u0456 \u0437\u0430\u043f\u043e\u0432\u043d\u0456\u0442\u044c \u043f\u043e\u043b\u044f."
      },
      {
        q: "\u042f\u043a \u043f\u043e\u0448\u0443\u043a \u043f\u0430\u0440?",
        a: "\u041f\u0435\u0440\u0435\u0433\u043b\u044f\u0434\u0430\u0439\u0442\u0435 \u043a\u0430\u0440\u0442\u043a\u0438 \u043d\u0430 \u0435\u043a\u0440\u0430\u043d\u0456 \u0441\u0432\u0430\u0439\u043f\u0456\u0432 \u0456 \u0441\u0432\u0430\u0439\u043f\u043d\u0456\u0442\u044c \u043b\u0456\u0432\u043e \u0430\u0431\u043e \u043f\u0440\u0430\u0432\u043e."
      }
    ],
    en: [
      {
        q: "How do I create a profile?",
        a: "Go to Edit Profile and fill in your details."
      },
      {
        q: "How does matching work?",
        a: "Browse cards on the swipe screen and swipe left or right."
      }
    ]
  };

  const list = faqs[language];

  return (
    <div
      className={`w-full max-w-[430px] mx-auto min-h-[800px] p-6 rounded-2xl shadow-xl transition-all duration-300 flex flex-col gap-6 ${
        theme === "light" ? "bg-warm text-black" : "bg-darkbg text-textwarm"
      }`}
    >
      <h2 className="text-2xl font-bold text-center">{language === "ua" ? "\u0414\u043e\u043f\u043e\u043c\u043e\u0433\u0430" : "Help"}</h2>
      <div className="space-y-4 text-sm">
        {list.map((item, i) => (
          <div key={i}>
            <p className="font-semibold">{item.q}</p>
            <p className="ml-2">{item.a}</p>
          </div>
        ))}
      </div>
      <LanguageThemeSwitcher />
    </div>
  );
}
