const pool = require("../db");

const findUserByEmail = async (email) => {
  try {
    const userResult = await pool.query(
      "select * from usuario where usu_email=$1",
      [email]
    );
    return userResult.rows[0];
  } catch (error) {
    console.log("Error on findUserByEmail: ", error);
    return null;
  }
};

const findUserByAlias = async (alias) => {
  try {
    const userResult = await pool.query(
      "select * from usuario where usu_alias=$1",
      [alias]
    );
    return userResult.rows[0];
  } catch (error) {
    console.log("Error on findUserByAlias: ", error);
    return null;
  }
};

const findUserById = async (id) => {
  try {
    const userResult = await pool.query(
      "select * from usuario where usu_id=$1 ",
      [id]
    );
    return userResult.rows[0];
  } catch (error) {
    console.log("Error on findUserById: ", error);
    return null;
  }
};

const insertUser = async (user) => {
  try {
    const userSave = await pool.query(
      "insert into usuario(usu_email,usu_password,usu_name,usu_type,usu_active,usu_alias) values ($1,$2,$3,$4,$5,$6)",
      [user.email, user.password, user.name, user.type, user.active, user.alias]
    );
    return userSave.rowCount;
  } catch (error) {
    console.log("Error on insertUser: ", error);
    return null;
  }
};

module.exports = {
  findUserByEmail,
  findUserById,
  insertUser,
  findUserByAlias,
};
