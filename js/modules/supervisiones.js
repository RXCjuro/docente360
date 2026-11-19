import { iniciar } from "../app.js";
import { montarCRUD } from "../ui/crud.js";
import { nota, textoRequeridoSinEspacios } from "../utils/validators.js";

const fechaPeriodo = (periodo, fecha) => {
  if (!periodo || !fecha) return false;

  const [anio, semestre] = periodo.split("-");
  const inicio = `${anio}-${semestre === "I" ? "01" : "07"}-01`;
  const fin = semestre === "I" ? `${anio}-06-30` : `${anio}-12-31`;

  return fecha >= inicio && fecha <= fin;
};

const user = await iniciar("supervisiones");

if (user) await montarCRUD({
  coleccion: "supervisiones", titulo: "Supervisiones de clase", singular: "supervisión",
  campos: [
    { k: "docenteId", label: "Docente", type: "docente", required: true },
    { k: "periodo", label: "Periodo académico", type: "select", options: ["2025-I","2025-II","2026-I","2026-II"], required: true },
    { k: "fecha", label: "Fecha de supervisión", type: "date", required: true },
    { k: "curso", label: "Curso", required: true },
    { k: "puntaje", label: "Puntaje (0–20)", type: "number", required: true, validar: nota },
    { k: "feedback", label: "Feedback del supervisor", type: "textarea", required: true, validar: textoRequeridoSinEspacios },
  ],
  columnas: ["docenteId", "periodo", "fecha", "curso", "puntaje"],
  validarRegistro: (data, editando, filas) => {
    if (!fechaPeriodo(data.periodo, data.fecha)) return "La fecha no pertenece al periodo elegido.";
    if (data.fecha > new Date().toISOString().slice(0, 10)) return "La fecha no puede ser futura.";
    const hace4Dias = new Date();
    hace4Dias.setDate(hace4Dias.getDate() - 4);
    if (data.fecha < hace4Dias.toISOString().slice(0, 10)) return "El plazo de registro es de 4 días.";
    const duplicada = filas.find((f) =>
      f.id !== editando?.id && f.docenteId === data.docenteId
      && String(f.curso).trim().toLowerCase() === data.curso.toLowerCase()
      && f.fecha === data.fecha
    );
    return duplicada ? "Ya existe una supervisión de este curso para el docente en esa fecha." : "";
  },
}, user);
