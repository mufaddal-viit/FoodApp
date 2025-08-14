import { useNavigate } from "react-router";
import "./Footer.css";

export default function Footer({ onchangecat }) {
  const navigate = useNavigate();

  const handleClick = (category) => {
    onchangecat(category); //  Update selectedCategory (updates radio)
    navigate(`/${category}`); //  Navigate to category page
  };
  const cat = ["", "Chicken", "Beef", "Lamb", "Vegetarian"];

  return (
    <div className="flex justify-around bg-[rgb(137,157,216)] p-[20px] rounded-[10px] text-center border-4">
      {cat.map((item) =>
        item === "" ? (
          <p key={item} className="link-hover" onClick={() => handleClick("")}>
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
