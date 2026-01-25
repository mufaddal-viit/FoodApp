import { useState } from "react";
import { useRecipes } from "../Context/RecipeContext.jsx";
import { fetchRecipesByIngredients } from "../utils.js";



export default function SearchIngridents() {
  const [ingredients, setIngredients] = useState([]);
  const { setRecipes } = useRecipes();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAddIngredient = (formData) => {
    const name = formData.get("ingredient")?.trim();
    if (!name) return;

    if (ingredients.includes(name.toLowerCase())) {
      alert(`${name} is already added.`);
      return;
    }

    setIngredients((prev) => [...prev, name.toLowerCase()]);
  };

  const scrollToMainContent = () => {
    const target = document.getElementById("main-content");
    if (!target) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

  const handleSearchRecipes = async () => {
    setRecipes([]);
    setLoading(true);
    setError("");

    try {
      const detailedRecipes = await fetchRecipesByIngredients(ingredients, 3);
      if (detailedRecipes.length === 0) {
        setError("No recipes found for the selected ingredients.");
      } else {
        setRecipes(detailedRecipes);
        requestAnimationFrame(scrollToMainContent);
      }
    } catch (err) {
      setError("An error occurred while fetching recipes.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setIngredients([]);
    setRecipes([]);
    setError("");
  };
  const handleRemoveIngredient = (itemToRemove) => {
    setIngredients((prev) => prev.filter((i) => i !== itemToRemove));
    setRecipes([]); // Clear results when removing
  };

  return (
    <div
      className="
        w-full max-w-xl mx-auto
        rounded-2xl
        text-white
        shadow-2xl
        shadow-white-500
      "
    >
      <div className="px-5 sm:px-6 py-2">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            handleAddIngredient(formData);
            e.currentTarget.reset();
          }}
          className="space-y-4"
        >
          <div>
            <input
              id="ingredient"
              type="text"
              name="ingredient"
              placeholder="Search by Ingredients"
              autoComplete="off"
              inputMode="text"
              enterKeyHint="done"
              minLength={2}
              required
              className="
                w-full
                rounded-2xl
                bg-white/10
                text-white placeholder-white/60
                px-8 py-2
                text-base
                border border-white/20
                shadow-sm
                outline-none
                focus:ring-2 focus:ring-white focus:border-white
              "
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="submit"
              className="
                w-full inline-flex items-center justify-center
                rounded-xl
                border border-white/20
                bg-white/10
                px-4 py-3
                text-base font-semibold
                transition-colors duration-200
                active:scale-[0.99]
                hover:bg-white/65 hover:backdrop-blur-lg 
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
              "
            >
              Add
            </button>

            <button
              type="button"
              onClick={handleReset}
              className="
                w-full inline-flex items-center justify-center
                rounded-xl
                border border-white/20
                bg-white/10
                px-4 py-3
                text-base font-semibold
                transition-colors duration-200
                active:scale-[0.99]
                hover:bg-white/65 hover:backdrop-blur-lg 
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
              "
            >
              Reset
            </button>
          </div>
        </form>

        {ingredients.length > 0 && (
          <div className="mt-1">
            <div className="mt-3 flex flex-wrap justify-start gap-2">
              {ingredients.map((item) => (
                <div
                  key={item}
                  className="
                    flex items-center gap-2 px-3  py-1.5 rounded-full
                    bg-white/10 border border-white/20
                    font-medium text-sm sm:text-base capitalize
                    max-w-full
                  "
                >
                  <span className="break-words">{item}</span>

                  <button
                    type="button"
                    onClick={() => handleRemoveIngredient(item)}
                    className="
                      w-5 h-5 rounded-full bg-white/30 flex items-center justify-center
                      hover:bg-white/50 transition-all text-xs font-bold
                    "
                    aria-label={`Remove ${item}`}
                  >
                    x
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {ingredients.length >= 2 && (
          <button
            onClick={handleSearchRecipes}
            disabled={loading}
            className="
              mt-5 w-full
              inline-flex items-center justify-center
              rounded-xl
              bg-white/25  border border-white/30
              px-4 py-3
              text-base font-semibold
              shadow-sm
              transition-colors duration-200
              hover:bg-white/65 hover:backdrop-blur-lg 
              disabled:opacity-50 disabled:cursor-not-allowed
              focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
            "
          >
            {loading ? "Searching..." : "Search Recipes"}
          </button>
        )}

        {error && (
          <p className="mt-4 rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-100">
            {error}
          </p>
        )}
      </div>
    </div>
  );
}
