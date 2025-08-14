import { useEffect, useState } from "react";
import { useRecipes } from "../Context/RecipeContext.jsx";
import RecipeCard from "./RecipeCard.jsx";
import "./RecipeCard.css";
import SearchIngridents from "./SearchIngridents.jsx";
import "./Home.css";

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
  const [randomGifIndex, setRandomGifIndex] = useState(null); // State to store random GIF index
  //scroll to top
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Change GIF when category changes
  useEffect(() => {
    if (loading) {
      setRandomGifIndex(Math.floor(Math.random() * gifs.length));
    }
  });
  useEffect(() => {
    const allowedCategories = ["Chicken", "Beef", "Lamb", "Vegetarian"];
    let isCancelled = false;

    if (recipes.length >= 10) return; // Already loaded

    const fetchRecipes = async () => {
      setLoading(true);
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
                return [...prev, meal];
              }
              return prev;
            });
          }
        }
      } catch (err) {
        if (!isCancelled) setError(err.message || "Something went wrong");
      } finally {
        setLoading(false); // ✅ Here, once after all loops or error
      }
    };

    fetchRecipes();

    return () => {
      isCancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className=" flex gap-2 m-1 ">
      {/* <div className="sidebar">
        <SearchIngridents />
      </div> */}
      <div className="flex flex-col flex-1">
        {loading && (
          <div className="spinner-container flex flex-col items-center mx-[10px]">
            {randomGifIndex !== null && (
              <img
                className="spinner-gif"
                src={gifs[randomGifIndex]}
                alt="Cooking..."
              />
            )}
            <div className="spinner-text">🍳 Cooking up delicious...</div>
          </div>
        )}
        {error && <p>Error: {error}</p>}
        <div className="recipe-grid ">
          {recipes.map((recipe) => (
            <RecipeCard key={recipe.idMeal} recipe={recipe} />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Home;
