import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";
import "./RecipesByCategory.css"
const gifs = [
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmxxOTI2ZG81ZGs5aWJrZzVqZTNtZDJ4eWhjdnlhcXNjNGQ1eDQ0YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/xTiQymjYza10NhOFDa/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmxxOTI2ZG81ZGs5aWJrZzVqZTNtZDJ4eWhjdnlhcXNjNGQ1eDQ0YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0HlPZiLi4qr2bmMw/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdmxxOTI2ZG81ZGs5aWJrZzVqZTNtZDJ4eWhjdnlhcXNjNGQ1eDQ0YSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/IsZ6k5d5oFxBK/giphy.gif",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGUzOHU4YTg4MDFuMDhtbmpzYXQ0b3Z2cnhrZDdyZzZoeTc5NWxkOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/DYerUxZa9k568/giphy.gif",
  "https://media.giphy.com/media/NnPxQx0lTujKM/giphy.gif?cid=ecf05e4790bglbv5w6zei3oacltrjmtgua1kgk4tbmtidpr5&ep=v1_gifs_search&rid=giphy.gif&ct=g",
  "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMGUzOHU4YTg4MDFuMDhtbmpzYXQ0b3Z2cnhrZDdyZzZoeTc5NWxkOSZlcD12MV9naWZzX3NlYXJjaCZjdD1n/or3YvoqY4adAA/giphy.gif"
];

function RecipesByCategory({ category }) { //category is a string
  
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [randomGifIndex, setRandomGifIndex] = useState(null); // State to store random GIF index
useEffect(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Change GIF when category changes
  useEffect(() => {
    setRandomGifIndex(Math.floor(Math.random() * gifs.length));
  }, [category]); // Depend on category to change GIF on category change

  useEffect(() => {
    const fetchurl = async () => {
      if (!category) return;
      setLoading(true);
      setError(null);
      setRecipes([]);

      try {
        // const timeout = setTimeout(() => setLoading(false), 2000);
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${category}`
        );
        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} ${response.statusText}`
          );
        }
        const rec = await response.json();
        if (!rec.meals) {
          throw new Error("No recipes for this category at the moment.");
        }
        setRecipes(rec.meals); //main code here
      } catch (err) {
        setError(err.message);
      } finally {
        // clearTimeout(timeout); 
        setLoading(false);
      }
    };
    fetchurl();
  }, [category]);

  return (
    <>
      <div className="recipe-grid">
        {loading && (
          <div className="spinner-container">
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
        {error && <p className="error">{error}</p>}
        {!loading && !error && recipes.length > 0 && ( //main code here
          recipes.map((r) => <RecipeCard key={r.idMeal} recipe={r} />)
        )}
        {!loading && !error && recipes.length === 0 && (
          <p>Please select a category to see recipes.</p>
        )}
      </div>
    </>
  );
}

export default RecipesByCategory;
