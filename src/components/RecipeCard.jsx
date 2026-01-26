import { Link } from "react-router";
import Favourite from "./Favourite.jsx";
import { useRecipes } from "../Context/RecipeContext.jsx";

function RecipeCard({ recipe }) {
  const recipeId = recipe?.idMeal ? String(recipe.idMeal) : "";
  const { favoriteIds, setFavorite } = useRecipes();
  const isFavorite = recipeId ? favoriteIds.includes(recipeId) : false;

  const handleToggleFavorite = (next) => {
    if (!recipeId) return;
    setFavorite(recipeId, next);
  };

  return (
    <Link
      to={`/recipe/${recipe.idMeal}`}
      className="block text-inherit no-underline"
    >
      <div
        className="
          group relative overflow-hidden rounded-3xl
          bg-white shadow-lg h-[520px]
          transition-all duration-500 ease-out
          hover:scale-[1.03] hover:shadow-2xl
          border border-gray-100
        "
      >
        <div className="absolute top-4 right-4 z-10">
          <Favourite
            isFavorite={isFavorite}
            onToggle={handleToggleFavorite}
            className="bg-white/90"
          />
        </div>
        {/* Image */}
        <div className="aspect-w-16 aspect-h-9 overflow-hidden">
          <img
            src={recipe.strMealThumb}
            alt={recipe.strMeal}
            className="
              w-full h-72 object-cover
              transition-all duration-700 ease-out
              group-hover:scale-110
            "
            loading="lazy"
          />
          {/* Subtle gradient overlay on hover */}
          <div
            className="
              absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent
              opacity-0 group-hover:opacity-100 transition-opacity duration-500
            "
          />
        </div>

        {/* Details */}
        <div className="p-6 sm:p-8">
          <h2
            className="
              text-2xl sm:text-3xl font-extrabold text-gray-900
              line-clamp-2 leading-tight
            "
          >
            {recipe.strMeal}
          </h2>

          <div className="mt-4 space-y-2 text-base sm:text-lg text-gray-600">
            <p className="font-medium">
              Category: <span className="font-bold text-pink-600">{recipe.strCategory}</span>
            </p>
            <p className="font-medium">
              Origin: <span className="font-bold text-teal-600">{recipe.strArea}</span>
            </p>
          </div>

          {/* Optional YouTube link - uncomment if you want it */}
          {/* {recipe.strYoutube && (
            <a
              href={recipe.strYoutube}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="
                mt-6 inline-block px-6 py-3 rounded-2xl
                bg-pink-500/20 backdrop-blur-sm border border-pink-300/30
                font-semibold text-pink-700
                hover:bg-pink-500/40 transition-all
              "
            >
              Watch Video Recipe
            </a>
          )} */}
        </div>

        {/* Hover shine effect (optional premium touch) */}
        <div
          className="
            absolute inset-0 pointer-events-none
            opacity-0 group-hover:opacity-100
            bg-gradient-to-tr from-transparent via-white/20 to-transparent
            -translate-x-full group-hover:translate-x-full
            transition-transform duration-1000
          "
        />
      </div>
    </Link>
  );
}

export default RecipeCard;
