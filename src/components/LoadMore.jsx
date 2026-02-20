export default function LoadMore({
  onClick,
  loading = false,
  disabled = false,
  label = "Load More Recipes",
  loadingLabel = "Loading...",
  className = "",
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={loading || disabled}
      className={[
        "mx-auto my-8 flex items-center gap-2.5 px-8 py-4",
        "text-base font-medium tracking-wide text-white",
        "bg-gradient-to-r from-rose-500 to-pink-600",
        "hover:from-rose-600 hover:to-pink-700",
        "disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed",
        "rounded-full shadow-lg shadow-rose-500/25 hover:shadow-rose-600/40",
        "transition-all duration-300 active:scale-95 disabled:active:scale-100",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {loading ? (
        <>
          <svg
            className="h-5 w-5 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
          {loadingLabel}
        </>
      ) : (
        label
      )}
    </button>
  );
}
