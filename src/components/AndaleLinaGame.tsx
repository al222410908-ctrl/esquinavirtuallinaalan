import { useEffect, useRef, useState } from "react";
import { Heart } from "lucide-react";

type Target = {
  id: number;
  x: number;
  y: number;
  size: number;
  color: string;
  lifeTime: number;
};

export function AndaleLinaGame() {
  const gameAreaRef = useRef<HTMLDivElement>(null);
  const [score, setScore] = useState(0);
  const [gameActive, setGameActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [highScore, setHighScore] = useState(0);
  const [targets, setTargets] = useState<Target[]>([]);
  const spawnTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);
  const targetIdRef = useRef(0);

  // Cargar high score desde localStorage
  useEffect(() => {
    const saved = localStorage.getItem("andaleLinaHighScore");
    if (saved) {
      const parsed = parseInt(saved, 10);
      if (!isNaN(parsed)) setHighScore(parsed);
    }
  }, []);

  // Guardar high score
  const saveHighScore = (newScore: number) => {
    if (newScore > highScore) {
      setHighScore(newScore);
      localStorage.setItem("andaleLinaHighScore", newScore.toString());
    }
  };

  const startGame = () => {
    setScore(0);
    setGameActive(true);
    setGameOver(false);
    setTargets([]);
    targetIdRef.current = 0;
    mainLoop();
  };

  const mainLoop = () => {
    if (!gameActive) return;

    const maxSimultaneous = Math.floor(score / 7) + 1;
    const currentOnScreen = targets.length;

    if (currentOnScreen < maxSimultaneous) {
      createTarget();
    }

    const nextSpawn = Math.max(250, 900 - score * 25);
    spawnTimeoutRef.current = setTimeout(mainLoop, nextSpawn);
  };

  const createTarget = () => {
    if (!gameAreaRef.current) return;

    const size = Math.max(30, 75 - score * 0.8);
    const maxX = gameAreaRef.current.clientWidth - size - 10;
    const maxY = gameAreaRef.current.clientHeight - size - 10;

    const colors = [
      "var(--cherry)",
      "var(--blush)",
      "var(--rose)",
      "#ff758f",
      "#c9184a",
    ];

    const newTarget: Target = {
      id: targetIdRef.current++,
      x: Math.max(5, Math.floor(Math.random() * maxX)),
      y: Math.max(5, Math.floor(Math.random() * maxY)),
      size,
      color: colors[Math.floor(Math.random() * colors.length)],
      lifeTime: Math.max(450, 1800 - score * 40),
    };

    setTargets((prev) => [...prev, newTarget]);

    // Timer para eliminar el target si no se hace clic
    setTimeout(() => {
      setTargets((prev) => {
        const exists = prev.find((t) => t.id === newTarget.id);
        if (exists && gameActive) {
          endGame();
        }
        return prev.filter((t) => t.id !== newTarget.id);
      });
    }, newTarget.lifeTime);
  };

  const handleTargetClick = (id: number) => {
    if (!gameActive) return;
    
    setScore((prev) => prev + 1);
    setTargets((prev) => prev.filter((t) => t.id !== id));
  };

  const endGame = () => {
    setGameActive(false);
    setGameOver(true);
    if (spawnTimeoutRef.current) {
      clearTimeout(spawnTimeoutRef.current);
    }
    saveHighScore(score);
  };

  // Efecto para reiniciar el loop cuando cambia el score
  useEffect(() => {
    if (gameActive && targets.length === 0) {
      mainLoop();
    }
  }, [score, targets.length, gameActive]);

  return (
    <div className="card-floating p-6 glow-pulse">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold shimmer-text mb-1">ándale Lina</h2>
        <p className="text-sm text-muted-foreground italic">
          pierde para q digas q si
        </p>
      </div>

      <div
        ref={gameAreaRef}
        className="relative w-full h-[50vh] bg-secondary/20 rounded-2xl border-2 border-primary/30 overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, color-mix(in oklab, var(--cherry) 10%, transparent), var(--cream))",
        }}
      >
        {targets.map((target) => (
          <button
            key={target.id}
            onClick={() => handleTargetClick(target.id)}
            className="absolute rounded-full border-2 border-white/50 shadow-lg animate-pop cursor-pointer hover:scale-110 transition-transform"
            style={{
              left: target.x,
              top: target.y,
              width: target.size,
              height: target.size,
              backgroundColor: target.color,
              boxShadow: `0 0 15px ${target.color}40`,
            }}
          />
        ))}

        {gameOver && (
          <div className="absolute inset-0 bg-background/95 backdrop-blur-sm flex flex-col items-center justify-center z-10 p-6">
            <div className="text-center">
              <Heart size={48} className="mx-auto mb-4 text-primary fill-primary animate-heartbeat" />
              <h3 className="text-3xl font-bold text-primary mb-2">¡PERDISTE!</h3>
              <p className="text-lg text-muted-foreground mb-2">
                Ya sabes lo que toca... ❤️
              </p>
              <p className="text-2xl font-semibold mb-6">
                Puntos: <span className="text-primary">{score}</span>
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Mejor puntuación: <span className="text-primary">{highScore}</span>
              </p>
              <button
                onClick={startGame}
                className="px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-lg transition-all tap-scale"
              >
                Reintentar
              </button>
            </div>
          </div>
        )}

        {!gameActive && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={startGame}
              className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-semibold text-lg hover:shadow-lg transition-all tap-scale"
            >
              <Heart size={20} className="inline mr-2 fill-current" />
              Jugar
            </button>
          </div>
        )}
      </div>

      <div className="mt-4 text-center">
        <p className="text-lg font-semibold">
          Puntos: <span className="text-primary">{score}</span>
        </p>
        <p className="text-sm text-muted-foreground">
          Mejor: <span className="text-primary">{highScore}</span>
        </p>
      </div>
    </div>
  );
}
