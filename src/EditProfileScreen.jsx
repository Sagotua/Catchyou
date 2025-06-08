import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "./ThemeContext";

export default function EditProfileScreen() {
  const navigate = useNavigate();
  const { theme } = useTheme();
  const inputClass = `w-full px-4 py-3 rounded-xl placeholder-gray-400 ${
    theme === "light" ? "bg-white text-black" : "bg-zinc-800 text-white"
  }`;
  const popularInterests = [
    "Подорожі", "Музика", "Фільми", "Спорт", "Йога",
    "Танці", "Кавові побачення", "Відеоігри", "Меми",
    "Книги", "Тварини", "Кулінарія", "Фотографія", "Прогулянки"
  ];
  const toggleInterest = (interest) => {
    setProfile((prev) => {
      const alreadySelected = prev.interests.includes(interest);
      if (alreadySelected) {
        return {
          ...prev,
          interests: prev.interests.filter((i) => i !== interest)
        };
      } else if (prev.interests.length < 10) {
        return {
          ...prev,
          interests: [...prev.interests, interest]
        };
      }
      return prev;
    });
  };


  const defaultProfile = {
    name: "",
    age: "",
    bio: "",
    photo: "",
    media: [],
    interests: [],
    relationshipGoal: "",
    height: "",
    languages: [],
    moreAboutMe: {
      zodiac: "",
      education: "",
      familyPlans: "",
      personalityType: "",
      communicationStyle: "",
      loveStyle: ""
    },
    lifestyle: {
      pets: "",
      drinks: "",
      smoking: "",
      workouts: "",
      foodPreference: "",
      socialMedia: "",
      sleepHabits: ""
    },
    jobTitle: "",
    company: "",
    school: "",
    location: "",
    gender: "",
    orientation: "",
    hideAge: false,
    hideDistance: false
  };

  const [profile, setProfile] = useState(defaultProfile);

  useEffect(() => {
    const stored = localStorage.getItem("userProfile");
    if (stored) {
      const parsed = JSON.parse(stored);
      setProfile((prev) => ({
        ...prev,
        ...parsed,
        moreAboutMe: {
          ...defaultProfile.moreAboutMe,
          ...parsed.moreAboutMe
        },
        lifestyle: {
          ...defaultProfile.lifestyle,
          ...parsed.lifestyle
        }
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setProfile((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value
    }));
  };

  const handleNestedChange = (section, name, value) => {
    setProfile((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value
      }
    }));
  };

  const handlePhotoAdd = () => {
    const url = prompt("Вставте URL зображення:");
    if (url && profile.media.length < 9) {
      setProfile((prev) => ({
        ...prev,
        media: [...prev.media, url]
      }));
    }
  };

  const handlePhotoRemove = (index) => {
    setProfile((prev) => ({
      ...prev,
      media: prev.media.filter((_, i) => i !== index)
    }));
  };

  const handleSave = () => {
    localStorage.setItem("userProfile", JSON.stringify(profile));
    navigate("/profile");
  };

  return (
    <div
      className={`w-full max-w-md mx-auto min-h-screen transition-colors duration-300 ${
        theme === "light" ? "bg-warm text-black" : "bg-darkbg text-textwarm"
      }`}
    >
      <div className="p-6 space-y-4 overflow-y-auto pb-24">
        <h2 className="text-xl font-bold text-center">Редагування профілю</h2>

        {/* Медіа */}
        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Медіа</h3>
          <div className="grid grid-cols-3 gap-2">
            {profile.media.map((url, idx) => (
              <div key={idx} className="relative">
                <img
                  src={url}
                  alt={`photo-${idx}`}
                  className="w-full h-24 object-cover rounded-lg"
                />
                <button
                  onClick={() => handlePhotoRemove(idx)}
                  className={`absolute top-1 right-1 text-xs px-2 rounded-full ${
                    theme === "light" ? "bg-white/70 text-black" : "bg-black/50 text-white"
                  }`}
                >
                  ×
                </button>
              </div>
            ))}
            {profile.media.length < 9 && (
              <button
                onClick={handlePhotoAdd}
                className={`w-full h-24 rounded-lg flex items-center justify-center transition ${
                  theme === "light" ? "bg-zinc-200 hover:bg-zinc-300" : "bg-zinc-800 text-gray-400 hover:bg-zinc-700"
                }`}
              >
                + Додати фото
              </button>
            )}
          </div>
        </div>

        {/* Ім’я */}
        <div>
          <label className="block mb-1 text-sm">Ім’я</label>
          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            className={inputClass}
            placeholder="Ваше ім’я"
          />
        </div>

        {/* Вік */}
        <div>
          <label className="block mb-1 text-sm">Вік</label>
          <input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            className={inputClass}
            placeholder="Ваш вік"
          />
        </div>

        {/* Біо */}
        <div>
          <label className="block mb-1 text-sm">Про себе</label>
          <textarea
            name="bio"
            value={profile.bio}
            onChange={handleChange}
            maxLength={500}
            className={`${inputClass} resize-none h-24`}
            placeholder="Опишіть себе..."
          />
        </div>

        {/* Основне фото */}
        <div>
          <label className="block mb-1 text-sm">URL основного фото</label>
          <input
            type="text"
            name="photo"
            value={profile.photo}
            onChange={handleChange}
            className={inputClass}
            placeholder="https://..."
          />
        </div>

        <div className="space-y-2">
          <h3 className="font-semibold text-lg">Інтереси (макс. 10)</h3>
          <div className="flex flex-wrap gap-2">
            {popularInterests.map((interest) => {
              const selected = profile.interests.includes(interest);
              return (
                <button
                  key={interest}
                  type="button"
                  onClick={() => toggleInterest(interest)}
                  className={`px-4 py-2 rounded-full text-sm border transition ${selected
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "bg-zinc-800 border-zinc-700 text-gray-400 hover:bg-zinc-700"
                    }`}
                >
                  {interest}
                </button>
              );
            })}
          </div>
        </div>


        {/* Більше про мене */}
        <div className="space-y-4">
          <h3 className="font-semibold text-lg mt-4">Більше про мене</h3>

          {/* Знак зодіаку */}
          <div className="space-y-1">
            <label className="block text-sm">Знак зодіаку</label>
            <div className="flex flex-wrap gap-2">
              {[
                "Овен", "Телець", "Близнюки", "Рак", "Лев", "Діва",
                "Терези", "Скорпіон", "Стрілець", "Козеріг", "Водолій", "Риби"
              ].map((sign) => (
                <button
                  key={sign}
                  type="button"
                  onClick={() => handleNestedChange("moreAboutMe", "zodiac", sign)}
                  className={`px-4 py-2 rounded-full text-sm border transition ${profile.moreAboutMe.zodiac === sign
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "bg-zinc-800 border-zinc-700 text-gray-400 hover:bg-zinc-700"
                    }`}
                >
                  {sign}
                </button>
              ))}
            </div>
          </div>

          {/* Плани на сім’ю */}
          <div className="space-y-1">
            <label className="block text-sm">Плани на сім’ю</label>
            <div className="flex flex-wrap gap-2">
              {[
                "Хочу дітей", "Не хочу дітей", "В майбутньому", "Не впевнений"
              ].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleNestedChange("moreAboutMe", "familyPlans", option)}
                  className={`px-4 py-2 rounded-full text-sm border transition ${profile.moreAboutMe.familyPlans === option
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "bg-zinc-800 border-zinc-700 text-gray-400 hover:bg-zinc-700"
                    }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {/* Тип особистості */}
          <div className="space-y-1">
            <label className="block text-sm">Тип особистості</label>
            <div className="flex flex-wrap gap-2">
              {["Екстраверт", "Інтроверт", "Амбіверт"].map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => handleNestedChange("moreAboutMe", "personalityType", type)}
                  className={`px-4 py-2 rounded-full text-sm border transition ${profile.moreAboutMe.personalityType === type
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "bg-zinc-800 border-zinc-700 text-gray-400 hover:bg-zinc-700"
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>

          {/* Стиль спілкування */}
          <div className="space-y-1">
            <label className="block text-sm">Стиль спілкування</label>
            <div className="flex flex-wrap gap-2">
              {["Активний", "Спокійний", "Збалансований"].map((style) => (
                <button
                  key={style}
                  type="button"
                  onClick={() => handleNestedChange("moreAboutMe", "communicationStyle", style)}
                  className={`px-4 py-2 rounded-full text-sm border transition ${profile.moreAboutMe.communicationStyle === style
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "bg-zinc-800 border-zinc-700 text-gray-400 hover:bg-zinc-700"
                    }`}
                >
                  {style}
                </button>
              ))}
            </div>
          </div>

          {/* Освіта */}
          <div>
            <label className="block mb-1 text-sm">Освіта</label>
            <input
              type="text"
              value={profile.moreAboutMe.education}
              onChange={(e) => handleNestedChange("moreAboutMe", "education", e.target.value)}
              className={inputClass}
              placeholder="Ваша освіта"
            />
          </div>

          {/* Стиль кохання */}
          <div>
            <label className="block mb-1 text-sm">Стиль кохання</label>
            <input
              type="text"
              value={profile.moreAboutMe.loveStyle}
              onChange={(e) => handleNestedChange("moreAboutMe", "loveStyle", e.target.value)}
              className={inputClass}
              placeholder="Ваш стиль кохання"
            />
          </div>
        </div>

        {/* Спосіб життя */}
        <div className="space-y-2 mt-6">
          <h3 className="font-semibold text-lg">Спосіб життя</h3>

          {[
            {
              key: "pets",
              label: "Домашні улюбленці",
              options: ["Маю", "Люблю, але не маю", "Не люблю"]
            },
            {
              key: "drinks",
              label: "Напої",
              options: ["Не п’ю", "Іноді", "Регулярно"]
            },
            {
              key: "smoking",
              label: "Як часто куриш?",
              options: ["Не курю", "Іноді", "Курю регулярно"]
            },
            {
              key: "workouts",
              label: "Тренування",
              options: ["Щодня", "Кілька разів на тиждень", "Не займаюсь"]
            },
            {
              key: "foodPreference",
              label: "Гастрономічні вподобання",
              options: ["Всеїдний", "Вегетаріанець", "Веган"]
            },
            {
              key: "socialMedia",
              label: "Соцмережі",
              options: ["Активно користуюсь", "Зрідка", "Не користуюсь"]
            },
            {
              key: "sleepHabits",
              label: "Звички щодо сну",
              options: ["Ранній птах", "Нічна сова", "Без режиму"]
            }
          ].map(({ key, label, options }) => (
            <div key={key}>
              <label className="block mb-1 text-sm">{label}</label>
              <div className="flex flex-wrap gap-2">
                {options.map((option) => {
                  const selected = profile.lifestyle[key] === option;
                  return (
                    <button
                      key={option}
                      type="button"
                      onClick={() =>
                        handleNestedChange("lifestyle", key, option)
                      }
                      className={`px-4 py-2 rounded-full text-sm border transition ${selected
                        ? "bg-purple-600 border-purple-600 text-white"
                        : "bg-zinc-800 border-zinc-700 text-gray-400 hover:bg-zinc-700"
                        }`}
                    >
                      {option}
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* Робота, навчання, місце проживання */}
        <div className="space-y-4 mt-6">
          <div>
            <label className="block mb-1 text-sm">Посада</label>
            <input
              type="text"
              name="jobTitle"
              value={profile.jobTitle}
              onChange={handleChange}
              className={inputClass}
              placeholder="Наприклад: Дизайнер"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Компанія</label>
            <input
              type="text"
              name="company"
              value={profile.company}
              onChange={handleChange}
              className={inputClass}
              placeholder="Де працюєте?"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Навчальний заклад</label>
            <input
              type="text"
              name="school"
              value={profile.school}
              onChange={handleChange}
              className={inputClass}
              placeholder="Наприклад: ЛНУ ім. Франка"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm">Населений пункт</label>
            <input
              type="text"
              name="location"
              value={profile.location}
              onChange={handleChange}
              className={inputClass}
              placeholder="Місто, село..."
            />
          </div>
        </div>


        {/* Ціль стосунків */}
        <div className="space-y-2 mt-6">
          <h3 className="font-semibold text-lg">Ціль стосунків</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Довготривалі стосунки",
              "Несерйозні стосунки",
              "Короткотривалий роман",
              "Дружба",
              "Ще точно не знаю"
            ].map((option) => {
              const selected = profile.relationshipGoal === option;
              return (
                <button
                  key={option}
                  type="button"
                  onClick={() => handleChange({ target: { name: "relationshipGoal", value: option } })}
                  className={`px-4 py-2 rounded-full text-sm border transition ${selected
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "bg-zinc-800 border-zinc-700 text-gray-400 hover:bg-zinc-700"
                    }`}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>

        {/* Твій зріст */}
        <div>
          <label className="block mb-1 text-sm">Твій зріст (см)</label>
          <input
            type="number"
            name="height"
            value={profile.height}
            onChange={handleChange}
            className={inputClass}
            placeholder="Наприклад, 180"
          />
        </div>

        {/* Мови (до 5) */}
        <div className="space-y-2 mt-4">
          <h3 className="font-semibold text-lg">Мови (макс. 5)</h3>
          <div className="flex flex-wrap gap-2">
            {[
              "Українська",
              "Англійська",
              "Польська",
              "Німецька",
              "Французька",
              "Іспанська",
              "Італійська",
              "Турецька",
              "Японська"
            ].map((lang) => {
              const selected = profile.languages.includes(lang);
              return (
                <button
                  key={lang}
                  type="button"
                  onClick={() => {
                    setProfile((prev) => {
                      const already = prev.languages.includes(lang);
                      if (already) {
                        return {
                          ...prev,
                          languages: prev.languages.filter((l) => l !== lang)
                        };
                      } else if (prev.languages.length < 5) {
                        return {
                          ...prev,
                          languages: [...prev.languages, lang]
                        };
                      }
                      return prev;
                    });
                  }}
                  className={`px-4 py-2 rounded-full text-sm border transition ${selected
                    ? "bg-purple-600 border-purple-600 text-white"
                    : "bg-zinc-800 border-zinc-700 text-gray-400 hover:bg-zinc-700"
                    }`}
                >
                  {lang}
                </button>
              );
            })}
          </div>
        </div>

        {/* Стать, Орієнтація, Контроль профілю */}
        <div className="space-y-4 mt-6">
          {/* Стать */}
          <div>
            <label className="block mb-1 text-sm font-medium">Стать</label>
            <select
              name="gender"
              value={profile.gender}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Оберіть стать</option>
              <option value="Чоловік">Чоловік</option>
              <option value="Жінка">Жінка</option>
              <option value="Як би ж я знав :)">Як би ж я знав :)</option>
            </select>
          </div>

          {/* Сексуальна орієнтація */}
          <div>
            <label className="block mb-1 text-sm font-medium">Сексуальна орієнтація</label>
            <select
              name="orientation"
              value={profile.orientation}
              onChange={handleChange}
              className={inputClass}
            >
              <option value="">Оберіть орієнтацію</option>
              <option value="Гетеросексуальна">Гетеросексуальна</option>
              <option value="Гомосексуальна">Гомосексуальна</option>
              <option value="Бісексуальна">Бісексуальна</option>
              <option value="Інше">Інше</option>
            </select>
          </div>

          {/* Контроль профілю */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">Контроль профілю</label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="hideAge"
                checked={profile.hideAge}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm">Не показувати мій вік</span>
            </label>

            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="hideDistance"
                checked={profile.hideDistance}
                onChange={handleChange}
                className="w-4 h-4"
              />
              <span className="text-sm">Не показувати відстань до мене</span>
            </label>
          </div>
        </div>



        {/* Кнопка */}
        <button
          onClick={handleSave}
          className="w-full bg-purple-600 py-3 rounded-xl font-semibold hover:bg-purple-700 transition mt-6"
        >
          Зберегти
        </button>
        {/* Попередній перегляд профілю */}
        <div className="mt-10 p-4 border border-zinc-700 rounded-xl">
          <h3 className="text-lg font-semibold mb-4 text-center">Попередній перегляд</h3>

          {profile.photo && (
            <img
              src={profile.photo}
              alt="Головне фото"
              className="w-full h-64 object-cover rounded-xl mb-4"
            />
          )}

          <div className="space-y-1">
            <p className="text-xl font-bold">
              {profile.name}{" "}
              {!profile.hideAge && profile.age && (
                <span className="text-gray-400">({profile.age})</span>
              )}
            </p>

            {profile.bio && <p className="text-sm text-gray-400">{profile.bio}</p>}

            {profile.interests.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {profile.interests.map((i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-zinc-800 rounded-full text-xs text-gray-300"
                  >
                    {i}
                  </span>
                ))}
              </div>
            )}

            <div className="text-sm text-gray-500 mt-4 space-y-1">
              {profile.gender && <p>Стать: {profile.gender}</p>}
              {profile.orientation && <p>Орієнтація: {profile.orientation}</p>}
              {profile.location && <p>Місто: {profile.location}</p>}
              {profile.relationshipGoal && <p>Ціль стосунків: {profile.relationshipGoal}</p>}
              {!profile.hideAge && profile.height && <p>Зріст: {profile.height} см</p>}
            </div>

            {profile.media.length > 0 && (
              <div className="mt-4">
                <h4 className="text-sm mb-2 text-gray-400">Додаткові фото</h4>
                <div className="grid grid-cols-3 gap-2">
                  {profile.media.map((url, idx) => (
                    <img
                      key={idx}
                      src={url}
                      alt={`media-${idx}`}
                      className="w-full h-20 object-cover rounded-lg"
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
