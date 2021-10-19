//const Usuario = require("../models/Usuario");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");
const { response } = require("express");
const {
  findUserByEmail,
  insertUser,
  findUserByAlias,
} = require("../database/repositories/usuario_repo");

const createUser = async (req, res = response) => {
  try {
    const { email, password, name, type, active, alias } = req.body;
    let user = await findUserByEmail(email);
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "This email are already register",
      });
    }
    //Encriptar contraseña
    const salt = bcrypt.genSaltSync();
    passwordEncrypt = bcrypt.hashSync(password, salt);

    user = {
      email,
      password: passwordEncrypt,
      name,
      type,
      active,
      alias,
    };

    const respuesta = await insertUser(user);

    if (!respuesta) {
      return res.status(500).json({
        ok: false,
        msg: "Server error, please contact with admin.",
      });
    }
    user = await findUserByEmail(email);
    //Generar nuestro jwt
    delete user.usu_password;
    const token = await generateJWT(user);
    res.status(201).json({
      ok: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Server error,please contact with admin.",
    });
  }
};

const login = async (req, res = response) => {
  const { alias, password } = req.body;

  try {
    let user = await findUserByAlias(alias);
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "Don't exist user with this alias",
      });
    }

    const validPassword = bcrypt.compareSync(password, user.usu_password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Password wrong",
      });
    }

    //Generar nuestro jwt
    delete user.usu_password;
    const token = await generateJWT(user);

    res.status(200).json({
      ok: true,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Don't exist user with this alias",
    });
  }
};

const revalidateToken = async (req, res = response) => {
  const uid = req.uid;
  const name = req.name;

  const token = await generateJWT(uid, name);
  res.json({
    ok: true,
    token,
  });
};

module.exports = { createUser, login, revalidateToken };
