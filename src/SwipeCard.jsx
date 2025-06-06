import TinderCard from "react-tinder-card";
import { forwardRef } from "react";

const SwipeCard = forwardRef(({ name, age, about, photo, onSwipe }, ref) => {
  return (
    <TinderCard
      preventSwipe={["down"]}
      onSwipe={onSwipe}
      ref={ref}
      className="absolute"
    >
      <div className="w-[320px] h-[500px] bg-zinc-800 text-white rounded-2xl shadow-lg overflow-hidden 
        animate-fadeInUp transition-all duration-500">
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
