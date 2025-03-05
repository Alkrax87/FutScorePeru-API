const Team = require("../models/Team");
const { calculatePerformance } = require("../utils/performanceCalculator");

const getPerformance = async (req, res) => {
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
        1: ["apertura", "clausura", "acumulado"],
        2: ["regional", "grupos"],
        3: ["regional", "final"],
      };

      const stages = divisionStages[req.params.category];

      const calculatedPerformance = calculatePerformance(constructedData, stages[0], stages[1], stages[2]);

      return res.status(200).json(calculatedPerformance);
    } else {
      return res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving all performance" });
  }
};

const getPerformanceByTeamId = async (req, res) => {
  try {
    const performanceData = await Team.findOne({
      category: req.params.category,
      teamId: req.params.teamId,
    }).select(
      "-_id teamId performance"
    );

    if (!performanceData) {
      return res.status(404).json({ error: "Performance not found" });
    }

    const constructedData = { teamId: performanceData.teamId };
    performanceData.performance.forEach((element) => {
      constructedData[element.name] = {
        pg: element.pg,
        pe: element.pe,
        pp: element.pp,
        gf: element.gf,
        gc: element.gc,
        sanction: element.sanction,
      }
    });

    const divisionStages = {
      1: ["apertura", "clausura", "acumulado"],
      2: ["regional", "grupos"],
      3: ["regional", "final"],
    };

    const stages = divisionStages[req.params.category];

    const calculatedPerformance = calculatePerformance(constructedData, stages[0], stages[1], stages[2]);

    return res.status(200).json(calculatedPerformance[0]);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving performance" });
  }
}

const changePerformanceByTeamId = async (req, res) => {
  try {
    const { destination } = req.params;

    const validDestinations = ["apertura", "clausura", "regional", "grupos", "final"];

    if (!validDestinations.includes(destination)) {
      return res.status(400).json({ error: "Invalid destination" });
    }

    const updatedPerformance = await Team.findOne({
      category: req.params.category,
      teamId: req.params.teamId,
    });

    if (!updatedPerformance) {
      return res.status(404).json({ error: "Performance not found" });
    }

    const findedPerformance = updatedPerformance.performance.find((item) => item.name === destination);

    if (!findedPerformance) {
      return res.status(404).json({ error: "Destination not found in performance" });
    }

    findedPerformance.pg = req.body.pg ?? findedPerformance.pg;
    findedPerformance.pe = req.body.pe ?? findedPerformance.pe;
    findedPerformance.pp = req.body.pp ?? findedPerformance.pp;
    findedPerformance.gf = req.body.gf ?? findedPerformance.gf;
    findedPerformance.gc = req.body.gc ?? findedPerformance.gc;
    findedPerformance.sanction = req.body.sanction ?? findedPerformance.sanction;
    findedPerformance.addition = req.body.addition ?? findedPerformance.addition;

    await updatedPerformance.save();

    return res.status(200).json({ message: "Successfully updated performance" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update performance" });
  }
}

module.exports = {
  getPerformance,
  getPerformanceByTeamId,
  changePerformanceByTeamId
};