export default function Signup({ isOpen, onClose, onSwitchToLogin }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      <div
        className="
          relative w-full max-w-md rounded-3xl
          bg-white/95 shadow-2xl border border-gray-200
          p-6 sm:p-8 text-left
        "
        role="dialog"
        aria-modal="true"
        aria-labelledby="signup-title"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          aria-label="Close signup"
          type="button"
        >
          x
        </button>

        <h2 id="signup-title" className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Create your account
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Join MF Kitchen to save your favorites
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="block text-sm font-semibold text-gray-700" htmlFor="signup-name">
            Name
          </label>
          <input
            id="signup-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="
              w-full rounded-2xl border border-gray-300
              px-4 py-3 text-gray-900
              focus:outline-none focus:ring-2 focus:ring-pink-400
            "
          />

          <label className="block text-sm font-semibold text-gray-700" htmlFor="signup-email">
            Email
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="
              w-full rounded-2xl border border-gray-300
              px-4 py-3 text-gray-900
              focus:outline-none focus:ring-2 focus:ring-pink-400
            "
          />

          <label className="block text-sm font-semibold text-gray-700" htmlFor="signup-password">
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
            required
            className="
              w-full rounded-2xl border border-gray-300
              px-4 py-3 text-gray-900
              focus:outline-none focus:ring-2 focus:ring-pink-400
            "
          />

          <button
            type="submit"
            className="
              w-full rounded-2xl px-4 py-3
              bg-gradient-to-r from-pink-500 to-teal-500
              text-white font-bold text-lg
              hover:opacity-90 transition-opacity
            "
          >
            Sign Up
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <button
            type="button"
            onClick={onSwitchToLogin}
            className="font-semibold text-pink-600 hover:text-pink-700"
          >
            Log in
          </button>
        </p>
      </div>
    </div>
  );
}
