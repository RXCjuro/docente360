
/* Configuración de Firebase */
// Importar las funciones necesarias
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Configuración del proyecto Firebase
export const firebaseConfig = {
    apiKey: "AIzaSyBBx9FFvutWY2KrFO1ZQ0UgNUd6S6t-8Ao",
    authDomain: "docente360-2f8f3.firebaseapp.com",
    projectId: "docente360-2f8f3",
    storageBucket: "docente360-2f8f3.firebasestorage.app",
    messagingSenderId: "761344811316",
    appId: "1:761344811316:web:4cee429a9f287a68490561"
};

// Dominio del correo institucional
export const DOMINIO = "";

// Inicializar Firebase
export const app = initializeApp(firebaseConfig);

// Inicializar Authentication
export const auth = getAuth(app);

// Inicializar Firestore
export const db = getFirestore(app);
