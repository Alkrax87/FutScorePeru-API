const ResultsL2 = require("../models/resultsL2");

const getAllResultsL2 = async (req, res) => {
  try {
    const results = await ResultsL2.find();
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const getResultsL2ByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    const results = await ResultsL2.findOne({ teamId });
    if (!results) {
      return res.status(404).json({ error: "Información no encontrada" });
    }
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const createResultsL2 = async (req, res) => {
  try {
    const newResults = new ResultsL2(req.body);
    await newResults.save();
    res.status(201).json(newResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const deleteResultsL2 = async (req, res) => {
  try {
    const { teamId } = req.params;
    const deletedResults = await ResultsL2.findOneAndDelete({ teamId });
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
  getAllResultsL2,
  getResultsL2ByTeamId,
  createResultsL2,
  deleteResultsL2,
};
