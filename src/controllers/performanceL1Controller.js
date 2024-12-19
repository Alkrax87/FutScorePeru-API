const performanceL1 = require("../models/performanceL1");

const getAllPerformanceL1 = async (req, res) => {
  try {
    const performance = await performanceL1.find();
    res.status(200).json(performance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const getPerformanceL1ByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    const performance = await performance.findOne({ teamId });
    if (!performance) {
      return res.status(404).json({ error: "Información no encontrada" });
    }
    res.status(200).json(performance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const createPerformanceL1 = async (req, res) => {
  try {
    const newPerformance = new performanceL1(req.body);
    await newPerformance.save();
    res.status(201).json(newPerformance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const deletePerformanceL1 = async (req, res) => {
  try {
    const { teamId } = req.params;
    const deletedPerformance = await performanceL1.findOneAndDelete({ teamId });
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
  getAllPerformanceL1,
  getPerformanceL1ByTeamId,
  createPerformanceL1,
  deletePerformanceL1,
};
