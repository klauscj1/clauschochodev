const pool = require("../db");

const findTypeActivityById = async (id) => {
  try {
    const typeActivityResult = await pool.query(
      "select * from type_activity where tac_id=$1",
      [id]
    );
    return typeActivityResult.rows[0];
  } catch (error) {
    console.log("Error on findTypeActivityById: ", error);
    return null;
  }
};

const findTypesActivityByActive = async (active) => {
  try {
    const typeActivityResult = await pool.query(
      "select * from type_activity where tac_active=$1",
      [active]
    );
    return typeActivityResult.rows;
  } catch (error) {
    console.log("Error on findTypesActivityByActive: ", error);
    return null;
  }
};

const findTypesActivity = async () => {
  try {
    const typeActivityResult = await pool.query(
      "select * from type_activity ",
      []
    );
    return typeActivityResult.rows;
  } catch (error) {
    console.log("Error on findTypesActivity: ", error);
    return null;
  }
};

const createTypeActivity = async (typeActivity) => {
  try {
    const typeActivityResult = await pool.query(
      "INSERT INTO type_activity(tac_name, tac_name_english, tac_active) VALUES ($1, $2, $3) returning tac_id",
      [typeActivity.name, typeActivity.name_english, typeActivity.active]
    );
    return typeActivityResult.rows[0].tac_id;
  } catch (error) {
    console.log("Error on createTypeActivity: ", error);
    return null;
  }
};

const updateTypeActivity = async (typeActivity) => {
  try {
    const typeActivityResult = await pool.query(
      "update type_activity set tac_name=$1, tac_name_english=$2, tac_active=$3 where tac_id=$4",
      [
        typeActivity.tac_name,
        typeActivity.tac_name_english,
        typeActivity.tac_active,
        typeActivity.tac_id,
      ]
    );
    return typeActivityResult.rowCount;
  } catch (error) {
    console.log("Error on updateTypeActivity: ", error);
    return null;
  }
};

module.exports = {
  findTypeActivityById,
  findTypesActivityByActive,
  findTypesActivity,
  createTypeActivity,
  updateTypeActivity,
};
