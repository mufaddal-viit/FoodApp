import { BrowserRouter as Router, Routes, Route } from "react-router";
import RecipeDetail from "./components/RecipeDetail.jsx";
import Home from "./components/Home.jsx";
import Layout from "./Layout";
// import "./App.css";
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
    <main className="min-h-screen w-full bg-gradient-to-r from-[#fd7272] to-[#6ae1f0] text-gray-900 dark:text-white">
      <RecipesProvider>
        <Router basename="/FoodApp">
          <Header choice={selectedCategory} onChangez={handleCategory} />

          <div className="flex flex-col lg:flex-row gap-4 max-w-7xl mx-auto px-4 py-6">
            {/* Sidebar / Ingredient Search */}
            <aside className="w-full lg:w-1/4">
              <SearchIngridents />
            </aside>

            {/* Main Content */}
            <section className="w-full lg:flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="recipe/:mealid" element={<RecipeDetail />} />
                <Route
                  path="/:backtopage"
                  element={<RecipesByCategoryWrapper />}
                />
              </Routes>
            </section>
          </div>

          <Footer onchangecat={handleCategory} />
        </Router>
      </RecipesProvider>
    </main>
  );
}

export default App;
