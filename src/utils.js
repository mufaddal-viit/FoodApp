import confetti from "canvas-confetti";

export const HEADER_BACKGROUND_IMAGE =
  "https://images.pexels.com/photos/3851070/pexels-photo-3851070.jpeg";

export const CONFETTI_SCRIPT_URL ="https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js"

export const FAVORITES_KEY = "favoriteRecipeIds";

export const getFavoriteIds = () => {
  if (typeof window === "undefined") return [];
  try {
    const stored = window.localStorage.getItem(FAVORITES_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
};

export const setFavoriteIds = (ids) => {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(FAVORITES_KEY, JSON.stringify(ids));
};

export const toggleFavoriteId = (id, shouldFavorite) => {
  if (!id) return getFavoriteIds();
  const key = String(id);
  const ids = new Set(getFavoriteIds());
  if (shouldFavorite) {
    ids.add(key);
  } else {
    ids.delete(key);
  }
  const next = Array.from(ids);
  setFavoriteIds(next);
  return next;
};

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

export function Congratulation() {
  const duration = 5 * 1000;
  const animationEnd = Date.now() + duration;
  const defaults = {
    startVelocity: 30,
    spread: 360,
    ticks: 60,
    zIndex: 9999,
  };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }

  const interval = setInterval(() => {
    const timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    const particleCount = 50 * (timeLeft / duration);
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
    });
    confetti({
      ...defaults,
      particleCount,
      origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
    });
  }, 250);
}
