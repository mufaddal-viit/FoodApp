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

export default DisplayRecipeCard;