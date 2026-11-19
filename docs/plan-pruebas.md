# Plan de pruebas

1. `permite_acceso_con_correo_institucional_certus_edu_pe`
   - Inicio de sesión con un correo terminado en `@certus.edu.pe`: permite el ingreso.

2. `rechaza_acceso_con_correo_de_otro_dominio`
   - Inicio de sesión con cualquier dominio distinto de `@certus.edu.pe`: rechaza el ingreso.

3. `oculta_acciones_de_escritura_al_usuario_consulta`
   - Un usuario con rol consulta no ve los botones de crear ni editar.
   - Las reglas de Firestore bloquean las operaciones de escritura.

4. `valida_dni_y_correo_institucional_al_registrar_docente`
   - El DNI debe contener exactamente 8 dígitos.
   - El correo debe terminar en `@certus.edu.pe`.

5. `muestra_evaluaciones_supervisiones_y_encuestas_en_la_ficha`
   - Las evaluaciones, supervisiones y encuestas registradas aparecen en la ficha del docente.

6. `filtra_reportes_por_periodo_y_area`
   - Los filtros de periodo y área muestran los registros correspondientes.

7. `exporta_csv_compatible_con_excel_y_con_tildes`
   - La exportación CSV conserva las tildes al abrirse en Excel.

8. `descarga_la_ficha_en_pdf`
   - La ficha docente se descarga correctamente como archivo PDF.

9. `mantiene_el_menu_accesible_en_pantallas_responsivas`
   - El menú lateral se colapsa correctamente a 375 px y se conserva visible a 1280 px.

10. `evita_duplicados_de_codigo_dni_y_evaluaciones`
    - No permite repetir código o DNI entre docentes.
    - No permite una segunda evaluación del mismo docente en el mismo periodo.

11. `valida_fechas_condiciones_y_periodos`
    - La fecha de ingreso no puede ser futura y la condición debe ser válida.
    - La fecha de supervisión debe pertenecer al periodo y estar dentro del plazo de registro.

12. `valida_encuestas_y_redondea_notas`
    - Las respuestas deben ser enteros no negativos.
    - Menos de 5 respuestas produce una advertencia de baja confiabilidad.
    - Las notas se redondean a una cifra decimal.

13. `calcula_promedio_nivel_y_filtros`
    - El promedio usa pesos 40 % evaluación, 30 % supervisión y 30 % encuesta.
    - Si falta un componente, muestra “Incompleto”.
    - Los límites de nivel son 17, 14 y 11.
    - Los docentes se ordenan alfabéticamente por apellidos.
