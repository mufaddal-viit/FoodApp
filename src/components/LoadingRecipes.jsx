import { useEffect, useState } from "react";
import { LOADING_GIFS } from "../utils.js";

export default function LoadingRecipes({ isLoading }) {
  const [randomGifIndex, setRandomGifIndex] = useState(null);

  useEffect(() => {
    if (!isLoading || LOADING_GIFS.length === 0) return;
    setRandomGifIndex(Math.floor(Math.random() * LOADING_GIFS.length));
  }, [isLoading]);

  if (!isLoading) return null;

  return (
    <div className="flex flex-col items-center justify-center gap-2">
      {randomGifIndex !== null && (
        <img
          className="w-48 h-48 object-contain"
          src={LOADING_GIFS[randomGifIndex]}
          alt="Cooking..."
        />
      )}
      <div className="text-lg font-semibold">Cooking up delicious...</div>
    </div>
  );
}
