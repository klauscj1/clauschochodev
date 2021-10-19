const {
  findProjectById,
  findProjectsActivesByUserId,
  findProjectsByUserId,
  createProject,
  updateProject,
} = require("../database/repositories/project_repo");

const getProjectById = async (req, res = response) => {
  const { id } = req.params;
  const project = await findProjectById(id);
  if (!project) {
    return res.status(404).json({
      ok: false,
      msg: "NOT FOUND Project",
    });
  }
  res.status(200).json({
    ok: true,
    project,
  });
};

const getProjectByStateByUserId = async (req, res = response) => {
  const { active, id } = req.params;
  const projects = await findProjectsActivesByUserId(id, active);
  if (!projects) {
    return res.status(404).json({
      ok: false,
      msg: "NOT FOUND Projects",
    });
  }
  res.status(200).json({
    ok: true,
    projects,
  });
};

const getProjectByUserId = async (req, res = response) => {
  const { id } = req.params;
  const projects = await findProjectsByUserId(id);
  if (!projects) {
    return res.status(404).json({
      ok: false,
      msg: "NOT FOUND Projects",
    });
  }
  res.status(200).json({
    ok: true,
    projects,
  });
};

const insertProject = async (req, res = response) => {
  const projectInsert = req.body;
  const projectInsertedId = await createProject(projectInsert);
  if (!projectInsertedId) {
    return res.status(400).json({
      ok: false,
      msg: "BAD REQUEST INSERT ",
    });
  }
  const projectCreated = await findProjectById(projectInsertedId);

  res.status(201).json({
    ok: true,
    project: projectCreated,
  });
};

const putProject = async (req, res = response) => {
  try {
    const projectUpdate = req.body;
    const projectUpdatedResult = await updateProject(projectUpdate);
    if (!projectUpdatedResult) {
      return res.status(400).json({
        ok: false,
        msg: "BAD REQUEST UPDATE ",
      });
    }
    const projectUpdated = await findProjectById(projectUpdate.pro_id);

    res.status(201).json({
      ok: true,
      project: projectUpdated,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      msg: "Server error",
    });
    console.log("Error on putProject", e);
  }
};

module.exports = {
  getProjectById,
  getProjectByStateByUserId,
  getProjectByUserId,
  insertProject,
  putProject,
};
