const { prepareDataForStatistics } = require("../utils/statisticsL1Calculator");
const { validateDivisionForPerformance } = require("../utils/validateDivision");

const getStatistics = async (req, res) => {
  try {
    const { division } = req.params;
    const model = validateDivisionForPerformance(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const resultsData = await model.find();
    const divisionStages = {
      l1: ["apertura", "clausura"],
      l2: ["regional", "grupos"],
      l3: ["regular", "final"],
    };
    const stages = divisionStages[division];
    const statistics = prepareDataForStatistics(resultsData, stages[0], stages[1]);
    return res.status(200).json(statistics);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener Estadísticas" });
  }
};

module.exports = {
  getStatistics,
};