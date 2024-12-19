const performanceL2 = require("../models/performanceL2");

const getAllPerformanceL2 = async (req, res) => {
  try {
    const performance = await performanceL2.find();
    res.status(200).json(performance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const getPerformanceL2ByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    const performance = await performanceL2.findOne({ teamId });
    if (!performance) {
      return res.status(404).json({ error: "Información no encontrada" });
    }
    res.status(200).json(performance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const createPerformanceL2 = async (req, res) => {
  try {
    const newPerformance = new performanceL2(req.body);
    await newPerformance.save();
    res.status(201).json(newPerformance);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const deletePerformanceL2 = async (req, res) => {
  try {
    const { teamId } = req.params;
    const deletedPerformance = await performanceL2.findOneAndDelete({ teamId });
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
  getAllPerformanceL2,
  getPerformanceL2ByTeamId,
  createPerformanceL2,
  deletePerformanceL2,
};
