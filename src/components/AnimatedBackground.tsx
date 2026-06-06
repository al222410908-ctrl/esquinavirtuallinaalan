import { Heart, Star } from "lucide-react";

/**
 * Rich animated background — multiple loop layers:
 * - gradient shift
 * - blurred color blobs
 * - SVG wave bands sliding horizontally
 * - rotating dashed ring
 * - dot grid texture
 * - floating geometric shapes (squares, circles, diamonds)
 * - rising hearts + stars (drift up loop)
 * - diagonal drifting particles
 * - twinkling sparkles
 * Pointer-events disabled, GPU-only transforms.
 */
export function AnimatedBackground() {
  const risingHearts = [
    { left: "5%", dur: "18s", delay: "0s", size: 14, dx: "30px", op: 0.45 },
    { left: "18%", dur: "24s", delay: "3s", size: 10, dx: "-40px", op: 0.35 },
    { left: "32%", dur: "20s", delay: "7s", size: 18, dx: "25px", op: 0.5 },
    { left: "48%", dur: "26s", delay: "1.5s", size: 12, dx: "-30px", op: 0.4 },
    { left: "62%", dur: "22s", delay: "10s", size: 16, dx: "35px", op: 0.45 },
    { left: "76%", dur: "19s", delay: "5s", size: 11, dx: "-25px", op: 0.38 },
    { left: "88%", dur: "23s", delay: "8s", size: 14, dx: "30px", op: 0.42 },
    { left: "12%", dur: "28s", delay: "12s", size: 9, dx: "-20px", op: 0.3 },
    { left: "55%", dur: "21s", delay: "14s", size: 13, dx: "20px", op: 0.4 },
  ];

  const risingStars = [
    { left: "10%", dur: "32s", delay: "2s", size: 10, dx: "40px", op: 0.5 },
    { left: "42%", dur: "28s", delay: "6s", size: 8, dx: "-35px", op: 0.45 },
    { left: "70%", dur: "30s", delay: "11s", size: 12, dx: "25px", op: 0.55 },
    { left: "85%", dur: "26s", delay: "4s", size: 9, dx: "-30px", op: 0.4 },
  ];

  const diagonalDots = [
    { dur: "35s", delay: "0s", top: "20%", size: 6, op: 0.4 },
    { dur: "42s", delay: "8s", top: "55%", size: 4, op: 0.35 },
    { dur: "38s", delay: "15s", top: "75%", size: 8, op: 0.45 },
    { dur: "30s", delay: "22s", top: "35%", size: 5, op: 0.3 },
  ];

  const sparkles = Array.from({ length: 10 }).map((_, i) => ({
    top: `${(i * 9 + 8) % 95}%`,
    left: `${(i * 23 + 12) % 92}%`,
    delay: `${(i * 0.4) % 4}s`,
    size: 3 + (i % 4),
  }));

  const twinkleStars = Array.from({ length: 14 }).map((_, i) => ({
    top: `${(i * 7 + 5) % 95}%`,
    left: `${(i * 17 + 8) % 95}%`,
    delay: `${(i * 0.3) % 3}s`,
    size: 2 + (i % 3),
  }));

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden animated-bg"
    >
      {/* === Soft color blobs === */}
      <div
        className="blob absolute -top-32 -left-24 w-[300px] h-[300px] rounded-full opacity-70 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.85 0.1 20), transparent 70%)" }}
      />
      <div
        className="blob absolute top-1/4 -right-32 w-[320px] h-[320px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.88 0.07 40), transparent 70%)", animationDelay: "-5s" }}
      />
      <div
        className="blob absolute top-1/2 left-1/3 w-[260px] h-[260px] rounded-full opacity-55 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.84 0.09 350), transparent 70%)", animationDelay: "-9s" }}
      />
      <div
        className="blob absolute bottom-0 -left-20 w-[340px] h-[340px] rounded-full opacity-60 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.86 0.08 10), transparent 70%)", animationDelay: "-12s" }}
      />
      <div
        className="blob absolute -bottom-32 right-0 w-[300px] h-[300px] rounded-full opacity-65 blur-3xl"
        style={{ background: "radial-gradient(circle, oklch(0.87 0.07 30), transparent 70%)", animationDelay: "-7s" }}
      />

      {/* === Sliding SVG wave bands === */}
      <svg
        className="absolute top-[15%] left-0 w-[200%] h-24 wave-slide opacity-25"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,50 C150,90 300,10 600,50 C900,90 1050,10 1200,50 L1200,100 L0,100 Z M1200,50 C1350,90 1500,10 1800,50 C2100,90 2250,10 2400,50 L2400,100 L1200,100 Z"
          fill="oklch(0.85 0.1 20 / 0.4)"
        />
      </svg>
      <svg
        className="absolute top-[55%] left-0 w-[200%] h-28 wave-slide-rev opacity-20"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
      >
        <path
          d="M0,60 C200,20 400,100 600,60 C800,20 1000,100 1200,60 L1200,100 L0,100 Z M1200,60 C1400,20 1600,100 1800,60 C2000,20 2200,100 2400,60 L2400,100 L1200,100 Z"
          fill="oklch(0.88 0.08 35 / 0.45)"
        />
      </svg>
      <svg
        className="absolute bottom-[10%] left-0 w-[200%] h-20 wave-slide opacity-25"
        viewBox="0 0 1200 100"
        preserveAspectRatio="none"
        style={{ animationDuration: "40s" }}
      >
        <path
          d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,100 L0,100 Z M1200,40 C1350,80 1550,0 1800,40 C2050,80 2250,0 2400,40 L2400,100 L1200,100 Z"
          fill="oklch(0.82 0.1 15 / 0.4)"
        />
      </svg>

      {/* === Rotating dashed ring === */}
      <div
        className="spin-slow absolute -top-20 -right-20 w-[260px] h-[260px] rounded-full opacity-30"
        style={{
          border: "2px dashed oklch(0.68 0.14 18 / 0.5)",
        }}
      />
      <div
        className="spin-slow absolute -bottom-24 -left-16 w-[220px] h-[220px] rounded-full opacity-25"
        style={{
          border: "2px dashed oklch(0.75 0.12 30 / 0.5)",
          animationDirection: "reverse",
          animationDuration: "36s",
        }}
      />

      {/* === Dot grid texture === */}
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            "radial-gradient(oklch(0.68 0.14 18 / 0.5) 1px, transparent 1px)",
          backgroundSize: "22px 22px",
        }}
      />

      {/* === Floating geometric shapes === */}
      <div
        className="float absolute top-[10%] left-[8%] w-10 h-10 rounded-2xl rotate-12 opacity-50"
        style={{ background: "linear-gradient(135deg, oklch(0.9 0.06 25), oklch(0.85 0.1 15))", ["--r" as never]: "12deg" }}
      />
      <div
        className="float absolute top-[28%] right-[10%] w-8 h-8 rounded-full opacity-55"
        style={{ background: "oklch(0.78 0.12 20 / 0.55)", animationDelay: "-2s" }}
      />
      <div
        className="float absolute top-[45%] left-[14%] w-6 h-6 opacity-50"
        style={{
          background: "oklch(0.82 0.1 30 / 0.6)",
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          animationDelay: "-4s",
        }}
      />
      <div
        className="float absolute top-[65%] right-[6%] w-7 h-7 rounded-lg rotate-45 opacity-50"
        style={{ background: "oklch(0.86 0.08 35 / 0.65)", animationDelay: "-3s" }}
      />
      <div
        className="float absolute top-[80%] left-[20%] w-9 h-9 rounded-full opacity-45"
        style={{ background: "linear-gradient(135deg, oklch(0.88 0.08 10), oklch(0.82 0.12 25))", animationDelay: "-5s" }}
      />
      <div
        className="float absolute top-[35%] left-[45%] w-5 h-5 opacity-50"
        style={{
          background: "oklch(0.85 0.1 20 / 0.6)",
          clipPath: "polygon(50% 0%, 100% 100%, 0% 100%)",
          animationDelay: "-1.5s",
        }}
      />
      <div
        className="float absolute top-[90%] right-[22%] w-6 h-6 rounded-2xl opacity-45"
        style={{ background: "oklch(0.84 0.09 40 / 0.6)", animationDelay: "-6s" }}
      />

      {/* === Rising hearts loop === */}
      {risingHearts.map((h, i) => (
        <div
          key={`h-${i}`}
          className="drift absolute"
          style={{
            left: h.left,
            bottom: "-30px",
            ["--dur" as never]: h.dur,
            ["--dx" as never]: h.dx,
            ["--max-op" as never]: String(h.op),
            animationDelay: h.delay,
          }}
        >
          <Heart
            size={h.size}
            className="fill-primary text-primary"
            style={{ filter: "drop-shadow(0 2px 6px oklch(0.68 0.14 18 / 0.4))" }}
          />
        </div>
      ))}

      {/* === Rising stars === */}
      {risingStars.map((s, i) => (
        <div
          key={`s-${i}`}
          className="drift absolute"
          style={{
            left: s.left,
            bottom: "-30px",
            ["--dur" as never]: s.dur,
            ["--dx" as never]: s.dx,
            ["--max-op" as never]: String(s.op),
            animationDelay: s.delay,
          }}
        >
          <Star
            size={s.size}
            className="fill-accent text-accent"
            style={{ filter: "drop-shadow(0 2px 6px oklch(0.85 0.08 30 / 0.5))" }}
          />
        </div>
      ))}

      {/* === Diagonal drifting dots === */}
      {diagonalDots.map((d, i) => (
        <div
          key={`d-${i}`}
          className="drift-diag absolute rounded-full"
          style={{
            top: d.top,
            left: "-20px",
            width: d.size,
            height: d.size,
            ["--dur" as never]: d.dur,
            ["--max-op" as never]: String(d.op),
            animationDelay: d.delay,
            background: "oklch(0.78 0.12 20)",
            boxShadow: "0 0 10px oklch(0.78 0.12 20 / 0.6)",
          }}
        />
      ))}

      {/* === Twinkling stars === */}
      {twinkleStars.map((t, i) => (
        <div
          key={`t-${i}`}
          className="twinkle absolute rounded-full"
          style={{
            top: t.top,
            left: t.left,
            width: t.size,
            height: t.size,
            animationDelay: t.delay,
            background: "oklch(0.95 0.04 60)",
            boxShadow: "0 0 6px oklch(0.9 0.1 30 / 0.7)",
          }}
        />
      ))}

      {/* === Sparkles === */}
      {sparkles.map((s, i) => (
        <div
          key={`sp-${i}`}
          className="sparkle absolute"
          style={{
            top: s.top,
            left: s.left,
            width: s.size,
            height: s.size,
            animationDelay: s.delay,
            background:
              "radial-gradient(circle, oklch(0.97 0.08 30), transparent 70%)",
            borderRadius: "50%",
            boxShadow: "0 0 10px oklch(0.85 0.12 20 / 0.85)",
          }}
        />
      ))}
    </div>
  );
}
