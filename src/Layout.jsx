import { Outlet } from "react-router";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SearchIngridents from "./components/SearchIngridents.jsx";

export default function Layout() {
  return (
    <main className="min-h-screen w-full bg-gray-300 dark:bg-gray-900 text-gray-900 dark:text-white">
      <Header />

      <div id="main-content" className="flex flex-col lg:flex-row gap-8 max-w-7xl mx-auto px-4 sm:px-3 lg:px-3 py-12">
        <section className="w-full lg:flex-1">
          <Outlet />
        </section>
      </div>

      <Footer />
    </main>
  );
}