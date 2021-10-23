const {
  findTaskById,
  findTasksByUserId,
  findTasksByProjectId,
  createTask,
  updateTask,
} = require("../database/repositories/task_repo");

const getTaskById = async (req, res = response) => {
  const { id } = req.params;
  const task = await findTaskById(id);
  if (!task) {
    return res.status(404).json({
      ok: false,
      msg: "NOT FOUND task",
    });
  }
  res.status(200).json({
    ok: true,
    task,
  });
};

const getTasksByUserId = async (req, res = response) => {
  const { id } = req.params;
  const tasks = await findTasksByUserId(id);
  if (!tasks) {
    return res.status(404).json({
      ok: false,
      msg: "NOT FOUND tasks",
    });
  }
  res.status(200).json({
    ok: true,
    tasks,
  });
};

const getTasksByProjectId = async (req, res = response) => {
  const { id } = req.params;
  const tasks = await findTasksByProjectId(id);
  if (!tasks) {
    return res.status(404).json({
      ok: false,
      msg: "NOT FOUND tasks for this project",
    });
  }
  res.status(200).json({
    ok: true,
    tasks,
  });
};

const insertTask = async (req, res = response) => {
  const taskInsert = req.body;
  const taskInsertedId = await createTask(taskInsert);
  if (!taskInsertedId) {
    return res.status(400).json({
      ok: false,
      msg: "BAD REQUEST INSERT ",
    });
  }
  const taskCreated = await findTaskById(taskInsertedId);

  res.status(201).json({
    ok: true,
    task: taskCreated,
  });
};

const putTask = async (req, res = response) => {
  try {
    const taskUpdate = req.body;
    const taskUpdatedResult = await updateTask(taskUpdate);
    if (!taskUpdatedResult) {
      return res.status(400).json({
        ok: false,
        msg: "BAD REQUEST UPDATE ",
      });
    }
    const taskUpdated = await findTaskById(taskUpdate.tas_id);

    res.status(201).json({
      ok: true,
      task: taskUpdated,
    });
  } catch (e) {
    res.status(500).json({
      ok: false,
      msg: "Server error",
    });
    console.log("Error on putTask", e);
  }
};

module.exports = {
  getTaskById,
  getTasksByUserId,
  getTasksByProjectId,
  insertTask,
  putTask,
};
