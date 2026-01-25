// Header.jsx
import Welcome from "../components/Welcome";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import confetti from "canvas-confetti";
import SearchIngridents from "../components/SearchIngridents.jsx";
function Congratulation() {
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

function Header() {
  const navigate = useNavigate();
  const { category } = useParams();

  const handlecategory = (nextCategory) => {
    navigate(`/category/${nextCategory}`);
  };

  // Optional: Load confetti script (but since you're already importing from npm, this might not be needed)
  // Keeping it in case you're deploying to a context where dynamic loading is needed
  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
   <header
      className="relative bg-cover bg-center bg-no-repeat rounded-b-3xl
                 min-h-[100svh] md:min-h-[90vh] flex items-start md:items-center justify-center py-5 sm:py-3"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3851070/pexels-photo-3851070.jpeg')`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60"></div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h1 className="font-bold tracking-tight">
          <span className="block text-3xl sm:text-4xl md:text-5xl opacity-90 mt-2">
            Welcome to
          </span>

          <button
            type="button"
            className="mt-6 inline-block px-6 sm:px-10 md:px-12 py-4 sm:py-5 text-4xl sm:text-5xl md:text-6xl 
                       font-extrabold bg-white/20 backdrop-blur-md rounded-3xl border-2 border-white/30
                       hover:bg-white/30 hover:scale-105 transition-all duration-300 shadow-2xl"
            onMouseEnter={() => Congratulation?.()} // optional/chained to avoid errors if undefined
            onClick={() => Congratulation?.()}
          >
            MF KITCHEN
          </button>
        </h1>

        <p className="mt-2 sm:mt-1 text-lg sm:text-2xl md:text-3xl opacity-90 max-w-3xl mx-auto mb-2">
          Discover delicious recipes, tips, and culinary inspiration
        </p>

        {/* Category selection */}
        <div className="mt-2 sm:mt-1 flex flex-col gap-10 pb-6">
          <div className="w-full max-w-xl mx-auto">
            <SearchIngridents />
          </div>
          <Welcome choice={category} onChange={handlecategory} />
        </div>
      </div>
    </header>

  );
}

export default Header;
