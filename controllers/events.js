// const { response } = require("express");
// const Evento = require("../models/Evento");

// const getEventos = async (req, res = response) => {
//   const eventos = await Evento.find().populate("user", "name");
//   res.status(200).json({
//     ok: true,
//     eventos,
//   });
// };

// const crearEvento = async (req, res = response) => {
//   try {
//     const evento = new Evento(req.body);
//     evento.user = req.uid;
//     const eventoGuardado = await evento.save();
//     res.status(201).json({
//       ok: true,
//       evento: eventoGuardado,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       ok: false,
//       mgs: "Hable con el administrador",
//     });
//   }
// };

// const actualizarEvento = async (req, res = response) => {
//   const eventoId = req.params.id;
//   try {
//     const evento = await Evento.findById(eventoId);
//     if (!evento) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No se ha encontrado el evento",
//       });
//     }

//     if (evento.user.toString() !== req.uid) {
//       return res.status(401).json({
//         ok: false,
//         msg: "No tiene privilegio de editar este evento",
//       });
//     }
//     const nuevoEvento = {
//       ...req.body,
//       user: req.uid,
//     };

//     const eventActualizado = await Evento.findByIdAndUpdate(
//       eventoId,
//       nuevoEvento,
//       {
//         new: true,
//       }
//     );

//     res.status(200).json({
//       ok: true,
//       evento: eventActualizado,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       ok: false,
//       msg: "Hable con el administrador",
//     });
//   }
// };

// const borrarEvento = async (req, res = response) => {
//   const eventoId = req.params.id;
//   try {
//     const evento = await Evento.findById(eventoId);
//     if (!evento) {
//       return res.status(404).json({
//         ok: false,
//         msg: "No se ha encontrado el evento",
//       });
//     }

//     if (evento.user.toString() !== req.uid) {
//       return res.status(401).json({
//         ok: false,
//         msg: "No tiene privilegio de eliminar este evento",
//       });
//     }

//     await Evento.findByIdAndDelete(eventoId);

//     res.status(200).json({
//       ok: true,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({
//       ok: false,
//       msg: "Hable con el administrador",
//     });
//   }
// };

// module.exports = {
//   getEventos,
//   crearEvento,
//   actualizarEvento,
//   borrarEvento,
// };
