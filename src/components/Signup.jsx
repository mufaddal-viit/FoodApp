import { useState } from "react";
import { registerUser } from "../api.js";
import { LOGINIMAGE } from "../utils.js";

export default function Signup({ isOpen, onClose, onSwitchToLogin }) {
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
        aria-labelledby="signup-title"
      >
        <div className="absolute inset-0">
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
            aria-label="Close signup"
            type="button"
          >
            x
          </button>

          <h2 id="signup-title" className="text-2xl sm:text-3xl font-extrabold text-white">
            Create your account
          </h2>
          <p className="mt-2 text-sm sm:text-base text-white">
            Join MF Kitchen to save your favorites
          </p>

        <form
          className="mt-6 space-y-4"
          onSubmit={async (event) => {
            event.preventDefault();
            setError("");
            setIsSubmitting(true);

            const formData = new FormData(event.currentTarget);
            const name = formData.get("name");
            const email = formData.get("email");
            const password = formData.get("password");

            try {
              await registerUser({ name, email, password });
              event.currentTarget.reset();
              onSwitchToLogin?.();
            } catch (err) {
              setError(err?.message || "Signup failed.");
            } finally {
              setIsSubmitting(false);
            }
          }}
        >
          <label className="block text-sm font-semibold text-white" htmlFor="signup-name">
            Name
          </label>
          <input
            id="signup-name"
            name="name"
            type="text"
            autoComplete="name"
            required
            className="
              w-full rounded-2xl border border-white/30
              bg-white/10 px-4 py-3 text-white placeholder-white/70
              focus:outline-none focus:ring-2 focus:ring-white
            "
          />

          <label className="block text-sm font-semibold text-white" htmlFor="signup-email">
            Email
          </label>
          <input
            id="signup-email"
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

          <label className="block text-sm font-semibold text-white" htmlFor="signup-password">
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            autoComplete="new-password"
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
                disabled:cursor-not-allowed disabled:opacity-60
              "
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>
        </form>

          {error && (
            <p className="mt-4 text-sm text-red-200" role="alert">
              {error}
            </p>
          )}

          <p className="mt-4 text-sm text-gray-200">
            Already have an account?{" "}
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="font-semibold text-pink-200 hover:text-pink-100"
            >
              Log in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
