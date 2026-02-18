import { BrowserRouter, Route, Routes } from "react-router";
import { Suspense, lazy } from "react";
import Layout from "./Layout";
import Home from "./components/Home.jsx";
import RecipesByCategoryWrapper from "./components/RecipesByCategoryWrapper.jsx";
import FavouriteView from "./components/FavouriteView.jsx"

const RecipeDetail = lazy(() => import("./components/RecipeDetail.jsx"));


function App() {
  return (
    <BrowserRouter basename="/FoodApp">
      <Routes>
        <Route path="/" element={<Layout variant="home" />}>
          <Route index element={<Home />} />
        </Route>

        <Route element={<Layout variant="inner" />}>
          <Route
            path="recipe/:mealid"
            element={
              <Suspense fallback={<div className="p-4">Loading recipe...</div>}>
                <RecipeDetail />
              </Suspense>
            }
          />
          <Route path="favourites" element={<FavouriteView />}/>
          <Route path="category/:category" element={<RecipesByCategoryWrapper />} />
          <Route path="*" element={<div className="p-4">Page not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
