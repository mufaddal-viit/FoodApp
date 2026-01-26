import { useState } from "react";
import {Heart} from "lucide-react";

export default function Favourite({
  isFavorite,
  onToggle,
  className = "",
  stopPropagation = true,
}) {
  const [localFavorite, setLocalFavorite] = useState(false);
  const isControlled = typeof isFavorite === "boolean";
  const active = isControlled ? isFavorite : localFavorite;

  const handleClick = (event) => {
    if (stopPropagation && event) {
      event.preventDefault();
      event.stopPropagation();
    }
    const next = !active;
    if (isControlled) {
      onToggle?.(next);
      return;
    }
    setLocalFavorite(next);
    onToggle?.(next);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={active}
      className={` active:scale-[0.99] 
        inline-flex items-center justify-center cursor-pointer
        rounded-full  px-3 py-1.5 text-xs font-semibold
        transition-all duration-200
        
        ${className}
      `}
    >
      {active ? <Heart className=" fill-red-500 text-red-500 scale-110"/> : <Heart />}
    </button>
  );
}
