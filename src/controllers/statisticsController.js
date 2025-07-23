const Performance = require("../models/Performance");
const { calculatePerformance } = require("../utils/performanceCalculator");
const { prepareDataForStatistics } = require("../utils/statisticsCalculator");

const getStatisticsByCategory = async (req, res) => {
  try {
    const performanceData = await Performance.find({
      category: req.params.category,
    }).select("-_id");

    if (performanceData.length > 0) {
      const divisionStages = {
        1: ["apertura", "clausura"],
        2: ["regional", "grupos"],
        3: ["regional", "final"],
      };

      const stages = divisionStages[req.params.category];

      const calculatedPerformance = calculatePerformance(performanceData, stages[0], stages[1]);

      const statistics = prepareDataForStatistics(calculatedPerformance, stages[0], stages[1]);

      return res.status(200).json(statistics);
    } else {
      return res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: "Error retrieving statistics" });
  }
};

module.exports = {
  getStatisticsByCategory,
};