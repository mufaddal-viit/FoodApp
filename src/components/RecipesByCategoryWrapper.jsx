import RecipesByCategory from "./RecipeByCategory";
import { useParams } from "react-router";


function RecipesByCategoryWrapper({ category }) {
  const { backtopage } = useParams();

  // Fallback logic: if backtopage is undefined, null, or "null", use prop category
  const resolvedCategory = !backtopage || backtopage === "null" ? category : backtopage;

  // console.log(resolvedCategory);

  return (
    <>
      <RecipesByCategory category={resolvedCategory} />
    </>
  );
}

export default RecipesByCategoryWrapper;
