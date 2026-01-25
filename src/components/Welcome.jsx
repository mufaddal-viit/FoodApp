import React, { useEffect } from "react";
import confetti from "canvas-confetti";
function Congratulation() {
  var duration = 5 * 1000;
  var animationEnd = Date.now() + duration;
  var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

  function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
  }
  var interval = setInterval(function () {
    var timeLeft = animationEnd - Date.now();
    if (timeLeft <= 0) {
      return clearInterval(interval);
    }
    var particleCount = 50 * (timeLeft / duration);
    // since particles fall down, start a bit higher than random
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

function Welcome({ choice, onChange }) {
  // const span_style = {
  //   background: "pink",
  //   padding: "10px",
  //   borderRadius: "10px",
  // };
  useEffect(() => {
    const func = async () => {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js";
      script.async = true;
      document.body.appendChild(script);
    };
    func();
  }, []);
  // const handlecongrates = () => {
  //   Congratulation();
  // };
  const categories = [
    { name: "Chicken", emoji: "🍗" },
    { name: "Beef", emoji: "🥩" },
    { name: "Lamb", emoji: "🐑" },
    { name: "Vegetarian", emoji: "🥗" },
  ];

  const scrollToMainContent = () => {
    const target = document.getElementById("main-content");
    if (!target) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    target.scrollIntoView({
      behavior: prefersReducedMotion ? "auto" : "smooth",
      block: "start",
    });
  };

 return (
    <section className="text-center">
      <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-10 md:mb-12 tracking-tight">
        What Are You Craving?
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 lg:gap-12 max-w-5xl mx-auto px-4">
        {categories.map((item) => (
          <label
            key={item.name}
            className="cursor-pointer block"
          >
            <input
              type="radio"
              name="mealType"
              value={item.name}
              checked={choice === item.name}
              onChange={(e) => {
                onChange(e.target.value);
                requestAnimationFrame(scrollToMainContent);
              }}
              className="sr-only peer"
            />
            <div
              className={` active:scale-[0.98]
                flex flex-col items-center justify-center gap-3 sm:gap-4
                w-full px-4 sm:px-6 md:px-8 py-8 sm:py-9 md:py-10
                text-white font-extrabold text-lg sm:text-xl md:text-2xl uppercase tracking-wider
                rounded-3xl
                bg-white/20 backdrop-blur-md border-2 border-white/30
                transition-all duration-500 ease-out
                hover:bg-white/30 hover:scale-105 hover:shadow-2xl
                peer-checked:bg-white/40 peer-checked:border-pink-300/60
                peer-checked:text-pink-200 peer-checked:scale-110 peer-checked:shadow-2xl
              `}
            >
              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl">
                {item.emoji}
              </span>
              <span>{item.name}</span>
            </div>
          </label>
        ))}
      </div>
    </section>
  );
}


export default Welcome;
