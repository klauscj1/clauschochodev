const {
  findActivityById,
  findActivitiesByUserId,
  findActivitiesByProjectId,
  createActivity,
  updateActivity,
} = require("../database/repositories/activity_repo");

const getActivityById = async (req, res = response) => {
  const { id } = req.params;
  const activity = await findActivityById(id);
  if (!activity) {
    return res.status(404).json({
      ok: false,
      msg: "NOT FOUND activity",
    });
  }
  res.status(200).json({
    ok: true,
    activity,
  });
};

const getActivitiesByUserId = async (req, res = response) => {
  const { id } = req.params;
  const activities = await findActivitiesByUserId(id);
  if (!activities) {
    return res.status(404).json({
      ok: false,
      msg: "NOT FOUND activities",
    });
  }
  res.status(200).json({
    ok: true,
    activities,
  });
};

const getActivitiesByProjectId = async (req, res = response) => {
  const { id } = req.params;
  const activities = await findActivitiesByProjectId(id);
  if (!activities) {
    return res.status(404).json({
      ok: false,
      msg: "NOT FOUND activities for this project",
    });
  }
  res.status(200).json({
    ok: true,
    activities,
  });
};

const insertActivity = async (req, res = response) => {
  const activityInsert = req.body;
  const activityInsertedId = await createActivity(activityInsert);
  if (!activityInsertedId) {
    return res.status(400).json({
      ok: false,
      msg: "BAD REQUEST INSERT ",
    });
  }
  const activityCreated = await findActivityById(activityInsertedId);

  res.status(201).json({
    ok: true,
    activity: activityCreated,
  });
};

const putActivity = async (req, res = response) => {
  try {
    const activityUpdate = req.body;
    const activityUpdatedResult = await updateActivity(activityUpdate);
    if (!activityUpdatedResult) {
      return res.status(400).json({
        ok: false,
        msg: "BAD REQUEST UPDATE ",
      });
    }
    const activityUpdated = await findProjectById(activityUpdate.act_id);

    res.status(201).json({
      ok: true,
      activity: activityUpdated,
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
  getActivityById,
  getActivitiesByUserId,
  getActivitiesByProjectId,
  insertActivity,
  putActivity,
};
