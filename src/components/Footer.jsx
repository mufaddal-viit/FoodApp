import { useNavigate } from "react-router";
import "./Footer.css";

export default function Footer({ onchangecat }) {
  const navigate = useNavigate();

  const handleClick = (category) => {
    onchangecat(category); //  Update selectedCategory (updates radio)
    navigate(`/${category}`); //  Navigate to category page
  };
  const cat = ["/", "Chicken", "Beef", "Lamb", "Vegetarian"];

  return (
    <div className="flex  justify-around bg-gradient-to-b from-[#327573] to-[#868acf]  p-10 rounded-[10px] text-xl text-center border-4">
      {cat.map((item) =>
        item === "/" ? (
          <p key={item} className="link-hover" onClick={() => handleClick("/")}>
            Home
          </p>
        ) : (
          <p
            key={item}
            className="link-hover"
            onClick={() => handleClick(`${item}`)}
          >
            {item}
          </p>
        )
      )}
    </div>
  );
}
