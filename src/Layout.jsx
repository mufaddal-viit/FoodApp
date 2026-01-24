import { Outlet } from "react-router";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import SearchIngridents from "./components/SearchIngridents.jsx";

export default function Layout() {
  return (
    <main className="min-h-screen w-full bg-gradient-to-r from-[#fd7272] to-[#6ae1f0] text-gray-900 dark:text-white">
      <Header />

      <div className="flex flex-col lg:flex-row gap-4 max-w-7xl mx-auto px-4 py-6">
        <aside className="w-full lg:w-1/4">
          <SearchIngridents />
        </aside>

        <section className="w-full lg:flex-1">
          <Outlet />
        </section>
      </div>

      <Footer />
    </main>
  );
}
