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

  return (
    <section>
      <h2 className="text-left text-2xl  sm:text-3xl font-semibold mt-2 text-[#213547]">
        Choose your Category
      </h2>

      <div
        className="
        flex flex-wrap gap-3 sm:gap-5 mt-3
        font-bold text-lg sm:text-xl justify-evenly
      "
      >
        {["Chicken", "Beef", "Lamb", "Vegetarian"].map((ch) => (
          <label
            key={ch}
            className={`
            flex items-center cursor-pointer uppercase tracking-wide
            hover:text-white hover:scale-105 transition-all duration-700
            ${
              choice === ch
                ? "font-bold text-pink-200"
                : "font-black text-[#213547]"
            }
          `}
          >
            <input
              type="radio"
              name="mealType"
              value={ch}
              checked={choice === ch}
              onChange={(e) => onChange(e.target.value)}
              className="mr-2 w-[18px] h-[18px] cursor-pointer accent-[#1d1d1e]"
            />
            {ch}
          </label>
        ))}
      </div>
    </section>
  );
}

export default Welcome;
