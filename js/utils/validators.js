import { DOMINIO } from "../config/firebase-config.js";

export const requerido = (v) =>
  String(v ?? "").trim() ? "" : "Este campo es obligatorio.";

export const correoInstitucional = (v) =>
  !v
    || new RegExp(
      `^[^@\\s]+@${DOMINIO.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}$`,
      "i"
    ).test(v)
    ? ""
    : `Usa un correo @${DOMINIO}.`;

export const dni = (v) =>
  !v || /^\d{8}$/.test(v) ? "" : "El DNI debe tener 8 dígitos.";

export const telefono = (v) =>
  !v || /^\d{9}$/.test(v) ? "" : "El teléfono debe tener 9 dígitos.";

export const nota = (v) =>
  v === "" || (v >= 0 && v <= 20)
    ? ""
    : "Ingresa un valor entre 0 y 20.";

export const enteroNoNegativo = (v) =>
  v === ""
    ? "Este campo es obligatorio."
    : /^\d+$/.test(String(v).trim()) && Number(v) >= 0
      ? ""
      : "Ingresa un entero mayor o igual a 0.";

export const fechaNoFutura = (v) =>
  !v
    || v <= new Date().toISOString().slice(0, 10)
    ? ""
    : "La fecha no puede ser futura.";

export const condicionValida = (v) =>
  ["Tiempo completo", "Tiempo parcial", "Por horas"].includes(v)
    ? ""
    : "Selecciona una condición válida.";

export const textoRequeridoSinEspacios = (v) =>
  String(v ?? "").trim()
    ? ""
    : "Este campo no puede contener solo espacios.";
