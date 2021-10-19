const { Router } = require("express");
const { check } = require("express-validator");
const {
  getProjectByUserId,
  getProjectById,
  getProjectByStateByUserId,
  insertProject,
  putProject,
} = require("../controllers/project");

const { validateJWT } = require("../middlewares/validate-jwt");
const router = Router();

router.use(validateJWT);

router.get("/user/:id", getProjectByUserId);
router.get("/:id", getProjectById);
router.get("/user/:id/status/:active", getProjectByStateByUserId);
router.post("/", insertProject);
router.put("/", putProject);

module.exports = router;
