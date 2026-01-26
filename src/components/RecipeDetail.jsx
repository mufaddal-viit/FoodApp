import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { fetchRecipeById } from "../utils.js";

export default function RecipeDetail() {
  const { mealid } = useParams();
  const [recipedata, setRecipedata] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const recipe = await fetchRecipeById(mealid);
        setRecipedata(recipe);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [mealid]);

  useEffect(() => {
    if (recipedata) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [recipedata]);

  const getIngredients = () => {
    if (!recipedata) return [];
    return Array.from({ length: 20 }, (_, i) => i + 1)
      .map((i) => {
        const ing = recipedata[`strIngredient${i}`]?.trim();
        const amt = recipedata[`strMeasure${i}`]?.trim();
        return ing ? { ingredient: ing, measure: amt } : null;
      })
      .filter(Boolean);
  };

  const getInstructionSteps = () => {
    const raw = recipedata?.strInstructions || "";
    const normalized = raw.replace(/\r\n/g, "\n").trim();
    if (!normalized) return [];

    const stepMarkerRegex = /(?:^|\n)\s*step\s*\d+\s*[:.-]?\s*/gi;
    if (stepMarkerRegex.test(normalized)) {
      return normalized
        .split(stepMarkerRegex)
        .map((step) => step.trim())
        .filter(Boolean);
    }

    const paragraphs = normalized
      .split(/\n{2,}/)
      .map((step) => step.trim())
      .filter(Boolean);

    return paragraphs.length > 0 ? paragraphs : [normalized];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-2xl font-bold text-gray-600">Loading recipe...</p>
      </div>
    );
  }

  if (!recipedata) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-2xl font-bold text-red-600">Recipe not found</p>
      </div>
    );
  }

  const ingredients = getIngredients();
  const instructionSteps = getInstructionSteps();
  
  return (
    <div className="min-h-screen py-12">
      <div className="max-w-4xl mx-auto px-6 sm:px-1">
        {/* Main Recipe Card */}
        <div className="
          overflow-hidden rounded-3xl bg-white shadow-2xl
          border border-gray-100
        ">
          {/* Smaller, rounded image at top */}
          <div className="relative">
            <img
              src={recipedata.strMealThumb}
              alt={recipedata.strMeal}
              className="
                w-full h-80 sm:h-96 md:h-[500px] object-cover
                rounded-t-3xl
              "
            />
            {/* Subtle overlay for title readability if needed */}
            <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black/60 to-transparent rounded-t-3xl" />
          </div>

          {/* Content */}
          <div className="p-8 sm:p-12">
            {/* Title */}
            <h1 className="
              text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900
              text-center leading-tight -mt-8 mb-3
            ">
              {recipedata.strMeal}
            </h1>

            {/* Meta Pills */}
            <div className="flex flex-wrap justify-center gap-4 mb-4">
              <span className="px-6 py-3 rounded-full bg-pink-500/20 border border-pink-300/40 font-bold text-pink-800 text-lg">
                {recipedata.strCategory}
              </span>
              <span className="px-6 py-3 rounded-full bg-teal-500/20 border border-teal-300/40 font-bold text-teal-800 text-lg">
                {recipedata.strArea} Cuisine
              </span>
              {recipedata.strTags && (
                <span className="px-6 py-3 rounded-full bg-gray-200 border border-gray-300 font-bold text-gray-700 text-lg">
                  {recipedata.strTags.split(",").join(" • ")}
                </span>
              )}
            </div>

            {/* Source Links */}
            {(recipedata.strSource || recipedata.strYoutube) && (
              <div className="flex flex-wrap justify-center gap-6 mb-12">
                {recipedata.strSource && (
                  <a
                    href={recipedata.strSource}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-2xl bg-blue-500/10 border border-blue-300/40 font-bold text-blue-700 hover:bg-blue-500/20 transition-all"
                  >
                    Read Full Article
                  </a>
                )}
                {recipedata.strYoutube && (
                  <a
                    href={recipedata.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-8 py-4 rounded-2xl bg-red-500/10 border border-red-300/40 font-bold text-red-700 hover:bg-red-500/20 transition-all"
                  >
                    Watch on YouTube
                  </a>
                )}
              </div>
            )}

            {/* Ingredients */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center uppercase tracking-wider">
              Ingredients
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
              {ingredients.map(({ ingredient, measure }, idx) => (
                <div
                  key={idx}
                  className="
                    flex items-center justify-between px-6 py-5 rounded-2xl
                    bg-gradient-to-r from-pink-500/5 to-teal-500/5
                    border border-gray-200 shadow-sm
                    font-medium text-lg capitalize
                  "
                >
                  <span className="font-bold text-gray-800">{ingredient}</span>
                  <span className="text-pink-600 font-semibold">{measure || "-"}</span>
                </div>
              ))}
            </div>

            {/* Instructions */}
            <h2 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-8 text-center uppercase tracking-wider">
              Instructions
            </h2>
            <ol className="space-y-6 text-lg sm:text-xl text-gray-700 leading-relaxed">
              {instructionSteps.map((step, idx) => (
                <li key={idx} className="flex gap-6">
                  <span className="flex-shrink-0 w-12 h-12 rounded-full bg-pink-500/20 flex items-center justify-center font-extrabold text-pink-700 text-xl">
                    {idx + 1}
                  </span>
                  <span>{step.endsWith(".") ? step : `${step}.`}</span>
                </li>
              ))}
            </ol>

            {/* Back Button */}
            <div className="mt-16 text-center">
              <button
                onClick={() => navigate(-1)}
                className=" cursor-pointer active:scale-[0.99] 
                  px-10 py-5 rounded-2xl bg-gradient-to-r from-pink-500 to-teal-500
                  font-extrabold text-2xl text-white shadow-xl
                  hover:scale-105 hover:shadow-2xl transition-all duration-300
                "
              >
                ← Go Back
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
