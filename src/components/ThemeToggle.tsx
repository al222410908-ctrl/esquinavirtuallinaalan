import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";

const KEY = "theme-mode";

export function ThemeToggle() {
  const [night, setNight] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY);
    const isNight = saved === "night";
    setNight(isNight);
    document.documentElement.classList.toggle("theme-night", isNight);
  }, []);

  const toggle = () => {
    const next = !night;
    setNight(next);
    document.documentElement.classList.toggle("theme-night", next);
    localStorage.setItem(KEY, next ? "night" : "day");
  };

  return (
    <button
      onClick={toggle}
      aria-label={night ? "Cambiar a modo brilloso" : "Cambiar a modo nocturno"}
      className="tap-scale fixed top-4 right-4 z-50 w-14 h-8 rounded-full border border-border shadow-[var(--shadow-soft)] backdrop-blur"
      style={{
        background: night
          ? "linear-gradient(135deg, oklch(0.3 0.08 250), oklch(0.22 0.1 240))"
          : "linear-gradient(135deg, oklch(0.92 0.04 25), oklch(0.85 0.1 20))",
      }}
    >
      <span
        className="absolute top-1 left-1 w-6 h-6 rounded-full bg-card flex items-center justify-center shadow-md transition-transform duration-500"
        style={{
          transform: night ? "translateX(24px) rotate(360deg)" : "translateX(0) rotate(0)",
        }}
      >
        {night ? (
          <Moon size={13} className="text-primary" />
        ) : (
          <Sun size={13} className="text-primary" />
        )}
      </span>
    </button>
  );
}
