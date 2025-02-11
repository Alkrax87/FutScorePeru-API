const Stadium = require("../models/Stadium");

const getAllStadiums = async (req, res) => {
  try {
    const stadiumsData = await Stadium.find().select("-_id");

    return res.status(200).json(stadiumsData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving stadiums" });
  }
};

const getStadiumByStadiumId = async (req, res) => {
  try {
    const stadiumData = await Stadium.findOne({ stadiumId: req.params.stadiumId }).select("-_id");

    if (!stadiumData) {
      return res.status(404).json({ error: "Stadium not found" });
    }

    return res.status(200).json(stadiumData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving stadium" });
  }
};

const createStadium = async (req, res) => {
  try {
    const existingStadium = await Stadium.findOne({ stadiumId: req.body.stadiumId });

    if (existingStadium) {
      return res.status(400).json({ error: "Stadium already exists" });
    }

    const newStadium = new Stadium(req.body);
    await newStadium.save();

    return res.status(201).json({ message: "Successfully added new stadium" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add a new stadium" });
  }
};

const updateStadium = async (req, res) => {
  try {
    const updatedStadium = await Stadium.findOneAndUpdate({ stadiumId: req.params.stadiumId }, req.body);

    if (!updatedStadium) {
      return res.status(404).json({ error: "Stadium not found" });
    }

    return res.status(200).json({ message: "Successfully updated stadium" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update stadium" });
  }
};

const deleteStadium = async (req, res) => {
  try {
    const deletedStadium = await Stadium.findOneAndDelete({ stadiumId: req.params.stadiumId });

    if (!deletedStadium) {
      return res.status(404).json({ error: "Stadium not found" });
    }

    return res.status(200).json({ message: "Successfully deleted stadium" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete a stadium" });
  }
};

module.exports = {
  getAllStadiums,
  getStadiumByStadiumId,
  createStadium,
  deleteStadium,
  updateStadium,
};