const { response } = require("express");
const {
  findTypeTaskById,
  findTypesTaskByActive,
  findTypesTask,
  createTypeTask,
  updateTypeTask,
} = require("../database/repositories/type_task_repo");

const getTypesTask = async (req, res = response) => {
  const typesTasks = await findTypesTask();
  if (!typesTasks) {
    return res.status(404).json({
      ok: false,
      msg: "NOT FOUND TYPES TASK",
    });
  }
  res.status(200).json({
    ok: true,
    types_tasks: typesTasks,
  });
};

const getTypeTaskById = async (req, res = response) => {
  const { id } = req.params;
  const typeTask = await findTypeTaskById(id);
  if (!typeTask) {
    return res.status(404).json({
      ok: false,
      msg: "NOT FOUND TYPES TASK WITH THI ID",
    });
  }
  res.status(200).json({
    ok: true,
    type_task: typeTask,
  });
};

const getTypesTaskByActive = async (req, res = response) => {
  const { active } = req.params;
  const typesTask = await findTypesTaskByActive(active);
  if (!typesTask) {
    return res.status(404).json({
      ok: false,
      msg: "NOT FOUND TYPES TASK WITH THIS ACTIVE",
    });
  }
  res.status(200).json({
    ok: true,
    types_task: typesTask,
  });
};

const insertTypeTask = async (req, res = response) => {
  const typeTaskInsert = req.body;
  const typeTaskId = await createTypeTask(typeTaskInsert);
  if (!typeTaskId) {
    return res.status(400).json({
      ok: false,
      msg: "BAD REQUEST INSERT ",
    });
  }
  const typeTaskCreated = await findTypeTaskById(typeTaskId);

  res.status(201).json({
    ok: true,
    type_task: typeTaskCreated,
  });
};

const putTypeTask = async (req, res = response) => {
  try {
    const typeTaskUpdate = req.body;
    const typeTaskId = await updateTypeTask(typeTaskUpdate);
    if (!typeTaskId) {
      return res.status(400).json({
        ok: false,
        msg: "BAD REQUEST UPDATE ",
      });
    }
    const typeTaskUpdated = await findTypeTaskById(typeTaskUpdate.tps_id);

    res.status(201).json({
      ok: true,
      type_task: typeTaskUpdated,
    });
  } catch (e) {
    console.log("Error on putTypeActity", e);
  }
};

module.exports = {
  getTypesTask,
  getTypeTaskById,
  getTypesTaskByActive,
  insertTypeTask,
  putTypeTask,
};
