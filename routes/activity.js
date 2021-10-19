const { Router } = require("express");
const { check } = require("express-validator");
const {
  getActivitiesByProjectId,
  getActivityById,
  getActivitiesByUserId,
  insertActivity,
  putActivity,
} = require("../controllers/activity");

const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

router.use(validateJWT);

router.get("/project/:id", getActivitiesByProjectId);
router.get("/:id", getActivityById);
router.get("/user/:id", getActivitiesByUserId);
router.post("/", insertActivity);
router.put("/", putActivity);

module.exports = router;
