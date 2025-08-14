import { useEffect, useState } from "react";
import "./SearchIngridents.css";
import RecipeCard from "./RecipeCard";
import "./RecipeCard.css"; // Optional CSS file for styling

function DisplayRecipeCard({ Recipes }) {
  const [thumbnails, setThumbnails] = useState([]);

  useEffect(() => {
    const fetchThumbnails = async () => {
      const results = await Promise.all(
        Recipes.map(async (mealid) => {
          const response = await fetch(
            `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealid}`
          );
          const data = await response.json();
          return data.meals[0];
        })
      );
      setThumbnails(results);
    };

    if (Recipes.length > 0) {
      fetchThumbnails();
    }
  }, [Recipes]);

  useEffect(() => {
    if (thumbnails.length > 0) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [thumbnails]);
  return (
    <div>
      <h4>Found Recipe:</h4>
      {thumbnails.map((item) => (
        <div
          key={item.id}
          style={{
            margin: "15px",
          }}
        >
          {/* <img src={item.thumb} alt={item.name} width={150} />
            <p>{item.name}</p> */}
          <RecipeCard recipe={item} />
        </div>
      ))}
    </div>
  );
}

export default function SearchIngridents() {
  const [inputs, setInputs] = useState([]);
  const [collectedRecipes, setCollectedRecipes] = useState([]);

  const handleSubmit = (formdata) => {
    const name = formdata.get("ingredient");
    if (name !== "") {
      if (inputs.includes(name)) {
        alert(`${name} already present`);
        return;
      }
      setInputs((prev) => [...prev, name]);
    }
  };
  const handleSearchRecipe = async () => {
    // alert("Searching Recipes");
    const newCollect = [];
    setCollectedRecipes([]);
    for (const ingredient of inputs) {
      try {
        const response = await fetch(
          `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
        );
        if (!response.ok) {
          throw new Error(
            `API error: ${response.status} ${response.statusText}`
          );
        }
        const data = await response.json();
        if (data.meals) {
          // alert("found")
          const mealIds = data.meals.slice(0, 3).map((meal) => meal.idMeal);
          newCollect.push(...mealIds);
        }
      } catch (error) {
        console.error(`Error fetching data for ${ingredient}:`, error);
      }
    }
    setCollectedRecipes(newCollect);
    console.log("Collected Recipe IDs:", newCollect);
  };
  const handleReset = () => {
    setInputs([]);
    setCollectedRecipes([]);
  };
  const [isopen, setIsopen] = useState(true);
  const handleIsOpen = () => {
    setIsopen((prev) => !prev);
  };
  return (
    <>
      {/* <div //div to toggle searchbar show
        onClick={handleIsOpen}
        className=" mt-3 cursor-pointer text-3xl inline-block"
      >
        <h3>Search Recipes with Ingredients</h3>
      </div> */}
      {/*className={`container  ${isopen ? "opacity-100" : "opacity-0"}`} */}
      <div className="container">
        <header>
          <h3>Search Recipes with Ingredients</h3>
        </header>
        <form
          className="add-ind-form"
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            handleSubmit(formData);
            e.target.reset();
          }}
        >
          <input type="text" placeholder="Oregano" name="ingredient" />
          <div className="button-group">
            <button type="submit">Add Ingredient</button>
            <button type="button" onClick={handleReset}>
              Reset
            </button>
          </div>
          <ul>
            {inputs.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
          {inputs.length > 2 && (
            <button onClick={handleSearchRecipe}>Search Recipes</button>
          )}
        </form>
        {collectedRecipes.length > 0 && (
          <DisplayRecipeCard Recipes={collectedRecipes} />
        )}
      </div>
    </>
  );
}
