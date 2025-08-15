import { useEffect, useState } from "react";
import { useRecipes } from "../Context/RecipeContext.jsx";
import RecipeCard from "./RecipeCard.jsx";
import "./RecipeCard.css";
import SearchIngridents from "./SearchIngridents.jsx";
// import "./Home.css";

const gifs = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmxxOTI2ZG81ZGs5aWJrZzVqZTNtZDJ4eWhjdnlhcXNjNGQ1eDQ0YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xTiQymjYza10NhOFDa/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmxxOTI2ZG81ZGs5aWJrZzVqZTNtZDJ4eWhjdnlhcXNjNGQ1eDQ0YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0HlPZiLi4qr2bmMw/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmxxOTI2ZG81ZGs5aWJrZzVqZTNtZDJ4eWhjdnlhcXNjNGQ1eDQ0YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/IsZ6k5d5oFxBK/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGUzOHU4YTg4MDFuMDhtbmpzYXQ0b3Z2cnhrZDdyZzZoeTc5NWxkOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/DYerUxZa9k568/giphy.gif",
  "https://media.giphy.com/media/NnPxQx0lTujKM/giphy.gif?cid=ecf05e4790bglbv5w6zei3oacltrjmtgua1kgk4tbmtidpr5&ep=v1_gifs_search&rid=giphy.gif&ct=g",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGUzOHU4YTg4MDFuMDhtbmpzYXQ0b3Z2cnhrZDdyZzZoeTc5NWxkOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/or3YvoqY4adAA/giphy.gif",
];

function Home() {
  const { recipes, setRecipes } = useRecipes();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [randomGifIndex, setRandomGifIndex] = useState(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    setRandomGifIndex(Math.floor(Math.random() * gifs.length));
  }, []);

  useEffect(() => {
    const allowedCategories = ["Chicken", "Beef", "Lamb", "Vegetarian"];
    let isCancelled = false;

    if (recipes.length >= 10) return;

    const fetchRecipes = async () => {
      setLoading(true);
      let firstRecipeAdded = false;
      try {
        while (!isCancelled && recipes.length < 10) {
          const response = await fetch(
            "https://www.themealdb.com/api/json/v1/1/random.php"
          );
          const data = await response.json();
          const meal = data.meals?.[0];

          if (meal && allowedCategories.includes(meal.strCategory)) {
            setRecipes((prev) => {
              const isDuplicate = prev.some((r) => r.idMeal === meal.idMeal);
              if (!isDuplicate && prev.length < 10) {
                if (!firstRecipeAdded) {
                  setLoading(false);
                  firstRecipeAdded = true;
                }
                return [...prev, meal];
              }
              return prev;
            });
          }
        }
      } catch (err) {
        if (!isCancelled) setError(err.message || "Something went wrong");
        setLoading(false);
      }
    };

    fetchRecipes();

    return () => {
      isCancelled = true;
    };
  }, []);

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

      {error && <p className="text-red-600 font-medium">Error: {error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default Home;
