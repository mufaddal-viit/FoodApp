import RecipesByCategory from "./RecipeByCategory";
import { useParams } from "react-router";


function RecipesByCategoryWrapper() {
  const { category } = useParams();

  return <RecipesByCategory category={category} />;
}

export default RecipesByCategoryWrapper;
