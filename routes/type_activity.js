const { Router } = require("express");
const { check } = require("express-validator");
const {
  getTypesActivity,
  getTypesActivityById,
  getTypesActivityByActive,
  insertTypeActivity,
  putTypeActity,
} = require("../controllers/type_activity_controller");

const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

router.use(validateJWT);

router.get("/", getTypesActivity);
router.get("/:id", getTypesActivityById);
router.get("/status/:active", getTypesActivityByActive);
router.post("/", insertTypeActivity);
router.put("/", putTypeActity);

module.exports = router;
