/*
import { useParams, useNavigate, Link } from "react-router";    
import { useEffect } from "react";
import  "../App.css";
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
function Header() {
  const span_style = {
    background: "rgb(219,112,147)",
    padding: "10px",
    borderRadius: "10px",
  };
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
  const handlecongrates = () => {
    Congratulation();
  };
  return (
      <div
        style={{ background: "rgb(137, 157, 216)", padding: "25px", borderRadius: "10px" }}
      >
        <h1>
          WELCOME TO THE{" "}
          <span className="span-hover" onMouseEnter={handlecongrates} style={span_style}>
            MF KITCHEN
          </span>
        </h1>
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <Link className="link-hover" to="/">HOME</Link>
          <Link className="link-hover" to="/Chicken">CHICKEN</Link>
          <Link className="link-hover" to="/Beef">BEEF</Link>
          <Link className="link-hover" to="/Lamb" >LAMB</Link>
          <Link className="link-hover" to="/Vegetarian" >Vegetarian</Link>
        </div>
      </div>
  );
}

export default Header;
*/

// Header.jsx
import Welcome from "../components/Welcome";
import { useEffect } from "react";
import { useNavigate } from "react-router";
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
function Header({ choice, onChangez }) {
  //congrates script below
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

  const navigate = useNavigate();
  const handlecategory = (Categoryz) => {
    onChangez(Categoryz);
    navigate(Categoryz);
  };

  return (
    <div className=" bg-gradient-to-b from-[#327573] to-[#868acf] p-6  rounded-b-3xl text-center border-4 shadow-lg">
      <h1 className="font-bold text-[#213547]">
        WELCOME TO THE{" "}
        <span
          className="bg-[rgb(219,112,147)] p-[10px] rounded-[10px] font-extrabold hover:text-white"
          onMouseEnter={() => Congratulation()}
        >
          MF KITCHEN
        </span>
      </h1>
      <Welcome choice={choice} onChange={handlecategory} />
    </div>
  );
}

export default Header;
