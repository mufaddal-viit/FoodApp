export default function Login({ isOpen, onClose, onSwitchToSignup }) {
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
        aria-labelledby="login-title"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          aria-label="Close login"
          type="button"
        >
          x
        </button>

        <h2 id="login-title" className="text-2xl sm:text-3xl font-extrabold text-gray-900">
          Welcome back
        </h2>
        <p className="mt-2 text-sm sm:text-base text-gray-600">
          Sign in to continue
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={(event) => event.preventDefault()}
        >
          <label className="block text-sm font-semibold text-gray-700" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
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

          <label className="block text-sm font-semibold text-gray-700" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
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
            Sign In
          </button>
        </form>

        <p className="mt-4 text-sm text-gray-600">
          New here?{" "}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="font-semibold text-pink-600 hover:text-pink-700"
          >
            Sign up now
          </button>
        </p>
      </div>
    </div>
  );
}
