import { useEffect, useState } from "react";
import RecipeCard from "./RecipeCard";

function DisplayRecipeCard({ recipes }) {
  useEffect(() => {
    if (recipes.length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [recipes]);

  return (
    <div className="mt-6 w-full">
      <h4 className="text-xl font-semibold mb-4 text-white">Found Recipes:</h4>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> */}
      {recipes.map((item) => (
        <div className="space-y-3">
          <RecipeCard key={item.idMeal} recipe={item} />
        </div>
      ))}
    </div>
  );
}

export default function SearchIngridents() {
  const [ingredients, setIngredients] = useState([]);
  const [recipes, setRecipes] = useState([]);
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

  const handleSearchRecipes = async () => {
    setRecipes([]);
    setLoading(true);
    setError("");

    try {
      const collectedIds = new Set();
      const detailedRecipes = [];

      for (const ingredient of ingredients) {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
        );
        const data = await res.json();

        if (data?.meals) {
          for (const meal of data.meals.slice(0, 3)) {
            if (!collectedIds.has(meal.idMeal)) {
              collectedIds.add(meal.idMeal);
              const detailRes = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
              );
              const detailData = await detailRes.json();
              if (detailData?.meals?.[0]) {
                detailedRecipes.push(detailData.meals[0]);
              }
            }
          }
        }
      }

      if (detailedRecipes.length === 0) {
        setError("No recipes found for the selected ingredients.");
      } else {
        setRecipes(detailedRecipes);
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

  return (
    <div
  className="
    w-full
    max-w-none sm:max-w-[420px] lg:max-w-[360px]
    mx-auto
    rounded-2xl
    bg-gradient-to-b from-[#327573] to-[#868acf]
    text-white
    shadow-xl
    border border-white/10
    overflow-hidden
  "
>
  {/* Header */}
  <header className="px-5 pt-5 pb-3">
    <h3 className="text-xl sm:text-2xl font-bold text-center tracking-tight text-white">
      Search by Ingredients
    </h3>
    <p className="mt-1 text-center text-sm text-white/80">
      Add 2+ ingredients to find matching recipes.
    </p>
  </header>

  {/* Body */}
  <div className="px-5 pb-5">
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        handleAddIngredient(formData);
        e.currentTarget.reset();
      }}
      className="space-y-4"
    >
      <div className="space-y-2">
        <label htmlFor="ingredient" className="text-sm font-medium text-white/90">
          Ingredient
        </label>

        <input
          id="ingredient"
          type="text"
          name="ingredient"
          placeholder="e.g. Oregano"
          autoComplete="off"
          inputMode="text"
          enterKeyHint="done"
          minLength={2}
          required
          className="
            w-full
            rounded-xl
            bg-white
            px-4 py-3
            text-base text-gray-900
            shadow-sm
            outline-none
            ring-1 ring-black/10
            focus:ring-2 focus:ring-teal-300
          "
        />
      </div>

      {/* Buttons: stack on very small screens, row on sm+ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          type="submit"
          className="
            inline-flex items-center justify-center
            rounded-xl
            border border-black/20
            bg-white/10
            px-4 py-3
            text-base font-semibold
            active:scale-[0.99]
            hover:bg-white/15
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
          "
        >
          Add
        </button>

        <button
          type="button"
          onClick={handleReset}
          className="
            inline-flex items-center justify-center
            rounded-xl
            border border-black/20
            bg-white/10
            px-4 py-3
            text-base font-semibold
            active:scale-[0.99]
            hover:bg-red-500/20
            focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
          "
        >
          Reset
        </button>
      </div>
    </form>

    {/* Selected list */}
    {ingredients.length > 0 && (
      <div className="mt-5 rounded-xl bg-black/10 p-4">
        <h4 className="text-base font-semibold text-white">Selected Ingredients</h4>

        <ul className="mt-2 space-y-1">
          {ingredients.map((item, idx) => (
            <li
              key={`${item}-${idx}`}
              className="flex items-center justify-between gap-3 rounded-lg bg-white/10 px-3 py-2"
            >
              <span className="text-sm sm:text-base">{item}</span>

              {/* Optional: remove one ingredient (mobile-friendly) */}
              {/* <button
                type="button"
                onClick={() => handleRemoveIngredient(item)}
                className="text-xs font-semibold text-white/80 hover:text-white"
                aria-label={`Remove ${item}`}
              >
                Remove
              </button> */}
            </li>
          ))}
        </ul>
      </div>
    )}

    {/* Search button */}
    {ingredients.length >= 2 && (
      <button
        onClick={handleSearchRecipes}
        disabled={loading}
        className="
          mt-5 w-full
          inline-flex items-center justify-center
          rounded-xl
          bg-teal-500/90
          px-4 py-3
          text-base font-semibold
          shadow-sm
          hover:bg-teal-500
          disabled:opacity-50 disabled:cursor-not-allowed
          focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
        "
      >
        {loading ? "Searching..." : "Search Recipes"}
      </button>
    )}

    {/* Error */}
    {error && (
      <p className="mt-4 rounded-xl bg-red-500/15 px-4 py-3 text-sm text-red-100">
        {error}
      </p>
    )}

    {/* Results */}
    {!loading && recipes.length > 0 && (
      <div className="mt-5">
        <DisplayRecipeCard recipes={recipes} />
      </div>
    )}
  </div>
</div>

  );
}
