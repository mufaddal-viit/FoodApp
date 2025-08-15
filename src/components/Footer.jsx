import { useNavigate } from "react-router";

export default function Footer({ onchangecat }) {
  const navigate = useNavigate();

  const handleClick = (category) => {
    onchangecat(category);
    navigate(`/${category}`);
  };

  const cat = ["/", "Chicken", "Beef", "Lamb", "Vegetarian"];

  return (
    <div
      className="
        flex flex-col sm:flex-row 
        sm:justify-around items-center 
        bg-gradient-to-b from-[#327573] to-[#868acf]  
        p-6 sm:p-10 rounded-[10px] 
        text-center border-4 gap-4 sm:gap-0
      "
    >
      {cat.map((item) => (
        <p
          key={item}
          onClick={() => handleClick(item === "/" ? "/" : item)}
          className="
            text-lg sm:text-xl font-extrabold 
            text-[#213547] tracking-[1px] 
            transition-all duration-200
            hover:-translate-y-1 hover:text-white cursor-pointer
          "
        >
          {item === "/" ? "Home" : item}
        </p>
      ))}
    </div>
  );
}
