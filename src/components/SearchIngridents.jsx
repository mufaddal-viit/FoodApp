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
    <div className="w-full sm:max-w-[400px] lg:max-w-[350px] bg-gradient-to-b from-[#327573] to-[#868acf] text-white p-5 rounded-xl shadow-xl">
      <header className="mb-6">
        <h3 className="text-2xl font-bold text-center text-[#213547]">
          Search by Ingredients
        </h3>
      </header>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          handleAddIngredient(formData);
          e.target.reset();
        }}
        className="space-y-4"
      >
        <input
          type="text"
          name="ingredient"
          placeholder="e.g. Oregano"
          className="w-full px-4 py-2 text-black rounded-md shadow focus:outline-none focus:ring-2 focus:ring-teal-400"
        />

        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 border-1 border-black hover:bg-teal-600 px-4 py-2 rounded-md font-semibold"
          >
            Add
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="flex-1 border-1 border-black hover:bg-red-500/25 px-4 py-2 rounded-md font-semibold"
          >
            Reset
          </button>
        </div>
      </form>

      {ingredients.length > 0 && (
        <div className="mt-6">
          <h4 className="text-lg font-semibold">Selected Ingredients:</h4>
          <ul className="list-disc pl-5 mt-2  space-y-1">
            {ingredients.map((item, idx) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      {ingredients.length >= 2 && (
        <button
          onClick={handleSearchRecipes}
          disabled={loading}
          className="mt-6 w-full border-1 border-black hover:bg-teal-600 px-4 py-2 rounded-md font-semibold disabled:opacity-50"
        >
          {loading ? "Searching..." : "Search Recipes"}
        </button>
      )}

      {error && <p className="text-red-300 mt-4">{error}</p>}

      {!loading && recipes.length > 0 && (
        <DisplayRecipeCard recipes={recipes} />
      )}
    </div>
  );
}
