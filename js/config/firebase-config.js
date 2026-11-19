// Reemplaza con la configuración de tu proyecto (Firebase Console > Configuración del proyecto > Tus apps > Web)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export const firebaseConfig = {
  apiKey: "AIzaSyBS78uZ2t5j15dLS_BXkgvmbVfBsnFV0LI",
  authDomain: "docente360-a913d.firebaseapp.com",
  projectId: "docente360-a913d",
  storageBucket: "docente360-a913d.firebasestorage.app",
  messagingSenderId: "196063120887",
  appId: "1:196063120887:web:204429e9a0218c052032f2"
};

// Dominio del correo institucional (también está en firestore.rules)
export const DOMINIO = "certus.edu.pe";

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
