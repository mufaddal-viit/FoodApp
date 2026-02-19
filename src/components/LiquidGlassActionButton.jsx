const toneStyles = {
  youtube:
    "border-red-200/70 bg-red-400/20 text-red-800 shadow-lg shadow-red-500/15 hover:bg-red-400/30",
  slate:
    "border-slate-200/80 bg-slate-300/20 text-slate-800 shadow-lg shadow-slate-500/10 hover:bg-slate-300/30",
  neutral:
    "border-white/70 bg-white/30 text-slate-900 shadow-lg shadow-slate-900/10 hover:bg-white/45",
};

export default function LiquidGlassActionButton({
  href,
  label,
  Icon,
  tone = "neutral",
  fullWidth = false,
  className = "",
}) {
  if (!href || !label) return null;

  const toneClass = toneStyles[tone] || toneStyles.neutral;
  const widthClass = fullWidth ? "flex-1 min-w-[220px]" : "";

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={[
        "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-2xl",
        "border px-6 py-3.5 font-semibold backdrop-blur-xl ring-1 ring-white/35 ring-inset",
        "transition-all duration-300 hover:-translate-y-0.5 focus-visible:outline-none",
        "focus-visible:ring-2 focus-visible:ring-slate-500/60 focus-visible:ring-offset-2",
        toneClass,
        widthClass,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/70 via-white/25 to-white/10 opacity-90" />
      <span className="pointer-events-none absolute -left-8 -top-8 h-16 w-16 rounded-full bg-white/45 blur-2xl" />

      <span className="relative z-10 inline-flex items-center gap-2">
        {Icon ? <Icon size={18} /> : null}
        {label}
      </span>
    </a>
  );
}
