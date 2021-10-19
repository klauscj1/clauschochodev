const { response } = require("express");
const {
  findTypesActivity,
  findTypeActivityById,
  findTypesActivityByActive,
  createTypeActivity,
  updateTypeActivity,
} = require("../database/repositories/type_activites_repo");

const getTypesActivity = async (req, res = response) => {
  const typesActivities = await findTypesActivity();
  if (!typesActivities) {
    return res.status(404).json({
      ok: false,
      msg: "NOT FOUND TYPES ACTIVITY",
    });
  }
  res.status(200).json({
    ok: true,
    types_activity: typesActivities,
  });
};

const getTypesActivityById = async (req, res = response) => {
  const { id } = req.params;
  const typeActivity = await findTypeActivityById(id);
  if (!typeActivity) {
    return res.status(404).json({
      ok: false,
      msg: "NOT FOUND TYPES ACTIVITY WITH THI ID",
    });
  }
  res.status(200).json({
    ok: true,
    type_activity: typeActivity,
  });
};

const getTypesActivityByActive = async (req, res = response) => {
  const { active } = req.params;
  const typesActivity = await findTypesActivityByActive(active);
  if (!typesActivity) {
    return res.status(404).json({
      ok: false,
      msg: "NOT FOUND TYPES ACTIVITY WITH THIS ACTIVE",
    });
  }
  res.status(200).json({
    ok: true,
    types_activity: typesActivity,
  });
};

const insertTypeActivity = async (req, res = response) => {
  const typeActivityInsert = req.body;
  const typeActivity = await createTypeActivity(typeActivityInsert);
  if (!typeActivity) {
    return res.status(400).json({
      ok: false,
      msg: "BAD REQUEST INSERT ",
    });
  }
  const typeActivityCreated = await findTypeActivityById(typeActivity);

  res.status(201).json({
    ok: true,
    type_activity: typeActivityCreated,
  });
};

const putTypeActity = async (req, res = response) => {
  try {
    const typeActivityUpdate = req.body;
    const typeActivity = await updateTypeActivity(typeActivityUpdate);
    console.log("typeActivity", typeActivity);
    if (!typeActivity) {
      return res.status(400).json({
        ok: false,
        msg: "BAD REQUEST UPDATE ",
      });
    }
    const typeActivityUpdated = await findTypeActivityById(
      typeActivityUpdate.tac_id
    );

    res.status(201).json({
      ok: true,
      type_activity: typeActivityUpdated,
    });
  } catch (e) {
    console.log("Error on putTypeActity", e);
  }
};

module.exports = {
  getTypesActivity,
  getTypesActivityById,
  getTypesActivityByActive,
  insertTypeActivity,
  putTypeActity,
};
