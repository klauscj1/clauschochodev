const jwt = require("jsonwebtoken");
const generateJWT = (user) => {
  return new Promise((resolve, reject) => {
    const payload = { ...user };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEDD,
      {
        expiresIn: "24h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("Don't generate token");
        }
        resolve(token);
      }
    );
  });
};

module.exports = {
  generateJWT,
};
