const performanceL3 = require("../models/performanceL3");

const getAllPerformanceL3 = async (req, res) => {
  try {
    const performance = await performanceL3.find();
    res.status(200).json(performance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const getPerformanceL3ByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    const performance = await performanceL3.findOne({ teamId });
    if (!performance) {
      return res.status(404).json({ error: "Información no encontrada" });
    }
    res.status(200).json(performance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const createPerformanceL3 = async (req, res) => {
  try {
    const newPerformance = new performanceL3(req.body);
    await newPerformance.save();
    res.status(201).json(newPerformance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const deletePerformanceL3 = async (req, res) => {
  try {
    const { teamId } = req.params;
    const deletedPerformance = await performanceL3.findOneAndDelete({ teamId });
    if (!deletedPerformance) {
      return res.status(404).json({ error: "Información no encontrada" });
    }
    res.status(200).json({ message: "Información eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

module.exports = {
  getAllPerformanceL3,
  getPerformanceL3ByTeamId,
  createPerformanceL3,
  deletePerformanceL3,
};
