import { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function DisplaySteps({
  steps = [],
  title = "Instructions",
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(true);
  const stepCount = steps.length;

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
            {stepCount} {stepCount === 1 ? "step" : "steps"}
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
          {stepCount > 0 ? (
            <ol className="space-y-2.5">
              {steps.map((step, idx) => (
                <li
                  key={idx}
                  className="grid grid-cols-[24px_1fr] gap-2 rounded-xl bg-white px-3 py-2.5 text-sm shadow-sm ring-1 ring-slate-100"
                >
                  <span className="font-semibold text-slate-500">{idx + 1}.</span>
                  <span className="text-slate-700">
                    {step.endsWith(".") ? step : `${step}.`}
                  </span>
                </li>
              ))}
            </ol>
          ) : (
            <p className="rounded-xl bg-white px-3 py-2.5 text-sm text-slate-500 shadow-sm ring-1 ring-slate-100">
              Instructions are unavailable for this recipe.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
