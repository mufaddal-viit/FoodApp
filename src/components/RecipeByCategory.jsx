import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

const gifs = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmxxOTI2ZG81ZGs5aWJrZzVqZTNtZDJ4eWhjdnlhcXNjNGQ1eDQ0YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xTiQymjYza10NhOFDa/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmxxOTI2ZG81ZGs5aWJrZzVqZTNtZDJ4eWhjdnlhcXNjNGQ1eDQ0YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0HlPZiLi4qr2bmMw/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmxxOTI2ZG81ZGs5aWJrZzVqZTNtZDJ4eWhjdnlhcXNjNGQ1eDQ0YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/IsZ6k5d5oFxBK/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGUzOHU4YTg4MDFuMDhtbmpzYXQ0b3Z2cnhrZDdyZzZoeTc5NWxkOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/DYerUxZa9k568/giphy.gif",
  "https://media.giphy.com/media/NnPxQx0lTujKM/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGUzOHU4YTg4MDFuMDhtbmpzYXQ0b3Z2cnhrZDdyZzZoeTc5NWxkOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/or3YvoqY4adAA/giphy.gif",
];

function RecipesByCategory({ category }) {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [randomGifIndex, setRandomGifIndex] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setRandomGifIndex(Math.floor(Math.random() * gifs.length));
  }, [category]);

  useEffect(() => {
    const fetchData = async () => {
      if (!category) return;
      setLoading(true);
      setError(null);
      setRecipes([]);

      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`
        );
        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        if (!data.meals) {
          throw new Error("No recipes found for this category.");
        }
        setRecipes(data.meals);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [category]);

  return (
    <div className="flex flex-col gap-4">
      {loading && (
        <div className="flex flex-col items-center justify-center gap-2">
          {randomGifIndex !== null && (
            <img
              className="w-48 h-48 object-contain"
              src={gifs[randomGifIndex]}
              alt="Cooking..."
            />
          )}
          <div className="text-lg font-semibold">
            🍳 Cooking up delicious...
          </div>
        </div>
      )}

      {error && <p className="text-red-600 font-medium text-center">{error}</p>}

      {!loading && !error && recipes.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          {recipes.map((r) => (
            <RecipeCard key={r.idMeal} recipe={r} />
          ))}
        </div>
      )}

      {!loading && !error && recipes.length === 0 && (
        <p className="text-center text-gray-700 dark:text-gray-300">
          Please select a category to see recipes.
        </p>
      )}
    </div>
  );
}

export default RecipesByCategory;
