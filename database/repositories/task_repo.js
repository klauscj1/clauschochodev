const pool = require("../db");

const findTaskById = async (id) => {
  try {
    const taskResult = await pool.query("select * from task where tas_id=$1", [
      id,
    ]);
    return taskResult.rows[0];
  } catch (error) {
    console.log("Error on findTaskById: ", error);
    return null;
  }
};

const findTasksByUserId = async (userId) => {
  try {
    const tasksResult = await pool.query(
      "select * from task where pro_id is null and usu_id=$1",
      [userId]
    );
    return tasksResult.rows;
  } catch (error) {
    console.log("Error on findTaskByUserId: ", error);
    return null;
  }
};

const findTasksByProjectId = async (projectId) => {
  try {
    const tasksResult = await pool.query("select * from task where pro_id=$1", [
      projectId,
    ]);
    return tasksResult.rows;
  } catch (error) {
    console.log("Error on findTasksByProjectId: ", error);
    return null;
  }
};

const createTask = async (task) => {
  try {
    const taskResult = await pool.query(
      "INSERT INTO task(tas_name, tas_active, tas_duration,tas_date,tps_id,usu_id,pro_id,tas_order,tas_complete) VALUES ($1, $2, $3,$4, $5, $6, $7, $8,$9) returning tas_id",
      [
        task.name,
        task.active,
        task.duration,
        task.date,
        task.tps_id,
        task.usu_id,
        task.pro_id,
        task.order,
        task.complete,
      ]
    );
    return taskResult.rows[0].tas_id;
  } catch (error) {
    console.log("Error on createTask: ", error);
    return null;
  }
};

const updateTask = async (task) => {
  try {
    const taskResult = await pool.query(
      "update task set tas_name=$1, tas_active=$2, tas_duration=$3,tas_date=$4,tps_id=$5,tas_order=$6,tas_complete=$7 where tas_id=$8",
      [
        task.tas_name,
        task.tas_active,
        task.tas_duration,
        task.tas_date,
        task.tps_id,
        task.tas_order,
        task.tas_complete,
        task.tas_id,
      ]
    );
    return taskResult.rowCount;
  } catch (error) {
    console.log("Error on updateTask: ", error);
    return null;
  }
};

module.exports = {
  findTaskById,
  findTasksByUserId,
  findTasksByProjectId,
  createTask,
  updateTask,
};
