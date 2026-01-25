import { useNavigate, useLocation } from "react-router";

const links = [
  { label: "Home", path: "/" },
  { label: "Chicken", path: "/category/Chicken" },
  { label: "Beef", path: "/category/Beef" },
  { label: "Lamb", path: "/category/Lamb" },
  { label: "Vegetarian", path: "/category/Vegetarian" },
];

export default function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <footer
      className="relative bg-cover bg-center bg-no-repeat mt-3"
      style={{
        backgroundImage: `url('https://images.pexels.com/photos/3851070/pexels-photo-3851070.jpeg')`,
      }}
    >
      {/* Dark overlay to match header exactly */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60"></div>

      {/* Content - mirrored structure from Header */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-2 text-center text-white">
        <p className="mt-6 sm:mt-8 text-lg sm:text-2xl md:text-3xl opacity-90 max-w-3xl mx-auto">
          Thank you for visiting :)
        </p>

        {/* Navigation links - styled like category cards but horizontal */}
        <nav className="mt-12 sm:mt-16">
          <div className="flex flex-wrap justify-center gap-6 sm:gap-10 md:gap-14">
            {links.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <button
                  key={link.label}
                  onClick={() => navigate(link.path)}
                  className={`
                    px-6 sm:px-8 py-4 rounded-3xl text-xl sm:text-2xl font-extrabold uppercase tracking-wider
                    bg-white/20 backdrop-blur-md border-2 border-white/30
                    transition-all duration-500 ease-out
                    hover:bg-white/30 hover:scale-110 hover:shadow-2xl
                    ${isActive ? "bg-white/40 border-pink-300/60 text-pink-200 scale-110 shadow-2xl" : ""}
                  `}
                >
                  {link.label}
                </button>
              );
            })}
          </div>
        </nav>

        {/* Footer note */}
        <p className="mt-16 text-base sm:text-lg opacity-80">
          © 2026 MF Kitchen • Crafted with ❤️
        </p>
      </div>
    </footer>
  );
}