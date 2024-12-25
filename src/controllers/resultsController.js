const { validateDivisionForResults } = require("../utils/validateDivision");

const getAllResults = async (req, res) => {
  try {
    const { division } = req.params;
    const model = validateDivisionForResults(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const resultsData = await model.find();
    return res.status(200).json(resultsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
};

const getAllResultsById = async (req, res) => {
  try {
    const { division } = req.params;
    const { teamId } = req.params;
    const model = validateDivisionForResults(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const result = await model.findOne({ teamId });
    if (!result) {
      return res.status(404).json({ error: `Información para "${teamId}" no encontrada` });
    }
    return res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
};

const createResult = async (req, res) => {
  try {
    const { division } = req.params;
    const model = validateDivisionForResults(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const newResult = new model(req.body);
    await newResult.save();
    return res.status(200).json(newResult);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
};

const deleteResult = async (req, res) => {
  try {
    const { division } = req.params;
    const { teamId } = req.params;
    const model = validateDivisionForResults(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const deletedResult = await model.findOneAndDelete({ teamId });
    if (!deletedResult) {
      return res.status(404).json({ error: "Información no encontrada" });
    }
    return res.status(200).json({ message: "Información eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
};

module.exports = {
  getAllResults,
  getAllResultsById,
  createResult,
  deleteResult,
};