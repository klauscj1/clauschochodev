// /*
//   Rutas de eventos / events
//   host + /api/events
// */
// const { Router } = require("express");
// const { check } = require("express-validator");

// const { validarJWT } = require("../middlewares/validar-jwt");
// const {
//   getEventos,
//   crearEvento,
//   actualizarEvento,
//   borrarEvento,
// } = require("../controllers/events");
// const { validarCampos } = require("../middlewares/validar-campos");
// const { isDate } = require("../helpers/isDate");

// const router = Router();
// //Obtener ventos
// router.use(validarJWT);
// router.get("/", getEventos);
// //Crear evento
// router.post(
//   "/",
//   [
//     check("title", "El titulo es obligatorio").not().isEmpty(),
//     check("start", "Fecha de inicio es obligatoria").custom(isDate),
//     check("end", "Fecha de finalización es obligatoria").custom(isDate),

//     validarCampos,
//   ],
//   crearEvento
// );
// //actualizar evento
// router.put("/:id", actualizarEvento);
// //eliminar evento
// router.delete("/:id", borrarEvento);

// module.exports = router;
