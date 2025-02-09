const { validateDivisionForPerformance } = require("../utils/validateDivision");
const { calculatePerformance } = require("../utils/performanceCalculator");

const getAllPerformance = async (req, res) => {
  try {
    const { division } = req.params;
    const model = validateDivisionForPerformance(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const resultsData = await model.find();
    const divisionStages = {
      l1: ["apertura", "clausura", "acumulado"],
      l2: ["regional", "grupos"],
      l3: ["regular", "final"],
    };
    const stages = divisionStages[division];
    const performanceData = calculatePerformance(resultsData, stages[0], stages[1], stages[2]);
    return res.status(200).json(performanceData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
};

const getPerformanceByTeamId = async (req, res) => {
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
  getPerformanceByTeamId,
  createPerformance,
  deletePerformance,
};