import { useCallback, useEffect, useRef, useState } from "react";
import { useRecipes } from "../Context/RecipeContext.jsx";
import { fetchRandomRecipes } from "../utils.js";
import LoadingRecipes from "./LoadingRecipes.jsx";
import LoadMore from "./LoadMore.jsx";
import RecipeCard from "./RecipeCard.jsx";

const ALLOWED_CATEGORIES = ["Chicken", "Beef", "Lamb", "Vegetarian"];
const INITIAL_BATCH_SIZE = 10;
const LOAD_MORE_BATCH_SIZE = 6;

function Home() {
  const { recipes, setRecipes } = useRecipes();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const hasFetchedInitialRef = useRef(false);
  const isCancelledRef = useRef(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  useEffect(() => {
    isCancelledRef.current = false;
    return () => {
      isCancelledRef.current = true;
    };
  }, []);

  const fetchRecipesBatch = useCallback(
    async (limit) => {
      if (loading) return;
      setLoading(true);
      setError(null);
      let firstRecipeAdded = false;
      const existingIds = recipes.map((recipe) => recipe.idMeal);

      try {
        await fetchRandomRecipes({
          allowedCategories: ALLOWED_CATEGORIES,
          limit,
          existingIds,
          shouldCancel: () => isCancelledRef.current,
          onRecipe: (meal) => {
            if (isCancelledRef.current) return;

            setRecipes((prev) => {
              const isDuplicate = prev.some((r) => r.idMeal === meal.idMeal);
              if (isDuplicate) return prev;
              return [...prev, meal];
            });

            if (!firstRecipeAdded) {
              setLoading(false);
              firstRecipeAdded = true;
            }
          },
        });
      } catch (err) {
        if (!isCancelledRef.current) {
          setError(err.message || "Something went wrong");
        }
      } finally {
        if (!isCancelledRef.current && !firstRecipeAdded) {
          setLoading(false);
        }
      }
    },
    [loading, recipes, setRecipes]
  );

  useEffect(() => {
    if (hasFetchedInitialRef.current || recipes.length > 0) return;
    hasFetchedInitialRef.current = true;
    fetchRecipesBatch(INITIAL_BATCH_SIZE);
  }, [fetchRecipesBatch, recipes.length]);

  const handleLoadMore = () => {
    fetchRecipesBatch(LOAD_MORE_BATCH_SIZE);
  };

  return (
    <div className="flex flex-col gap-4">
      <LoadingRecipes isLoading={loading} />

      {error && <p className="text-red-600 font-medium">Error: {error}</p>}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 md:grid-cols-3 xl:grid-cols-4">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.idMeal} recipe={recipe} />
        ))}
      </div>

      <LoadMore onClick={handleLoadMore} loading={loading} />
    </div>
  );
}

export default Home;
