import { useLocation, useNavigate } from "react-router";
import { ChevronLeft, House } from "lucide-react";

function toTitleCase(value) {
  return value
    .split(" ")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}

function getPageTitle(pathname) {
  if (pathname.startsWith("/recipe/")) return "Recipe";
  if (pathname.startsWith("/category/")) {
    const segment = pathname.split("/")[2] || "Category";
    return toTitleCase(decodeURIComponent(segment).replace(/-/g, " "));
  }
  if (pathname === "/favourites") return "Favorites";
  return "MF Kitchen";
}

export default function MobileHeader() {
  const navigate = useNavigate();
  const location = useLocation();
  const pathname = location.pathname;
  const title = getPageTitle(pathname);

  return (
    <header
      className="pointer-events-none fixed left-1/2 top-[max(0.5rem,env(safe-area-inset-top))] z-[100] w-[calc(100%-1rem)] max-w-md -translate-x-1/2 md:hidden"
    >
      <div
        className="pointer-events-auto rounded-3xl border border-white/20 bg-white/12 shadow-lg shadow-black/10 ring-1 ring-white/12 ring-inset backdrop-blur-2xl transition-all duration-300"
      >
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-5">
        {/* Back Button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className={`
            inline-flex h-10 w-10 items-center justify-center 
            rounded-full 
            bg-white/20 backdrop-blur-md 
            border border-white/25 
            text-slate-800 hover:text-slate-900
            shadow-[0_4px_10px_rgba(0,0,0,0.08)]
            transition-all duration-200 
            active:scale-95 hover:scale-[1.04] hover:shadow-lg
          `}
          aria-label="Go back"
        >
          <ChevronLeft className="h-5 w-5" strokeWidth={2.2} />
        </button>

        {/* Title */}
        <h1
          className={`
            max-w-[55vw] truncate 
            text-base font-extrabold tracking-widest
            text-white drop-shadow-sm 
          `}
        >
          {title.toUpperCase()}
        </h1>

        {/* Home Button */}
        <button
          type="button"
          onClick={() => navigate("/")}
          className={`
            inline-flex h-10 w-10 items-center justify-center 
            rounded-full 
            bg-white/20 backdrop-blur-md 
            border border-white/25 
            text-slate-800 hover:text-slate-900
            shadow-[0_4px_10px_rgba(0,0,0,0.08)]
            transition-all duration-200 
            active:scale-95 hover:scale-[1.04] hover:shadow-lg
          `}
          aria-label="Go to home"
        >
          <House className="h-5 w-5" strokeWidth={2.2} />
        </button>
      </div>
      </div>
    </header>
  );
}
