import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { ChevronLeft, Clock, ListChecks, Utensils, Globe, Play } from "lucide-react";
import { fetchRecipeById } from "../utils.js";
import DisplayIngredients from "./DisplayIngridents.jsx"; // renamed for correctness
import DisplaySteps from "./DisplaySteps.jsx";

export default function RecipeDetail() {
  const { mealid } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const data = await fetchRecipeById(mealid);
        setRecipe(data);
      } catch (err) {
        console.error("Error fetching recipe:", err);
      } finally {
        setLoading(false);
      }
    })();
  }, [mealid]);

  useEffect(() => {
    if (recipe) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [recipe]);

  const getIngredients = () => {
    if (!recipe) return [];
    return Array.from({ length: 20 }, (_, i) => i + 1)
      .map((i) => {
        const ing = recipe[`strIngredient${i}`]?.trim();
        const measure = recipe[`strMeasure${i}`]?.trim();
        return ing ? { ingredient: ing, measure } : null;
      })
      .filter(Boolean);
  };

  const getInstructionSteps = () => {
    const raw = recipe?.strInstructions || "";
    const normalized = raw.replace(/\r\n/g, "\n").trim();
    if (!normalized) return [];

    // Try numbered steps with "Step X" / "step X" markers
    const stepMarkerRegex = /(?:^|\n)\s*(?:step\s*\d+|[0-9]+)\s*[:.-]?\s*/gi;
    if (stepMarkerRegex.test(normalized)) {
      return normalized
        .split(stepMarkerRegex)
        .map((s) => s.trim())
        .filter(Boolean);
    }

    // Fallback: split by double newlines (paragraphs)
    const paragraphs = normalized.split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
    return paragraphs.length > 0 ? paragraphs : [normalized];
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
        <div className="text-center">
          <div className="animate-spin h-10 w-10 mx-auto mb-4 border-4 border-emerald-500 border-t-transparent rounded-full" />
          <p className="text-lg font-medium text-slate-600">Loading delicious recipe...</p>
        </div>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="text-center px-6">
          <h2 className="text-2xl font-bold text-slate-800 mb-3">Recipe not found</h2>
          <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 text-white rounded-xl hover:bg-emerald-700 transition"
          >
            <ChevronLeft size={18} /> Go Back
          </button>
        </div>
      </div>
    );
  }

  const ingredients = getIngredients();
  const steps = getInstructionSteps().length
    ? getInstructionSteps()
    : ["No instructions available for this recipe."];

  const prepTimeEstimate = Math.max(15, steps.length * 5 + ingredients.length * 1.5);
  const difficulty = prepTimeEstimate > 45 ? "Advanced" : prepTimeEstimate > 25 ? "Medium" : "Easy";

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white pb-12 rounded-2xl">
      {/* Mobile Layout */}
      <div className="lg:hidden rounded-2xl">
        {/* Hero Image + Title Overlay */}
        <div className="relative ">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="w-full h-[38vh] object-cover brightness-[0.85] rounded-2xl"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h1 className="text-3xl font-extrabold text-white leading-tight drop-shadow-lg">
              {recipe.strMeal}
            </h1>
            <div className="mt-3 flex flex-wrap gap-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                <Clock size={14} /> ~{prepTimeEstimate} min
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                <Globe size={14} /> {recipe.strArea || "—"}
              </span>
              <span className="px-3 py-1 bg-emerald-500/80 backdrop-blur-sm rounded-full text-white text-sm font-semibold">
                {difficulty}
              </span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="px-5 pt-6 pb-10">
          <div className="grid grid-cols-3 gap-3 mb-8">
            <div className="bg-white rounded-2xl p-4 shadow-md text-center border border-slate-100">
              <Utensils className="mx-auto mb-1 text-emerald-600" size={22} />
              <p className="text-xl font-bold text-slate-800">{ingredients.length}</p>
              <p className="text-xs text-slate-500">Ingredients</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-md text-center border border-slate-100">
              <ListChecks className="mx-auto mb-1 text-emerald-600" size={22} />
              <p className="text-xl font-bold text-slate-800">{steps.length}</p>
              <p className="text-xs text-slate-500">Steps</p>
            </div>
            <div className="bg-white rounded-2xl p-4 shadow-md text-center border border-slate-100">
              <Clock className="mx-auto mb-1 text-emerald-600" size={22} />
              <p className="text-xl font-bold text-slate-800">~{prepTimeEstimate}</p>
              <p className="text-xs text-slate-500">Minutes</p>
            </div>
          </div>

          <DisplayIngredients ingredients={ingredients} className="mb-10" />
          <DisplaySteps steps={steps} className="mb-8" />

          {/* Extra links */}
          <div className="flex flex-wrap gap-3 mt-10">
            {recipe.strSource && (
              <a
                href={recipe.strSource}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-3 px-5 bg-slate-800 text-white rounded-xl font-medium hover:bg-slate-900 transition"
              >
                View Original Source
              </a>
            )}
            {recipe.strYoutube && (
              <a
                href={recipe.strYoutube}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 text-center py-3 px-5 bg-red-400 text-white rounded-xl font-medium hover:bg-red-700 transition flex items-center justify-center gap-2"
              >
                <Play size={18} /> Watch Video
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Desktop / Tablet Layout */}
      <div className="hidden lg:block max-w-7xl mx-auto px-6 xl:px-8 pt-10">
        <button
          onClick={() => navigate(-1)}
          className="group inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 mb-8 transition"
        >
          <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          Back to recipes
        </button>

        <div className="grid lg:grid-cols-2 gap-10 xl:gap-16">
          {/* Left – Hero Image */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-200/50 aspect-[4/5] lg:aspect-auto lg:h-[780px] sticky top-6 self-start">
            <img
              src={recipe.strMealThumb}
              alt={recipe.strMeal}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent" />

            <div className="absolute bottom-0 left-0 right-0 p-10">
              <h1 className="text-5xl xl:text-6xl font-extrabold text-white leading-[1.05] drop-shadow-xl">
                {recipe.strMeal}
              </h1>

              <div className="mt-6 flex flex-wrap gap-4 text-white/90">
                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full">
                  <Clock size={18} /> ~{prepTimeEstimate} min
                </div>
                <div className="flex items-center gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full">
                  <Globe size={18} /> {recipe.strArea || "International"}
                </div>
                <div className="flex items-center gap-2 bg-emerald-600/80 px-4 py-2 rounded-full font-medium">
                  {difficulty}
                </div>
              </div>
            </div>
          </div>

          {/* Right – Content */}
          <div className="space-y-12">
            <div className="bg-white rounded-3xl p-8 xl:p-10 shadow-xl border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 inline-flex items-center gap-3">
                <Utensils className="text-emerald-600" /> Ingredients
                <span className="text-lg font-normal text-slate-500 ml-2">
                  ({ingredients.length})
                </span>
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                {ingredients.map(({ ingredient, measure }, i) => (
                  <div
                    key={i}
                    className="flex justify-between items-center py-3 border-b border-slate-100 last:border-0"
                  >
                    <span className="font-medium text-slate-800">{ingredient}</span>
                    <span className="text-slate-600 font-light">{measure || "—"}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-3xl p-8 xl:p-10 shadow-xl border border-slate-100">
              <h2 className="text-3xl font-bold text-slate-900 mb-6 inline-flex items-center gap-3">
                <ListChecks className="text-emerald-600" /> Instructions
              </h2>

              <ol className="space-y-6 text-slate-700 text-lg leading-relaxed">
                {steps.map((step, i) => (
                  <li key={i} className="flex gap-5">
                    <span className="flex-shrink-0 w-9 h-9 rounded-full bg-emerald-100 text-emerald-700 font-bold flex items-center justify-center text-lg">
                      {i + 1}
                    </span>
                    <span>{step.replace(/\.$/, "")}.</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4">
              {recipe.strYoutube && (
                <a
                  href={recipe.strYoutube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-red-600 text-white rounded-2xl font-semibold hover:bg-red-700 transition shadow-lg shadow-red-200/30"
                >
                  <Play size={20} /> Watch on YouTube
                </a>
              )}

              {recipe.strSource && (
                <a
                  href={recipe.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-8 py-4 bg-slate-800 text-white rounded-2xl font-semibold hover:bg-slate-900 transition"
                >
                  Original Source
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
