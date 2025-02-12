const DivisionSettings = require("../models/divisionSettings");

const getDivisionSettings = async (req, res) => {
  try {
    const divisionData = await DivisionSettings.findOne({ category: req.params.division }).select('-_id');

    if (!divisionData) {
      return res.status(404).json({ error: `Division settings not found` });
    }

    return res.status(200).json(divisionData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving division settings" });
  }
};

const createDivisionSettings = async (req, res) => {
  try {
    const existingDivisionSettings = await DivisionSettings.findOne({ category: req.body.category });

    if (existingDivisionSettings) {
      return res.status(400).json({ error: "Category already exists" });
    }

    const newDivisionSettings = new DivisionSettings(req.body);
    await newDivisionSettings.save();

    return res.status(201).json({ message: "Successfully added new division settings" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add a new division settings" });
  }
};

const updateDivisionSettings = async (req, res) => {
  try {
    const updatedDivisionSettings = await DivisionSettings.findOneAndUpdate({ category: req.params.division }, req.body);

    if (!updatedDivisionSettings) {
      return res.status(404).json({ error: "Division settings not found" });
    }

    return res.status(200).json({ message: "Successfully updated division settings" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update division settings" });
  }
};

const deleteDivisionSettings = async (req, res) => {
  try {
    const deletedDivisionSettings = await DivisionSettings.findOneAndDelete({ category: req.params.division });

    if (!deletedDivisionSettings) {
      return res.status(400).json({ error: "Division settings not found" });
    }

    return res.status(201).json({ message: "Successfully deleted division settings" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete a division settings" });
  }
};

module.exports = {
  getDivisionSettings,
  createDivisionSettings,
  updateDivisionSettings,
  deleteDivisionSettings,
};