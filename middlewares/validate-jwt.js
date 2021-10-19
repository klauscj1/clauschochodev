const { response } = require("express");
const jwt = require("jsonwebtoken");
const validateJWT = (req, res = response, next) => {
  //x-token -> headers
  const token = req.header("x-token");
  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "Not token on the request",
    });
  }
  try {
    const { uid, name } = jwt.verify(token, process.env.SECRET_JWT_SEDD);
    req.uid = uid;
    req.name = name;
    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "Invalid token",
    });
  }
};

module.exports = {
  validateJWT,
};
