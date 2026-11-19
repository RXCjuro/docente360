import { auth, db, DOMINIO } from "../config/firebase-config.js";
import { GoogleAuthProvider, signInWithPopup, signInWithEmailAndPassword, signOut, onAuthStateChanged }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { doc, getDoc, setDoc, serverTimestamp }
  from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

export const esInstitucional = (e) => {
  if (!e) return false;
  const correo = e.trim().toLowerCase();
  const dominio = DOMINIO.toLowerCase();
  return correo.endsWith("@" + dominio)
    && correo.slice(0, -dominio.length - 1).length > 0
    && !/\s/.test(correo);
};

const MENSAJES = {
  "auth/invalid-credential": "Correo o contraseña incorrectos.",
  "auth/wrong-password": "Correo o contraseña incorrectos.",
  "auth/user-not-found": "Correo o contraseña incorrectos.",
  "auth/invalid-email": "Escribe un correo válido.",
  "auth/user-disabled": "Tu cuenta está deshabilitada. Contacta al administrador.",
  "auth/too-many-requests": "Demasiados intentos. Espera unos minutos e inténtalo de nuevo.",
  "auth/network-request-failed": "No hay conexión. Revisa tu internet e inténtalo de nuevo.",
  "auth/popup-closed-by-user": "Cerraste la ventana de Google antes de terminar.",
  "auth/cancelled-popup-request": "Cerraste la ventana de Google antes de terminar.",
  "auth/popup-blocked": "Tu navegador bloqueó la ventana de Google. Permite las ventanas emergentes."
};
const traducir = (e) => new Error(MENSAJES[e?.code] || e?.message || "No se pudo iniciar sesión.");

async function exigirDominio(user) {
  if (!esInstitucional(user.email)) {
    await signOut(auth);
    throw new Error(`Ingresa con tu correo @${DOMINIO}.`);
  }
  return user;
}

export async function login() {
  const p = new GoogleAuthProvider();
  p.setCustomParameters({ hd: DOMINIO, prompt: "select_account" });
  try { return await exigirDominio((await signInWithPopup(auth, p)).user); }
  catch (e) { throw traducir(e); }
}

export async function loginCorreo(correo, clave) {
  if (!esInstitucional(correo)) throw new Error(`Ingresa con tu correo @${DOMINIO}.`);
  try { return await exigirDominio((await signInWithEmailAndPassword(auth, correo.trim(), clave)).user); }
  catch (e) { throw traducir(e); }
}

export const logout = () => signOut(auth);

// Entrega { uid, email, nombre, rol } o null. El primer ingreso crea el perfil con rol "consulta".
export function observarSesion(cb) {
  onAuthStateChanged(auth, async (u) => {
    if (!u) return cb(null);
    if (!esInstitucional(u.email)) { await signOut(auth); return cb(null); }
    const r = doc(db, "usuarios", u.uid);
    let snap = await getDoc(r);
    if (!snap.exists()) {
      await setDoc(r, { email: u.email, nombre: u.displayName || u.email, rol: "consulta", creado: serverTimestamp() });
      snap = await getDoc(r);
    }
    cb({ uid: u.uid, ...snap.data() });
  });
}
