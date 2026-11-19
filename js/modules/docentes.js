import { iniciar } from "../app.js";
import { montarCRUD } from "../ui/crud.js";
import { correoInstitucional, dni, telefono, fechaNoFutura, condicionValida } from "../utils/validators.js";
import { esCodigoUnico, esDniUnico } from "../utils/business-rules.js";

const user = await iniciar("docentes");

if (user) await montarCRUD({
  coleccion: "docentes", titulo: "Lista de docentes", singular: "docente",
  buscarPlaceholder: "Nombre, código o correo",
  campos: [
    { k: "codigo", label: "Código", required: true },
    { k: "dni", label: "DNI", required: true, validar: dni },
    { k: "apellidos", label: "Apellidos", required: true },
    { k: "nombres", label: "Nombres", required: true },
    { k: "correo", label: "Correo institucional", type: "email", required: true, validar: correoInstitucional },
    { k: "telefono", label: "Teléfono", validar: telefono },
    { k: "area", label: "Área académica", required: true },
    { k: "cargo", label: "Cargo" },
    { k: "condicion", label: "Condición", type: "select", options: ["Tiempo completo", "Tiempo parcial", "Por horas"], required: true, validar: condicionValida },
    { k: "fechaIngreso", label: "Fecha de ingreso", type: "date", validar: fechaNoFutura },
  ],
  uniqueFields: ["codigo", "dni"],
  validarRegistro: (data, editando, filas) => {
    const actuales = filas.filter((fila) => fila.id !== editando?.id);
    if (!esCodigoUnico(data.codigo, actuales)) return "El código de docente ya existe.";
    if (!esDniUnico(data.dni, actuales)) return "El DNI ya está registrado.";
    return "";
  },
  transformar: (data) => {
    data.codigo = data.codigo.trim();
    data.dni = data.dni.trim();
    data.correo = data.correo.trim();
  },
  columnas: ["codigo", "apellidos", "nombres", "correo", "area", "condicion"],
  acciones: (f) => `<a class="link" href="ficha.html?id=${f.id}">Ver ficha</a>`,
}, user);
