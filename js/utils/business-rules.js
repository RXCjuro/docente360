export const PERIODOS_HABILITADOS = ["2025-I", "2025-II", "2026-I", "2026-II"];

export const normalizarTexto = (valor) =>
  typeof valor === "string" ? valor.trim() : valor;

export const esCodigoUnico = (codigo, docentes) =>
  !docentes.some((docente) =>
    normalizarTexto(docente.codigo)?.toUpperCase()
      === normalizarTexto(codigo)?.toUpperCase()
  );

export const esDniUnico = (dni, docentes) =>
  !docentes.some((docente) =>
    normalizarTexto(docente.dni) === normalizarTexto(dni)
  );

export const validarFechaNoFutura = (fecha, hoy = new Date()) => {
  if (!fecha) return true;
  const actual = hoy instanceof Date
    ? hoy.toISOString().slice(0, 10)
    : normalizarTexto(hoy);
  return fecha <= actual;
};

export const validarCondicionLaboral = (condicion) =>
  ["Tiempo completo", "Tiempo parcial", "Por horas"].includes(condicion);

export const validarPeriodo = (periodo) =>
  PERIODOS_HABILITADOS.includes(periodo);

export const validarNota = (nota) =>
  typeof nota === "number"
  && Number.isFinite(nota)
  && nota >= 0
  && nota <= 20;

export const redondearNota = (nota) =>
  validarNota(nota)
    ? Math.round((nota + Number.EPSILON) * 10) / 10
    : null;

export const validarRatingEncuesta = (valor, minimo = 0, maximo = 20) =>
  typeof valor === "number"
  && Number.isFinite(valor)
  && valor >= minimo
  && valor <= maximo;

export const validarEnteroNoNegativo = (valor) =>
  Number.isInteger(valor) && valor >= 0;

export const validarPlazoRegistro = (dias, aperturaExtraordinaria = false) =>
  aperturaExtraordinaria || (dias >= 0 && dias <= 4);

export const calcularPromedioPonderado = ({
  evaluacion,
  supervision,
  encuesta,
}) => {
  if (!validarNota(evaluacion)
    || !validarNota(supervision)
    || !validarNota(encuesta)) {
    return null;
  }
  return Math.round(
    ((evaluacion * 0.4) + (supervision * 0.3) + (encuesta * 0.3) + Number.EPSILON) * 10
  ) / 10;
};

export const nivelDesempeno = (nota) => {
  if (!validarNota(nota)) return "Incompleto";
  if (nota >= 17) return "Destacado";
  if (nota >= 14) return "Bueno";
  if (nota >= 11) return "Regular";
  return "Deficiente";
};

export const puedeEditar = (rol) => ["admin", "editor"].includes(rol);
export const puedeEliminar = (rol) => rol === "admin";

export const esUltimoAdmin = (usuarios, uid) => {
  const activos = usuarios.filter((usuario) => usuario.rol === "admin");
  return activos.length === 1 && activos[0].id === uid;
};

