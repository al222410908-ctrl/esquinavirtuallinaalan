import { useEffect, useState } from "react";
import { Sparkles, Save, Pencil } from "lucide-react";
import { getFirebaseDB } from "@/lib/firebase";
import { ref, onValue, set } from "firebase/database";

const DEFAULT_PLAN = "¡Hacer picnic y ver el atardecer! 🌅";
const PLAN_PATH = "sundayPlan";

export function SundayPlan() {
  const [plan, setPlan] = useState(DEFAULT_PLAN);
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const db = getFirebaseDB();
    if (!db) return;
    setConnected(true);
    const planRef = ref(db, PLAN_PATH);
    const unsub = onValue(planRef, (snap) => {
      const val = snap.val();
      if (typeof val === "string" && val.length) setPlan(val);
    });
    return () => unsub();
  }, []);

  const handleSave = async () => {
    const text = draft.trim();
    if (!text) return;
    const db = getFirebaseDB();
    if (db) {
      await set(ref(db, PLAN_PATH), text);
    } else {
      setPlan(text); // fallback local si aún no hay credenciales
    }
    setEditing(false);
    setDraft("");
  };

  return (
    <section className="animate-fade-up">
      <h2 className="text-2xl mb-3 px-1 flex items-center gap-2">
        ¿Qué haremos este domingo? <span>🍿</span>
      </h2>

      <div
        className="card-floating p-6"
        style={{
          borderStyle: "dashed",
          borderWidth: "2px",
          borderColor: "color-mix(in oklab, var(--cherry) 35%, transparent)",
          background:
            "linear-gradient(150deg, var(--cream), color-mix(in oklab, var(--blush) 60%, white))",
        }}
      >
        {!editing ? (
          <>
            <div className="flex justify-center mb-3">
              <Sparkles className="text-primary" size={22} />
            </div>
            <p className="text-xl italic text-center font-display leading-snug text-foreground">
              “{plan}”
            </p>
            <button
              onClick={() => {
                setDraft(plan);
                setEditing(true);
              }}
              className="tap-scale mt-5 w-full rounded-2xl bg-primary text-primary-foreground py-3 font-medium flex items-center justify-center gap-2 shadow-[var(--shadow-soft)] active:opacity-90"
            >
              <Pencil size={16} /> Sugerir otro plan
            </button>
          </>
        ) : (
          <div className="space-y-3 animate-fade-up">
            <textarea
              autoFocus
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              rows={3}
              placeholder="Escribe tu plan soñado..."
              className="w-full rounded-2xl border border-border bg-card px-4 py-3 text-base outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 resize-none font-sans"
            />
            <div className="flex gap-2">
              <button
                onClick={() => setEditing(false)}
                className="tap-scale flex-1 rounded-2xl bg-secondary text-secondary-foreground py-3 font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleSave}
                className="tap-scale flex-[1.4] rounded-2xl bg-primary text-primary-foreground py-3 font-medium flex items-center justify-center gap-2"
              >
                <Save size={16} /> Guardar Plan
              </button>
            </div>
          </div>
        )}

        <p className="mt-4 text-[11px] text-center text-muted-foreground">
          {connected
            ? "🟢 Sincronizado en tiempo real"
            : "⚙️ Pega tus credenciales de Firebase en src/lib/firebase.ts para sincronizar"}
        </p>
      </div>
    </section>
  );
}
