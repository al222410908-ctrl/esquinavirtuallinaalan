// ============================================================
// 🔧 PEGA AQUÍ TUS CREDENCIALES DE FIREBASE
// Ve a: https://console.firebase.google.com → Project Settings → Your apps
// ============================================================
export const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "", // ej: https://tu-proyecto-default-rtdb.firebaseio.com
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: "",
};
// ============================================================

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getDatabase, type Database } from "firebase/database";

let app: FirebaseApp | null = null;
let db: Database | null = null;

export function getFirebaseDB(): Database | null {
  if (!firebaseConfig.apiKey || !firebaseConfig.databaseURL) return null;
  if (!app) {
    app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
    db = getDatabase(app);
  }
  return db;
}
