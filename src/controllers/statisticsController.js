const Team = require("../models/Team");
const { calculatePerformance } = require("../utils/performanceCalculator");
const { prepareDataForStatistics } = require("../utils/statisticsCalculator");

const getStatistics = async (req, res) => {
  try {
    const performanceData = await Team.find({
      category: req.params.category,
    }).select(
      "-_id teamId performance"
    );

    if (performanceData.length > 0) {
      const constructedData = performanceData.map((item) => {
        const performanceItem = { teamId: item.teamId };
        item.performance.forEach((element => {
          performanceItem[element.name] = {
            pg: element.pg,
            pe: element.pe,
            pp: element.pp,
            gf: element.gf,
            gc: element.gc,
            sanction: element.sanction,
          }
        }));
        return performanceItem;
      });

      const divisionStages = {
        1: ["apertura", "clausura"],
        2: ["regional", "grupos"],
        3: ["regular", "final"],
      };

      const stages = divisionStages[req.params.category];

      const calculatedPerformance = calculatePerformance(constructedData, stages[0], stages[1]);

      const statistics = prepareDataForStatistics(calculatedPerformance, stages[0], stages[1]);

      return res.status(200).json(statistics);
    } else {
      return res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving statistics" });
  }
};

module.exports = {
  getStatistics,
};