const Division = require("../models/Division");

const getDivision = async (req, res) => {
  try {
    const divisionData = await Division.findOne({
      category: req.params.category,
    }).select(
      "-_id"
    );

    if (!divisionData) {
      return res.status(404).json({ error: `Division not found` });
    }

    return res.status(200).json(divisionData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving division" });
  }
};

const createDivision = async (req, res) => {
  try {
    const existingDivision = await Division.findOne({
      category: req.body.category,
    });

    if (existingDivision) {
      return res.status(400).json({ error: "Division already exists" });
    }

    const newDivision = new Division(req.body);
    await newDivision.save();

    return res.status(201).json({ message: "Successfully added new division" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add a new division" });
  }
};

const updateDivision = async (req, res) => {
  try {
    const updatedDivision = await Division.findOneAndUpdate({
      category: req.params.category,
    }, req.body);

    if (!updatedDivision) {
      return res.status(404).json({ error: "Division settings not found" });
    }

    return res.status(200).json({ message: "Successfully updated division" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update division" });
  }
};

const deleteDivision = async (req, res) => {
  try {
    const deletedDivision = await Division.findOneAndDelete({
      category: req.params.category,
    });

    if (!deletedDivision) {
      return res.status(400).json({ error: "Division not found" });
    }

    return res.status(201).json({ message: "Successfully deleted division" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete a division" });
  }
};

module.exports = {
  getDivision,
  createDivision,
  updateDivision,
  deleteDivision,
};