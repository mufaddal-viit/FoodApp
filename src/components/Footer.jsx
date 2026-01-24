import { useNavigate } from "react-router";

const links = [
  { label: "Home", path: "/" },
  { label: "Chicken", path: "/category/Chicken" },
  { label: "Beef", path: "/category/Beef" },
  { label: "Lamb", path: "/category/Lamb" },
  { label: "Vegetarian", path: "/category/Vegetarian" },
];

export default function Footer() {
  const navigate = useNavigate();

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
      {links.map((item) => (
        <p
          key={item.label}
          onClick={() => navigate(item.path)}
          className="
            text-lg sm:text-xl font-extrabold 
            text-[#213547] tracking-[1px] 
            transition-all duration-200
            hover:-translate-y-1 hover:text-white cursor-pointer
          "
        >
          {item.label}
        </p>
      ))}
    </div>
  );
}
