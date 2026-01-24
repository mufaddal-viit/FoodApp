import { BrowserRouter, Route, Routes } from "react-router";
import { Suspense, lazy } from "react";
import Layout from "./Layout";
import Home from "./components/Home.jsx";
import RecipesByCategoryWrapper from "./components/RecipesByCategoryWrapper.jsx";

const RecipeDetail = lazy(() => import("./components/RecipeDetail.jsx"));

function App() {
  return (
    <BrowserRouter basename="/FoodApp">
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="recipe/:mealid"
            element={
              <Suspense fallback={<div className="p-4">Loading recipe...</div>}>
                <RecipeDetail />
              </Suspense>
            }
          />
          <Route path="category/:category" element={<RecipesByCategoryWrapper />} />
          <Route path="*" element={<div className="p-4">Page not found</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
