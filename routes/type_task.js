const { Router } = require("express");
const { check } = require("express-validator");
const {
  getTypesTask,
  getTypeTaskById,
  getTypesTaskByActive,
  insertTypeTask,
  putTypeTask,
} = require("../controllers/type_task");

const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

router.use(validateJWT);

router.get("/", getTypesTask);
router.get("/:id", getTypeTaskById);
router.get("/status/:active", getTypesTaskByActive);
router.post("/", insertTypeTask);
router.put("/", putTypeTask);

module.exports = router;
