const { Router } = require("express");
const { check } = require("express-validator");
const {
  getTaskById,
  getTasksByProjectId,
  getTasksByUserId,
  insertTask,
  putTask,
} = require("../controllers/task");

const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

router.use(validateJWT);

router.get("/project/:id", getTasksByProjectId);
router.get("/:id", getTaskById);
router.get("/user/:id", getTasksByUserId);
router.post("/", insertTask);
router.put("/", putTask);

module.exports = router;
