import { useState } from "react";

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
      className={`
        inline-flex items-center justify-center cursor-pointer hover:bg-pink-300/70 hover:text-white
        rounded-full border px-3 py-1.5 text-xs font-semibold
        transition-all duration-200
        ${active ? "border-pink-400 bg-pink-500/10 text-pink-700" : "border-gray-200 bg-white/80 text-gray-700"}
        ${className}
      `}
    >
      {active ? "Favorited" : "Favorite"}
    </button>
  );
}
