import test from "node:test";
import assert from "node:assert/strict";
import {
  calcularPromedioPonderado,
  esCodigoUnico,
  esDniUnico,
  esUltimoAdmin,
  nivelDesempeno,
  puedeEditar,
  puedeEliminar,
  redondearNota,
  validarCondicionLaboral,
  validarEnteroNoNegativo,
  validarFechaNoFutura,
  validarNota,
  validarPlazoRegistro,
  validarRatingEncuesta,
} from "../js/utils/business-rules.js";

test("rechaza códigos duplicados y acepta códigos nuevos", () => {
  const docentes = [{ codigo: "DOC001" }, { codigo: "DOC002" }];
  assert.equal(esCodigoUnico("DOC001", docentes), false);
  assert.equal(esCodigoUnico("DOC003", docentes), true);
});

test("rechaza DNI duplicados", () => {
  assert.equal(esDniUnico("12345678", [{ dni: "12345678" }]), false);
  assert.equal(esDniUnico("87654321", [{ dni: "12345678" }]), true);
});

test("rechaza fechas futuras y acepta hoy", () => {
  const hoy = new Date("2026-11-18T12:00:00Z");
  assert.equal(validarFechaNoFutura("2026-11-18", hoy), true);
  assert.equal(validarFechaNoFutura("2026-11-19", hoy), false);
});

test("solo acepta condiciones laborales del catálogo", () => {
  assert.equal(validarCondicionLaboral("Tiempo completo"), true);
  assert.equal(validarCondicionLaboral("Temporal"), false);
});

test("valida límites y redondea notas", () => {
  assert.equal(validarNota(18), true);
  assert.equal(validarNota(20), true);
  assert.equal(validarNota(-1), false);
  assert.equal(validarNota(21), false);
  assert.equal(redondearNota(14.256), 14.3);
});

test("valida rating de encuesta con la escala aprobada", () => {
  assert.equal(validarRatingEncuesta(0), true);
  assert.equal(validarRatingEncuesta(20), true);
  assert.equal(validarRatingEncuesta(21), false);
});

test("valida respuestas como enteros no negativos", () => {
  assert.equal(validarEnteroNoNegativo(12), true);
  assert.equal(validarEnteroNoNegativo(12.5), false);
  assert.equal(validarEnteroNoNegativo(-3), false);
});

test("aplica el plazo de registro de supervisión", () => {
  assert.equal(validarPlazoRegistro(2), true);
  assert.equal(validarPlazoRegistro(4), true);
  assert.equal(validarPlazoRegistro(5), false);
  assert.equal(validarPlazoRegistro(10, true), true);
});

test("calcula el promedio ponderado y clasifica niveles", () => {
  const promedio = calcularPromedioPonderado({
    evaluacion: 16,
    supervision: 14,
    encuesta: 18,
  });
  assert.equal(promedio, 16);
  assert.equal(nivelDesempeno(13.9), "Regular");
  assert.equal(nivelDesempeno(14), "Bueno");
  assert.equal(nivelDesempeno(null), "Incompleto");
});

test("aplica permisos por rol", () => {
  assert.equal(puedeEditar("consulta"), false);
  assert.equal(puedeEditar("editor"), true);
  assert.equal(puedeEliminar("editor"), false);
  assert.equal(puedeEliminar("admin"), true);
});

test("evita degradar al último administrador", () => {
  const usuarios = [{ id: "u1", rol: "admin" }];
  assert.equal(esUltimoAdmin(usuarios, "u1"), true);
  assert.equal(esUltimoAdmin([...usuarios, { id: "u2", rol: "admin" }], "u1"), false);
});
