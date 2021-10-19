const pool = require("../db");

const findActivityById = async (id) => {
  try {
    const activityResult = await pool.query(
      "select * from activity where act_id=$1",
      [id]
    );
    return activityResult.rows[0];
  } catch (error) {
    console.log("Error on findActivityById: ", error);
    return null;
  }
};

const findActivitiesByUserId = async (userId) => {
  try {
    const activitiesResult = await pool.query(
      "select * from activity where pro_id is null and usu_id=$1",
      [userId]
    );
    return activitiesResult.rows;
  } catch (error) {
    console.log("Error on findActivitiesByUserId: ", error);
    return null;
  }
};

const findActivitiesByProjectId = async (projectId) => {
  try {
    const activitiesResult = await pool.query(
      "select * from activity where pro_id=$1",
      [projectId]
    );
    return activitiesResult.rows;
  } catch (error) {
    console.log("Error on findActivitiesByProjectId: ", error);
    return null;
  }
};

const createActivity = async (activity) => {
  try {
    const activityResult = await pool.query(
      "INSERT INTO activity(act_name, act_active, act_duration,act_date,tac_id,usu_id,pro_id,act_orden) VALUES ($1, $2, $3,$4, $5, $6, $7, $8) returning act_id",
      [
        activity.name,
        activity.active,
        activity.duration,
        activity.date,
        activity.tac_id,
        activity.usu_id,
        activity.pro_id,
        activity.orden,
      ]
    );
    return activityResult.rows[0].act_id;
  } catch (error) {
    console.log("Error on createActivity: ", error);
    return null;
  }
};

const updateActivity = async (activity) => {
  try {
    const activityResult = await pool.query(
      "update activity set act_name=$1, act_active=$2, act_duration=$3,act_date=$4,tac_id=$5,act_orden=$6 where act_id=$7",
      [
        activity.act_name,
        activity.act_active,
        activity.ct_duration,
        activity.act_date,
        activity.tac_id,
        activity.tac_orden,
        activity.act_id,
      ]
    );
    return activityResult.rowCount;
  } catch (error) {
    console.log("Error on updateActivity: ", error);
    return null;
  }
};

module.exports = {
  findActivityById,
  findActivitiesByUserId,
  findActivitiesByProjectId,
  createActivity,
  updateActivity,
};
