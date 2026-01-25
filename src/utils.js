export async function fetchRecipesByIngredients(
  ingredients,
  maxPerIngredient = 3
) {
  const collectedIds = new Set();
  const detailedRecipes = [];

  for (const ingredient of ingredients) {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(
        ingredient
      )}`
    );
    const data = await res.json();

    if (!data?.meals) continue;

    for (const meal of data.meals.slice(0, maxPerIngredient)) {
      if (collectedIds.has(meal.idMeal)) continue;
      collectedIds.add(meal.idMeal);

      const detailRes = await fetch(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
      );
      const detailData = await detailRes.json();
      if (detailData?.meals?.[0]) {
        detailedRecipes.push(detailData.meals[0]);
      }
    }
  }

  return detailedRecipes;
}

export async function fetchRecipeById(mealId) {
  if (!mealId) return null;

  const res = await fetch(
    `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
  );
  const data = await res.json();
  return data?.meals?.[0] || null;
}

export async function fetchRandomRecipes({
  allowedCategories = [],
  limit = 10,
  existingIds = [],
  onRecipe,
  shouldCancel,
} = {}) {
  if (limit <= 0) return [];

  const seenIds = new Set(existingIds);
  const collected = [];

  while (!shouldCancel?.() && collected.length < limit) {
    const response = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await response.json();
    const meal = data.meals?.[0];

    if (!meal) continue;
    if (
      allowedCategories.length > 0 &&
      !allowedCategories.includes(meal.strCategory)
    ) {
      continue;
    }
    if (seenIds.has(meal.idMeal)) continue;

    seenIds.add(meal.idMeal);
    collected.push(meal);
    onRecipe?.(meal, collected);
  }

  return collected;
}
