const pool = require("../db");

const findTypeTaskById = async (id) => {
  try {
    const typeTaskResult = await pool.query(
      "select * from type_task where tps_id=$1",
      [id]
    );
    return typeTaskResult.rows[0];
  } catch (error) {
    console.log("Error on findTypeTaskById: ", error);
    return null;
  }
};

const findTypesTaskByActive = async (active) => {
  try {
    const typeTaskResult = await pool.query(
      "select * from type_task where tps_active=$1",
      [active]
    );
    return typeTaskResult.rows;
  } catch (error) {
    console.log("Error on findTypesTaskByActive: ", error);
    return null;
  }
};

const findTypesTask = async () => {
  try {
    const typeTaskResult = await pool.query("select * from type_task", []);
    return typeTaskResult.rows;
  } catch (error) {
    console.log("Error on findTypesTask: ", error);
    return null;
  }
};

const createTypeTask = async (typeTask) => {
  try {
    const typeTaskResult = await pool.query(
      "INSERT INTO type_task(tps_name, tps_name_english, tps_active) VALUES ($1, $2, $3) returning tps_id",
      [typeTask.name, typeTask.name_english, typeTask.active]
    );
    return typeTaskResult.rows[0].tps_id;
  } catch (error) {
    console.log("Error on createTypeTask: ", error);
    return null;
  }
};

const updateTypeTask = async (typeTask) => {
  try {
    const typeTaskResult = await pool.query(
      "update type_task set tps_name=$1, tps_name_english=$2, tps_active=$3 where tps_id=$4",
      [
        typeTask.tps_name,
        typeTask.tps_name_english,
        typeTask.tps_active,
        typeTask.tps_id,
      ]
    );
    return typeTaskResult.rowCount;
  } catch (error) {
    console.log("Error on updateTypeTask: ", error);
    return null;
  }
};

module.exports = {
  findTypeTaskById,
  findTypesTaskByActive,
  findTypesTask,
  createTypeTask,
  updateTypeTask,
};
