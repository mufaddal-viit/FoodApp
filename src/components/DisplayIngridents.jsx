import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DisplayIngridents({
  ingredients = [],
  title = "Ingredients",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const itemCount = ingredients.length;

  return (
    <div className={className}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-3 text-left shadow-sm transition hover:bg-slate-50 active:scale-[0.99]"
      >
        <div>
          <h3 className="text-lg font-bold text-slate-900">{title}</h3>
          <p className="text-xs font-medium text-slate-500">
            {itemCount} {itemCount === 1 ? "item" : "items"}
          </p>
        </div>
        <ChevronDown
          className={`h-5 w-5 text-slate-600 transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {isOpen && (
        <div className="mt-3">
          {itemCount > 0 ? (
            <ul className="space-y-2.5">
              {ingredients.map(({ ingredient, measure }, idx) => (
                <li
                  key={`${ingredient}-${idx}`}
                  className="flex items-center justify-between rounded-xl bg-white px-3 py-2.5 text-sm shadow-sm ring-1 ring-slate-100"
                >
                  <span className="font-medium text-slate-800">{ingredient}</span>
                  <span className="font-semibold text-slate-500">{measure || "-"}</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="rounded-xl bg-white px-3 py-2.5 text-sm text-slate-500 shadow-sm ring-1 ring-slate-100">
              Ingredients are unavailable for this recipe.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
