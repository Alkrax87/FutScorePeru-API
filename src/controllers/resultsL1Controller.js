const ResultsL1 = require("../models/resultsL1");

const getAllResultsL1 = async (req, res) => {
  try {
    const results = await ResultsL1.find();
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const getResultsL1ByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    const results = await ResultsL1.findOne({ teamId });
    if (!results) {
      return res.status(404).json({ error: "Información no encontrada" });
    }
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const createResultsL1 = async (req, res) => {
  try {
    const newResults = new ResultsL1(req.body);
    await newResults.save();
    res.status(201).json(newResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const deleteResultsL1 = async (req, res) => {
  try {
    const { teamId } = req.params;
    const deletedResults = await ResultsL1.findOneAndDelete({ teamId });
    if (!deletedResults) {
      return res.status(404).json({ error: "Información no encontrada" });
    }
    res.status(200).json({ message: "Información eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

module.exports = {
  getAllResultsL1,
  getResultsL1ByTeamId,
  createResultsL1,
  deleteResultsL1,
};
