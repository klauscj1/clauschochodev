const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { createUser, login, revalidateToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/validate-fields");
const { validateJWT } = require("../middlewares/validate-jwt");

router.post(
  "/",
  [
    check("name", "Less name").not().isEmpty(),
    check("alias", "Less alias").not().isEmpty(),
    check("email", "Les email").isEmail(),
    check(
      "password",
      "The password is required and this should be contains more 6 characters"
    ).isLength({ min: 6 }),
    check("type", "The user type is required").isNumeric(),
    check("active", "The user active is required").isBoolean(),
    validateFields,
  ],
  createUser
);

router.post(
  "/login",
  [
    check("alias", "El alias es obligatorio").not().isEmpty(),
    check(
      "password",
      "The password is required and this should be contains more 6 characters"
    ).isLength({ min: 6 }),
    validateFields,
  ],
  login
);
router.get("/renew", validateJWT, revalidateToken);

module.exports = router;
