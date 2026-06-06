import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { MapPin, Music2, Heart } from "lucide-react";
import couplePhoto from "@/assets/couple.jpg";
import { SundayPlan } from "@/components/SundayPlan";
import { AnimatedBackground } from "@/components/AnimatedBackground";

// ============================================================
// 💖 EDITA AQUÍ TU FECHA DE ANIVERSARIO (YYYY-MM-DD)
// ============================================================
const ANNIVERSARY_DATE = "2023-02-14";
// 📍 Y EL ENLACE DE GOOGLE MAPS DE NUESTRO RINCÓN
const MAP_URL = "https://www.google.com/maps";
// ============================================================

type Song = { title: string; artist: string; url: string };

const SONGS_FOR_HER: Song[] = [
  { title: "Perfect", artist: "Ed Sheeran", url: "https://open.spotify.com/search/Perfect%20Ed%20Sheeran" },
  { title: "All of Me", artist: "John Legend", url: "https://open.spotify.com/search/All%20of%20Me%20John%20Legend" },
  { title: "Tu Sonrisa", artist: "Elvis Crespo", url: "https://open.spotify.com/search/Tu%20Sonrisa" },
];

const SONGS_FOR_HIM: Song[] = [
  { title: "Adore You", artist: "Harry Styles", url: "https://open.spotify.com/search/Adore%20You%20Harry%20Styles" },
  { title: "Photograph", artist: "Ed Sheeran", url: "https://open.spotify.com/search/Photograph%20Ed%20Sheeran" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Nuestra Esquina Virtual ✨" },
      { name: "description", content: "Un pequeño espacio romántico solo para nosotros." },
      { name: "theme-color", content: "#f7e3e3" },
      { property: "og:title", content: "Nuestra Esquina Virtual ✨" },
      { property: "og:description", content: "Un pequeño espacio romántico solo para nosotros." },
    ],
  }),
  component: Index,
});

function useDaysSince(dateStr: string) {
  const [days, setDays] = useState(0);
  useEffect(() => {
    const calc = () => {
      const start = new Date(dateStr).getTime();
      const now = Date.now();
      setDays(Math.max(0, Math.floor((now - start) / (1000 * 60 * 60 * 24))));
    };
    calc();
    const id = setInterval(calc, 1000 * 60 * 60);
    return () => clearInterval(id);
  }, [dateStr]);
  return days;
}

function Index() {
  const days = useDaysSince(ANNIVERSARY_DATE);

  return (
    <>
      <AnimatedBackground />
      <main className="relative mx-auto max-w-md px-5 pt-10 pb-16 space-y-8">
        {/* HEADER */}
        <header className="text-center">
          <div className="relative mx-auto w-32 h-32 mb-5 animate-pop">
            <div
              className="absolute inset-0 rounded-full blur-2xl opacity-60 float"
              style={{ background: "radial-gradient(circle, var(--cherry), transparent 70%)" }}
            />
            <div className="absolute inset-0 rounded-full animate-ring" />
            <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-card shadow-[var(--shadow-soft)]">
              <img
                src={couplePhoto}
                alt="Nuestra foto"
                width={512}
                height={512}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -top-1 -right-1 w-9 h-9 rounded-full bg-card flex items-center justify-center shadow-[var(--shadow-soft)] animate-heartbeat">
              <Heart size={16} className="fill-primary text-primary" />
            </div>
          </div>
          <h1 className="text-3xl leading-tight animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <span className="shimmer-text">Nuestra Esquina</span> <br />
            <span className="shimmer-text">Virtual</span>{" "}
            <span className="inline-block float" style={{ animationDuration: "4s" }}>✨</span>
          </h1>
          <div
            className="mt-4 inline-flex items-center gap-2 rounded-full bg-card/80 backdrop-blur px-4 py-2 border border-border shadow-[var(--shadow-card)] animate-fade-up"
            style={{ animationDelay: "0.25s" }}
          >
            <Heart size={14} className="text-primary fill-primary animate-heartbeat" />
            <p className="text-sm text-foreground">
              Progresando juntos desde hace{" "}
              <span className="font-semibold text-primary">{days}</span> días
            </p>
          </div>
        </header>

        {/* MAP CARD */}
        <a
          href={MAP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="tap-scale card-floating block p-5 animate-fade-up hover:shadow-[var(--shadow-soft)]"
          style={{
            animationDelay: "0.35s",
            background:
              "linear-gradient(135deg, color-mix(in oklab, var(--blush) 80%, white), var(--cream))",
          }}
        >
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-primary text-primary-foreground shadow-[var(--shadow-soft)] float" style={{ animationDuration: "5s" }}>
              <MapPin size={26} />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Ir al mapa</p>
              <p className="text-lg font-semibold">📍 Nuestro rincón especial</p>
            </div>
            <span className="text-2xl text-primary float" style={{ animationDuration: "3s" }}>→</span>
          </div>
        </a>

        {/* PLAYLIST */}
        <section className="animate-fade-up" style={{ animationDelay: "0.45s" }}>
          <h2 className="text-2xl mb-3 px-1">Nuestra Playlist</h2>
          <div className="grid grid-cols-1 gap-4">
            <PlaylistColumn title="De mí para ti" emoji="❤️" songs={SONGS_FOR_HER} />
            <PlaylistColumn title="De ti para mí" emoji="💖" songs={SONGS_FOR_HIM} />
          </div>
        </section>

        {/* SUNDAY PLAN */}
        <div className="animate-fade-up" style={{ animationDelay: "0.55s" }}>
          <SundayPlan />
        </div>

        <footer className="text-center text-xs text-muted-foreground pt-4 animate-fade-up" style={{ animationDelay: "0.7s" }}>
          Hecho con <Heart size={12} className="inline fill-primary text-primary animate-heartbeat" /> solo para nosotros
        </footer>
      </main>
    </>
  );
}

function PlaylistColumn({
  title,
  emoji,
  songs,
}: {
  title: string;
  emoji: string;
  songs: Song[];
}) {
  return (
    <div className="card-floating p-4 glow-pulse">
      <p className="text-sm font-semibold mb-3 flex items-center gap-2">
        <span className="bounce-soft inline-block">{emoji}</span>
        <span>{title}</span>
        <Equalizer />
      </p>
      <ul className="space-y-2">
        {songs.map((s, idx) => (
          <li
            key={s.title}
            className="animate-fade-up"
            style={{ animationDelay: `${0.1 * idx + 0.1}s` }}
          >
            <a
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-scale group flex items-center gap-3 rounded-xl bg-secondary/60 hover:bg-secondary px-3 py-2.5 transition-colors"
            >
              <span className="relative w-9 h-9 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0 overflow-hidden">
                <Music2 size={15} className="group-hover:scale-110 transition-transform" />
                <span
                  className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    background:
                      "radial-gradient(circle at center, oklch(0.68 0.14 18 / 0.25), transparent 70%)",
                  }}
                />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-sm font-medium truncate">{s.title}</span>
                <span className="block text-xs text-muted-foreground truncate">{s.artist}</span>
              </span>
              <Equalizer compact />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function Equalizer({ compact = false }: { compact?: boolean }) {
  const bars = compact ? 3 : 4;
  const h = compact ? 12 : 14;
  return (
    <span className="inline-flex items-end gap-[2px]" style={{ height: h }}>
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className="eq-bar w-[3px] rounded-full bg-primary/70"
          style={{
            height: "100%",
            animationDelay: `${i * 0.15}s`,
            animationDuration: `${0.7 + (i % 3) * 0.15}s`,
          }}
        />
      ))}
    </span>
  );
}
