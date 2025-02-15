const Manager = require("../models/Manager");

const getManagers = async (req, res) => {
  try {
    const managersData = await Manager.find({
      category: req.params.category,
    }).select(
      "-_id -category -managerId"
    );

    if (managersData.length > 0) {
      return res.status(200).json(managersData.reverse());
    } else {
      return res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving managers" });
  }
};

const getManagerByTeamId = async (req, res) => {
  try {
    const managersData = await Manager.find({
      category: req.params.category,
      teamId: req.params.teamId,
    }).select(
      "-_id -category -managerId"
    );

    if (managersData.length > 0) {
      return res.status(200).json(managersData.reverse());
    } else {
      return res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving managers" });
  }
};

const createManager = async (req, res) => {
  try {
    const existingManager = await Manager.findOne({
      managerId: req.body.managerId,
    });

    if (existingManager) {
      return res.status(400).json({ error: "Manager already exists" });
    }

    req.body.category = req.params.category;

    const newManager = new Manager(req.body);
    await newManager.save();

    return res.status(201).json({ message: "Successfully added new manager" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add a new manager" });
  }
};

const updateManager = async (req, res) => {
  try {
    const updatedManager = await Manager.findOneAndUpdate({
      category: req.params.category,
      managerId: req.params.managerId,
    }, req.body);

    if (!updatedManager) {
      return res.status(404).json({ error: "Manager not found" });
    }

    return res.status(200).json({ message: "Successfully updated manager" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update manager" });
  }
};

const deleteManager = async (req, res) => {
  try {
    const deletedManager = await Manager.findOneAndDelete({
      category: req.params.category,
      managerId: req.params.managerId,
    });

    if (!deletedManager) {
      return res.status(404).json({ error: "Manager not found" });
    }

    return res.status(200).json({ message: "Successfully deleted manager" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete the manager" });
  }
};

module.exports = {
  getManagers,
  getManagerByTeamId,
  createManager,
  updateManager,
  deleteManager,
};