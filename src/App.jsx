import { BrowserRouter as Router, Routes, Route } from "react-router";
import RecipeDetail from "./components/RecipeDetail.jsx";
import Home from "./components/Home.jsx";
import Layout from "./Layout";
import "./App.css";
import { useState } from "react";
import RecipesByCategoryWrapper from "./components/RecipesByCategoryWrapper.jsx";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SearchIngridents from "./components/SearchIngridents.jsx";
import { RecipesProvider } from "./Context/RecipeContext";

function App() {
  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategory = (category) => {
    setSelectedCategory(category);
  };

  return (
    <RecipesProvider>
      <Router basename="/FoodApp">
        {" "}
        {/* ✅ Add basename here */}
        <Header choice={selectedCategory} onChangez={handleCategory} />
        <div style={{ display: "flex", minHeight: "80vh" }}>
          <div>
            <SearchIngridents />
          </div>

          <div style={{ flex: 1, padding: "1rem" }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="recipe/:mealid" element={<RecipeDetail />} />
              <Route
                path="/:backtopage"
                element={<RecipesByCategoryWrapper />}
              />
            </Routes>
          </div>
        </div>
        <Footer onchangecat={handleCategory} />
      </Router>
    </RecipesProvider>
  );
}

export default App;
