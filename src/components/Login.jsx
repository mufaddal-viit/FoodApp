import { useState } from "react";
import { loginUser } from "../api.js";
import { LOGINIMAGE } from "../utils.js";
export default function Login({ isOpen, onClose, onSwitchToSignup }) {
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
          relative w-full max-w-md overflow-hidden rounded-3xl shadow-2xl border border-gray-200
        "
        role="dialog" 
        aria-modal="true"
        aria-labelledby="login-title"
      >
        <div className="absolute inset-0 opacity-50">
          <img
            src={LOGINIMAGE}
            alt=""
            className="h-full w-full object-cover"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/60" />
        </div>

        <div className="relative p-6 sm:p-8 text-left">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-white hover:text-gray-800 text-2xl"
          aria-label="Close login"
          type="button"
        >
          x
        </button>

        <h2 id="login-title" className="text-2xl sm:text-3xl font-extrabold text-white">
          Welcome back
        </h2>
        <p className="mt-2 text-sm sm:text-base text-white">
          Sign in to continue
        </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setError("");
            setIsSubmitting(true);

            const formData = new FormData(event.currentTarget);
            const email = formData.get("email");
            const password = formData.get("password");

            try {
              await loginUser({ email, password });
              event.currentTarget.reset();
              onClose?.();
            } catch (err) {
              setError(err?.message || "Login failed.");
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <label className="block text-sm font-semibold text-white" htmlFor="login-email">
            Email
          </label>
          <input
            id="login-email"
            name="email"
            type="email"
            autoComplete="email"
            required
            className="
              w-full rounded-2xl border border-white/30
              bg-white/10 px-4 py-3 text-white placeholder-white/70
              focus:outline-none focus:ring-2 focus:ring-white
            "
          />

          <label className="block text-sm font-semibold text-white" htmlFor="login-password">
            Password
          </label>
          <input
            id="login-password"
            name="password"
            type="password"
            autoComplete="current-password"
            required
            className="
              w-full rounded-2xl border border-white/30
              bg-white/10 px-4 py-3 text-white placeholder-white/70
              focus:outline-none focus:ring-2 focus:ring-white
            "
          />

          <button
            type="submit"
            disabled={isSubmitting}
            // className="
            //   w-full rounded-2xl px-4 py-3
            //   bg-gradient-to-r from-pink-500 to-teal-500
            //   text-white font-bold text-lg
            //   hover:opacity-90 transition-opacity
            //   disabled:cursor-not-allowed disabled:opacity-60
            // "
            className="
                w-full inline-flex items-center justify-center
                rounded-xl
                border border-white/20
                bg-black/20
                px-4 py-3
                text-white hover:text-black font-semibold
                transition-colors duration-400
                active:scale-[0.99]
                hover:bg-white/65 hover:backdrop-blur-lg 
                focus:outline-none focus-visible:ring-2 focus-visible:ring-white/70
              "
          >
            {isSubmitting ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {error && (
          <p className="mt-4 text-sm text-red-200" role="alert">
            {error}
          </p>
        )}

        <p className="mt-4 text-sm text-gray-200">
          New here?{" "}
          <button
            type="button"
            onClick={onSwitchToSignup}
            className="font-semibold text-pink-200 hover:text-pink-100"
          >
            Sign up now
          </button>
        </p>
        </div>
      </div>
    </div>
  );
}
