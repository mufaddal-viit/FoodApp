import { Link } from "react-router";
import Favourite from "./Favourite.jsx";
import { useRecipes } from "../Context/RecipeContext.jsx";

function RecipeCard({ recipe }) {
  const recipeId = recipe?.idMeal ? String(recipe.idMeal) : "";
  const recipeLink = recipeId ? `/recipe/${recipeId}` : "/";
  const { favoriteIds, setFavorite } = useRecipes();
  const isFavorite = recipeId ? favoriteIds.includes(recipeId) : false;
  const mealName = recipe?.strMeal || "Untitled recipe";
  const mealImage = recipe?.strMealThumb || "";
  const category = recipe?.strCategory || "General";
  const origin = recipe?.strArea || "Global";

  const getInstructionSteps = () => {
    const raw = recipe?.strInstructions || "";
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

  const instructionSteps = getInstructionSteps();
  const mealDescription =
    instructionSteps[0] ||
    `A ${category.toLowerCase()} recipe inspired by ${origin} flavors.`;

  const handleToggleFavorite = (next) => {
    if (!recipeId) return;
    setFavorite(recipeId, next);
  };

  return (
    <Link
      to={recipeLink}
      className="group block h-full rounded-[24px] text-inherit no-underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent"
    >
      <article
        className="
          relative isolate flex h-full flex-col overflow-hidden rounded-[24px]
          border border-slate-200/80 bg-white
          shadow-[0_14px_34px_-20px_rgba(15,23,42,0.6)]
          transition-all duration-300
          active:scale-[0.985]
          lg:h-[520px]
          sm:hover:-translate-y-1 sm:hover:shadow-[0_24px_45px_-24px_rgba(15,23,42,0.65)]
        "
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          {mealImage ? (
            <img
              src={mealImage}
              alt={mealName}
              className="h-full w-full object-cover transition-transform duration-500 sm:group-hover:scale-105"
              loading="lazy"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-br from-slate-200 via-slate-300 to-slate-200" />
          )}

          <div className="absolute right-3 top-3 z-10">
            <Favourite
              isFavorite={isFavorite}
              onToggle={handleToggleFavorite}
              className="h-10 w-10 bg-white/95 p-0 text-slate-700 shadow-sm ring-1 ring-white/70 backdrop-blur-sm"
            />
          </div>

          <p className="absolute bottom-3 left-3 rounded-full bg-black/30 px-2.5 py-1 text-[11px] font-medium tracking-wide text-white/95 backdrop-blur-sm">
            {origin} cuisine
          </p>
        </div>

        <div className="flex flex-1 flex-col gap-3 p-4 sm:p-5">
          {/* Subtle gradient overlay on hover */}
          <div
            className="
            pointer-events-none absolute inset-0 z-10
              bg-gradient-to-t from-black/60 via-black/20 to-transparent
              opacity-0 transition-opacity duration-500
              lg:group-hover:opacity-100
              group-active:opacity-100
            "
          />
          <h2
            className="
              overflow-hidden text-[1.15rem] font-extrabold leading-tight text-slate-900 sm:text-xl
              [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] border-b border-slate-100 pb-3
            "
          >
            {mealName}
          </h2>

          <p
            className="
              text-sm leading-relaxed text-slate-600
              [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:3] overflow-hidden
            "
          >
            {mealDescription}
          </p>

          <div className="mt-auto flex items-center justify-between border-t border-slate-100 pt-3 text-sm font-semibold text-slate-600">
            <span>View recipe</span>
            {/* <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs text-slate-700">
              Tap
            </span> */}
          </div>
        </div>

        {/* Glassy hover sweep (large screens) */}
        <div
          className="
            absolute inset-0 pointer-events-none
            opacity-0 group-hover:opacity-100
            bg-gradient-to-tr from-transparent via-white/20 to-transparent
            -translate-x-full group-hover:translate-x-full
            transition-transform duration-1000
          "
        />
      </article>
    </Link>
  );
}

export default RecipeCard;
