import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router";
import RecipesByCategory from "./RecipeByCategory";

function RecipeDetail() {
  const { mealid } = useParams();
  const [recipedata, setRecipedata] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
        );
        const { meals } = await res.json();
        setRecipedata(meals[0]);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      }
    })();
  }, [mealid]);

  useEffect(
    () => window.scrollTo({ top: 0, behavior: "smooth" }),
    [recipedata]
  );

  const getIngredients = () => {
    return Array.from({ length: 20 }, (_, i) => i + 1)
      .map((i) => {
        const ing = recipedata[`strIngredient${i}`];
        const amt = recipedata[`strMeasure${i}`];
        return ing?.trim() ? `${ing} – ${amt}` : null;
      })
      .filter(Boolean);
  };

  if (!recipedata) return <p className="text-center py-10">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6 bg-gray-100 min-h-screen">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <img
          src={recipedata.strMealThumb}
          alt={recipedata.strMeal}
          className="w-full h-64 object-cover"
        />
        <div className="p-6">
          <h1 className="text-3xl font-semibold text-gray-900 mb-4 text-center">
            {recipedata.strMeal}
          </h1>

          <div className="flex flex-wrap justify-center gap-6 mb-6 text-gray-700">
            <span className="px-3 py-1 bg-blue-100 rounded-full">
              Category: {recipedata.strCategory}
            </span>
            <span className="px-3 py-1 bg-green-100 rounded-full">
              Cuisine: {recipedata.strArea}
            </span>
            {recipedata.strTags && (
              <span className="px-3 py-1 bg-pink-100 rounded-full">
                Tags: {recipedata.strTags.split(",").join(", ")}
              </span>
            )}
          </div>

          {(recipedata.strSource || recipedata.strYoutube) && (
            <p className="text-gray-800 mb-8 leading-relaxed space-x-4 text-center">
              {recipedata.strSource && (
                <a
                  href={recipedata.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Read Article here
                </a>
              )}
              {recipedata.strYoutube && (
                <span className="ml-4">
                  <a
                    href={recipedata.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:underline"
                  >
                    Watch on YouTube
                  </a>
                </span>
              )}
            </p>
          )}

          <h2 className="text-2xl  text-gray-900 mb-4 uppercase font-bold">
            Ingredients
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8 capitalize">
            {getIngredients().map((ing, idx) => (
              <div
                key={idx}
                className="bg-gray-200 rounded-md p-3 text-center font-medium text-gray-700"
              >
                {ing}
              </div>
            ))}
          </div>

          <h2 className="text-2xl  text-gray-900 mb-4 uppercase font-bold">
            Instructions
          </h2>
          <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-800">
            {recipedata.strInstructions
              .split(/[\r\n.]+/)
              .map((s) => s.trim())
              .filter(Boolean)
              .map((step, idx) => (
                <li key={idx}>{step}.</li>
              ))}
          </ol>

          <div className="text-left">
            <button
              onClick={() => navigate(-1)}
              className="inline-block px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md shadow transition"
            >
              ← Go Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetail;
