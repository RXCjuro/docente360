import { auth, db } from "../config/firebase-config.js";

import {
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// Iniciar sesión con correo y contraseña
export async function loginCorreo(correo, clave) {
  try {
    const resultado = await signInWithEmailAndPassword(
      auth,
      correo.trim(),
      clave
    );

    return resultado.user;

  } catch (error) {
    throw traducir(error);
  }
}

// Cerrar sesión
export const logout = () => signOut(auth);

// Comprobar si existe una sesión autorizada
export function observarSesion(cb) {
  onAuthStateChanged(auth, async (usuario) => {
    if (!usuario) {
      cb(null);
      return;
    }

    try {
      const referencia = doc(db, "usuarios", usuario.uid);
      const perfil = await getDoc(referencia);

      // Si no existe un perfil, se bloquea el acceso
      if (!perfil.exists()) {
        await signOut(auth);
        cb(null);
        return;
      }

      const datos = perfil.data();
      const rolesPermitidos = ["admin", "editor", "consulta"];

      // Comprobar correo y rol
      if (
        datos.email?.toLowerCase() !== usuario.email?.toLowerCase() ||
        !rolesPermitidos.includes(datos.rol)
      ) {
        await signOut(auth);
        cb(null);
        return;
      }

      cb({
        uid: usuario.uid,
        ...datos
      });

    } catch (error) {
      console.error("Error al comprobar el usuario:", error);
      await signOut(auth);
      cb(null);
    }
  });
}

// Traducir errores de Firebase
function traducir(error) {
  const mensajes = {
    "auth/invalid-credential": "Correo o contraseña incorrectos.",
    "auth/user-not-found": "No existe una cuenta con este correo.",
    "auth/wrong-password": "La contraseña es incorrecta.",
    "auth/too-many-requests": "Demasiados intentos. Inténtalo más tarde.",
    "auth/invalid-email": "El correo electrónico no es válido."
  };

  return new Error(
    mensajes[error.code] || "No se pudo iniciar sesión. Inténtalo nuevamente."
  );
}
