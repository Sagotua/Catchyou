import TinderCard from "react-tinder-card";
import { forwardRef } from "react";
import { useTheme } from "./ThemeContext";

const SwipeCard = forwardRef(({ name, age, about, photo, onSwipe }, ref) => {
  const { theme } = useTheme();
  return (
    <TinderCard
      preventSwipe={["down"]}
      onSwipe={onSwipe}
      ref={ref}
      className="absolute"
    >
      <div
        className={`w-[320px] h-[500px] rounded-2xl shadow-lg overflow-hidden animate-fadeInUp transition-all duration-500 ${
          theme === "light" ? "bg-white text-black" : "bg-zinc-800 text-white"
        }`}
      >
        <img src={photo} alt={name} className="w-full h-2/3 object-cover" />
        <div className="p-4">
          <h2 className="text-xl font-bold">{name}, {age}</h2>
          <p className="text-sm text-gray-300 mt-2">{about}</p>
        </div>
      </div>
    </TinderCard>
  );
});

export default SwipeCard;
