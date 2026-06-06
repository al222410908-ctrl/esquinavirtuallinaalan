import { Heart } from "lucide-react";

/**
 * Decorative animated background — looping blobs, floating hearts,
 * sparkles and a subtle dot grid. Pointer-events disabled so it never
 * blocks taps on mobile. Optimized: pure CSS animations, no JS loops.
 */
export function AnimatedBackground() {
  // Pre-defined positions so the layout is stable on every render
  const floatingHearts = [
    { left: "8%", dur: "16s", delay: "0s", size: 14, dx: "30px", op: 0.35 },
    { left: "22%", dur: "22s", delay: "4s", size: 10, dx: "-40px", op: 0.28 },
    { left: "40%", dur: "19s", delay: "8s", size: 16, dx: "20px", op: 0.4 },
    { left: "58%", dur: "24s", delay: "2s", size: 12, dx: "-25px", op: 0.32 },
    { left: "75%", dur: "17s", delay: "6s", size: 18, dx: "35px", op: 0.38 },
    { left: "88%", dur: "21s", delay: "10s", size: 11, dx: "-30px", op: 0.3 },
  ];

  const sparkles = [
    { top: "12%", left: "15%", delay: "0s", size: 6 },
    { top: "25%", left: "82%", delay: "1.2s", size: 4 },
    { top: "48%", left: "10%", delay: "2.4s", size: 5 },
    { top: "62%", left: "78%", delay: "0.6s", size: 7 },
    { top: "78%", left: "20%", delay: "3s", size: 4 },
    { top: "88%", left: "70%", delay: "1.8s", size: 6 },
  ];

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden animated-bg"
    >
      {/* Soft gradient blobs */}
      <div
        className="blob absolute -top-24 -left-24 w-[260px] h-[260px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.85 0.08 20), transparent 70%)" }}
      />
      <div
        className="blob absolute top-1/3 -right-32 w-[280px] h-[280px] rounded-full opacity-50 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.88 0.06 40), transparent 70%)", animationDelay: "-6s" }}
      />
      <div
        className="blob absolute bottom-0 left-1/4 w-[300px] h-[300px] rounded-full opacity-55 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.86 0.07 10), transparent 70%)", animationDelay: "-12s" }}
      />

      {/* Dot grid texture */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.68 0.14 18 / 0.5) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* Floating decorative shapes */}
      <div
        className="float absolute top-[18%] left-[6%] w-10 h-10 rounded-2xl rotate-12 opacity-40"
        style={{ background: "linear-gradient(135deg, oklch(0.9 0.06 25), oklch(0.85 0.1 15))", ["--r" as never]: "12deg" }}
      />
      <div
        className="float absolute top-[55%] right-[8%] w-8 h-8 rounded-full opacity-50"
        style={{ background: "oklch(0.78 0.12 20 / 0.45)", animationDelay: "-2s" }}
      />
      <div
        className="float absolute bottom-[20%] left-[12%] w-6 h-6 opacity-45"
        style={{
          background: "oklch(0.82 0.1 30 / 0.55)",
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          animationDelay: "-4s",
        }}
      />
      <div
        className="float absolute top-[8%] right-[18%] w-5 h-5 rounded-md rotate-45 opacity-40"
        style={{ background: "oklch(0.86 0.08 35 / 0.6)", animationDelay: "-3s" }}
      />

      {/* Rising hearts loop */}
      {floatingHearts.map((h, i) => (
        <div
          key={i}
          className="drift absolute"
          style={{
            left: h.left,
            bottom: "-30px",
            opacity: h.op,
            ["--dur" as never]: h.dur,
            ["--dx" as never]: h.dx,
            animationDelay: h.delay,
          }}
        >
          <Heart
            size={h.size}
            className="fill-primary text-primary"
            style={{ filter: "drop-shadow(0 2px 6px oklch(0.68 0.14 18 / 0.3))" }}
          />
        </div>
      ))}

      {/* Sparkles */}
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="sparkle absolute"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            background:
              "radial-gradient(circle, oklch(0.95 0.1 30), transparent 70%)",
            borderRadius: "50%",
            boxShadow: "0 0 8px oklch(0.85 0.12 20 / 0.8)",
          }}
        />
      ))}
    </div>
  );
}
