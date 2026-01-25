// Header.jsx
import Welcome from "../components/Welcome";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import SearchIngridents from "../components/SearchIngridents.jsx";
import LoginButton from "./LoginButton.jsx";
import Login from "./Login.jsx";
import Signup from "./Signup.jsx";
import { Congratulation, HEADER_BACKGROUND_IMAGE, CONFETTI_SCRIPT_URL } from "../utils.js";

function Header() {
  const navigate = useNavigate();
  const { category } = useParams();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);

  const handlecategory = (nextCategory) => {
    navigate(`/category/${nextCategory}`);
  };

  const openLogin = () => {
    setIsSignupOpen(false);
    setIsLoginOpen(true);
  };

  const openSignup = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(true);
  };

  const closeAuth = () => {
    setIsLoginOpen(false);
    setIsSignupOpen(false);
  };

  // Optional: Load confetti script (but since you're already importing from npm, this might not be needed)
  // Keeping it in case you're deploying to a context where dynamic loading is needed
  useEffect(() => {
    const script = document.createElement("script");
    script.src = CONFETTI_SCRIPT_URL;
      ;
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
   <header
      className="relative bg-cover bg-center bg-no-repeat rounded-b-3xl
                 min-h-[100svh] md:min-h-[90vh] flex items-start md:items-center justify-center py-5 sm:py-3"
      style={{
        backgroundImage: `url('${HEADER_BACKGROUND_IMAGE}')`,
      }}
    >
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60"></div>
      <LoginButton onOpen={openLogin} />
      <Login isOpen={isLoginOpen} onClose={closeAuth} onSwitchToSignup={openSignup} />
      <Signup isOpen={isSignupOpen} onClose={closeAuth} onSwitchToLogin={openLogin} />

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

        <p className="mt-2 sm:mt-1 text-lg sm:text-xl md:text-xl opacity-90 max-w-3xl mx-auto mb-2">
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
