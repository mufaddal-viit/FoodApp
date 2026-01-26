import { Outlet, useLocation, useNavigate } from "react-router";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const isFavourites = location.pathname === "/favourites";

  return (
    <main className="min-h-screen w-full bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />

      <div id="main-content" className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 sm:px-3 lg:px-3 py-12">
        <section className="w-full lg:flex-1">
          <Outlet />
        </section>
      </div>

      <Footer />

      <button
        type="button"
        onClick={() => navigate(isFavourites ? "/" : "/favourites")}
        className="
          fixed bottom-5 right-5 z-30
          w-32 rounded-full border-2 border-white/30
          bg-white/20 px-5 py-3 text-center text-sm font-bold text-white
          backdrop-blur-md shadow-lg
          hover:bg-white/65 hover:backdrop-blur-lg
          transition-all duration-300
          active:scale-[0.98] cursor-pointer
        "
      >
        {isFavourites ? "Home" : "Favorites"}
      </button>
    </main>
  );
}
