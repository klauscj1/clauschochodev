const pool = require("../db");

const findProjectById = async (id) => {
  try {
    const projectResult = await pool.query(
      "select * from project where pro_id=$1",
      [id]
    );
    return projectResult.rows[0];
  } catch (error) {
    console.log("Error on findProjectById: ", error);
    return null;
  }
};

const findProjectsActivesByUserId = async (userId, active) => {
  try {
    const projectResult = await pool.query(
      "select * from project where pro_active=$1 and usu_id=$2",
      [active, userId]
    );
    return projectResult.rows;
  } catch (error) {
    console.log("Error on findProjectsActivesByUserId: ", error);
    return null;
  }
};

const findProjectsByUserId = async (userId) => {
  try {
    const projectResult = await pool.query(
      "select * from project where usu_id=$1 ",
      [userId]
    );
    return projectResult.rows;
  } catch (error) {
    console.log("Error on findProjectsByUserId: ", error);
    return null;
  }
};

const createProject = async (project) => {
  try {
    const projectResult = await pool.query(
      "INSERT INTO project(pro_name, pro_active, usu_id) VALUES ($1, $2, $3) returning pro_id",
      [project.name, project.active, project.usu_id]
    );
    return projectResult.rows[0].pro_id;
  } catch (error) {
    console.log("Error on createProject: ", error);
    return null;
  }
};

const updateProject = async (project) => {
  try {
    const projectResult = await pool.query(
      "update project set pro_name=$1, pro_active=$2, usu_id=$3 where pro_id=$4",
      [project.pro_name, project.pro_active, project.usu_id, project.pro_id]
    );
    return projectResult.rowCount;
  } catch (error) {
    console.log("Error on updateProject: ", error);
    return null;
  }
};

module.exports = {
  findProjectById,
  findProjectsActivesByUserId,
  findProjectsByUserId,
  createProject,
  updateProject,
};
