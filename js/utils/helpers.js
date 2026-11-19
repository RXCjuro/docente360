export const esc = (v) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
  );

export const prom = (arr) =>
  arr.length ? arr.reduce((a, b) => a + b, 0) / arr.length : null;

export const fmtNota = (n) =>
  n === null || n === undefined ? "—" : Number(n).toFixed(1);

export const nombreCompleto = (d) =>
  d ? `${d.apellidos}, ${d.nombres}` : "—";

export const redondear = (n, decimales = 1) =>
  Math.round((Number(n) + Number.EPSILON) * (10 ** decimales)) / (10 ** decimales);

export const nivelDesempeno = (n) => {
  if (n === null || n === undefined) return "incompleto";
  if (n >= 17) return "Destacado";
  if (n >= 14) return "Bueno";
  if (n >= 11) return "Regular";
  return "Deficiente";
};

export const ordenarApellidos = (arr) => [...arr].sort((a, b) =>
  `${a.apellidos ?? ""}, ${a.nombres ?? ""}`.localeCompare(
    `${b.apellidos ?? ""}, ${b.nombres ?? ""}`,
    "es",
    { sensitivity: "base" }
  )
);
