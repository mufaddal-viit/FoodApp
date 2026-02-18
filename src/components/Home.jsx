import { useEffect, useState } from "react";
import { useRecipes } from "../Context/RecipeContext.jsx";
import { fetchRandomRecipes } from "../utils.js";
import LoadingRecipes from "./LoadingRecipes.jsx";
import RecipeCard from "./RecipeCard.jsx";

function Home() {
  const { recipes, setRecipes } = useRecipes();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    const allowedCategories = ["Chicken", "Beef", "Lamb", "Vegetarian"];
    let isCancelled = false;

    if (recipes.length >= 10) return;

    const fetchRecipes = async () => {
      setLoading(true);
      let firstRecipeAdded = false;
      const existingIds = recipes.map((recipe) => recipe.idMeal);
      const remaining = Math.max(0, 10 - existingIds.length);

      try {
        await fetchRandomRecipes({
          allowedCategories,
          limit: remaining,
          existingIds,
          shouldCancel: () => isCancelled,
          onRecipe: (meal) => {
            setRecipes((prev) => {
              const isDuplicate = prev.some((r) => r.idMeal === meal.idMeal);
              if (!isDuplicate && prev.length < 10) {
                return [...prev, meal];
              }
              return prev;
            });

            if (!firstRecipeAdded) {
              setLoading(false);
              firstRecipeAdded = true;
            }
          },
        });
      } catch (err) {
        if (!isCancelled) setError(err.message || "Something went wrong");
      } finally {
        if (!isCancelled && !firstRecipeAdded) {
          setLoading(false);
        }
      }
    };

    fetchRecipes();

    return () => {
      isCancelled = true;
    };
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <LoadingRecipes isLoading={loading} />

      {error && <p className="text-red-600 font-medium">Error: {error}</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>
    </div>
  );
}

export default Home;
