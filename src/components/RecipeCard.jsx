import "./RecipeCard.css"; // Optional CSS file for styling
import { Link } from "react-router";

function RecipeCard({ recipe }) {
  //recipe contains one whole recipe
  return (
    <Link
      to={`/recipe/${recipe.idMeal}`}
      style={{
        color: "inherit",
        textDecoration: "none",
      }}
    >
      <div className="recipe-card">
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="recipe-image"
        />
        <div className="flex flex-col m-1 justify-center text-center">
          <h2 className="font-bold">{recipe.strMeal}</h2>
          <p>Category: {recipe.strCategory}</p>
          <p>Continent: {recipe.strArea}</p>
          {/* {recipe.strYoutube && (
            <a
              href={recipe.strYoutube}
              target="_blank" 
              rel="noopener noreferrer"
            >
              Watch Recipe Video
            </a>
          )} */}
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
