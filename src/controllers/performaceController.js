const { validateDivisionForPerformance } = require("../utils/validateDivision");

const getAllPerformance = async (req, res) => {
  try {
    const { division } = req.params;
    const model = validateDivisionForPerformance(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const performanceData = await model.find();
    return res.status(200).json(performanceData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
};

const getAllPerformanceById = async (req, res) => {
  try {
    const { division } = req.params;
    const { teamId } = req.params;
    const model = validateDivisionForPerformance(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const performance = await model.findOne({ teamId });
    if (!performance) {
      return res.status(404).json({ error: `Información para "${teamId}" no encontrada` });
    }
    return res.status(200).json(performance);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
}

const createPerformance = async (req, res) => {
  try {
    const { division } = req.params;
    const model = validateDivisionForPerformance(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const newPerformance = new model(req.body);
    await newPerformance.save();
    return res.status(201).json(newPerformance);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
}

const deletePerformance = async (req, res) => {
  try {
    const { division } = req.params;
    const { teamId } = req.params;
    const model = validateDivisionForPerformance(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const deletePerformance = await model.findOneAndDelete({ teamId });
    if (!deletePerformance) {
      return res.status(404).json({ error: "Información no encontrada" });
    }
    return res.status(204).json({ message: "Información eliminada correctamente"})
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
}

module.exports = {
  getAllPerformance,
  getAllPerformanceById,
  createPerformance,
  deletePerformance,
};