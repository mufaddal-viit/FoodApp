import { createContext, useState, useContext } from "react";
import {
  getFavoriteIds,
  setFavoriteIds as persistFavoriteIds,
  toggleFavoriteId,
} from "../utils.js";

const RecipesContext = createContext();

export const RecipesProvider = ({ children }) => {
  const [recipes, setRecipes] = useState([]);
  const [favoriteIds, setFavoriteIdsState] = useState(() => getFavoriteIds());

  const setFavoriteIds = (nextIds) => {
    const normalized = Array.isArray(nextIds)
      ? nextIds.map((id) => String(id))
      : [];
    setFavoriteIdsState(normalized);
    persistFavoriteIds(normalized);
  };

  const setFavorite = (id, shouldFavorite) => {
    if (!id) return;
    const next = toggleFavoriteId(id, shouldFavorite);
    setFavoriteIdsState(next);
  };

  return (
    <RecipesContext.Provider
      value={{ recipes, setRecipes, favoriteIds, setFavoriteIds, setFavorite }}
    >
      {children}
    </RecipesContext.Provider>
  );
};

export const useRecipes = () => useContext(RecipesContext);
