const ResultsL3 = require("../models/resultsL3");

const getAllResultsL3 = async (req, res) => {
  try {
    const results = await ResultsL3.find();
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const getResultsL3ByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    const results = await ResultsL3.findOne({ teamId });
    if (!results) {
      return res.status(404).json({ error: "Información no encontrada" });
    }
    res.status(200).json(results);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const createResultsL3 = async (req, res) => {
  try {
    const newResults = new ResultsL3(req.body);
    await newResults.save();
    res.status(201).json(newResults);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const deleteResultsL3 = async (req, res) => {
  try {
    const { teamId } = req.params;
    const deletedResults = await ResultsL3.findOneAndDelete({ teamId });
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
  getAllResultsL3,
  getResultsL3ByTeamId,
  createResultsL3,
  deleteResultsL3,
};
