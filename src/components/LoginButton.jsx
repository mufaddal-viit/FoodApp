const LoginButton = ({ onOpen }) => {
  return (
<div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-20">
  <button
    type="button"
    onClick={onOpen}
    className="
      px-5 py-2.5 sm:px-6 sm:py-3 rounded-full
      bg-white/20 backdrop-blur-md border-2 border-white/30
      text-white font-bold text-base sm:text-lg
    hover:bg-white/65 hover:backdrop-blur-lg
      transition-all duration-300 shadow-lg
      active:scale-[0.98] cursor-pointer
    "
  >
    Login
  </button>
</div>
  );
};

export default LoginButton;
