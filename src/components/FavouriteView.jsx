import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard.jsx";
import { fetchRecipeById, getFavoriteIds } from "../utils.js";

export default function FavouriteView() {
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isCancelled = false;
    const target = document.getElementById("main-content");
    if (target) {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
    }

    const loadFavorites = async () => {
      setLoading(true);
      setError("");

      try {
        const ids = getFavoriteIds();
        if (ids.length === 0) {
          setRecipes([]);
          return;
        }

        const results = await Promise.all(
          ids.map((id) => fetchRecipeById(id))
        );
        if (!isCancelled) {
          setRecipes(results.filter(Boolean));
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err?.message || "Failed to load favorites.");
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    loadFavorites();

    return () => {
      isCancelled = true;
    };
  }, []);

  if (loading) {
    return <p className="text-center text-gray-600">Loading favorites...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  if (recipes.length === 0) {
    return <p className="text-center text-gray-600">No favorites yet.</p>;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
      {recipes.map((recipe) => (
        <RecipeCard key={recipe.idMeal} recipe={recipe} />
      ))}
    </div>
  );
}
