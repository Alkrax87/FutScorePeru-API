const Team = require("../models/Team");

const getResults = async (req, res) => {
  try {
    const resultsData = await Team.find({
      category: req.params.category,
    }).select(
      "-_id teamId results"
    );

    if (resultsData.length > 0) {
      const constructedData = resultsData.map((item) => {
        const resultsItem = {  teamId: item.teamId };
        item.results.forEach((element => {
          resultsItem[element.name] = element.score;
        }));
        return resultsItem;
      });

      return res.status(200).json(constructedData);
    } else {
      return res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving all results" });
  }
};

const getResultsByTeamId = async (req, res) => {
  try {
    const resultsData = await Team.findOne({
      category: req.params.category,
      teamId: req.params.teamId,
    }).select(
      "-_id teamId results"
    );

    if (!resultsData) {
      return res.status(404).json({ error: "Results not found" });
    }

    const constructedData = { teamId: resultsData.teamId };
    resultsData.results.forEach((element) => {
      constructedData[element.name] = element.score;
    });

    return res.status(200).json(constructedData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving results" });
  }
};

const changeResultsByTeamId = async (req, res) => {
  try {
    const { destination, index } = req.params;

    const validDestinations = ["apertura", "clausura", "regional", "grupos", "regular", "final"];

    if (!validDestinations.includes(destination)) {
      return res.status(400).json({ error: "Invalid destination" });
    }

    const newValue = req.body.score;

    const updatedResults = await Team.findOne({
      category: req.params.category,
      teamId: req.params.teamId,
    });

    if (!updatedResults) {
      return res.status(404).json({ error: "Results not found" });
    }

    const findedResults = updatedResults.results.find((item) => item.name === req.params.destination);

    if (!findedResults) {
      return res.status(404).json({ error: "Destination not found in results" });
    }

    findedResults.score[index - 1] = newValue;

    await updatedResults.save();

    return res.status(200).json({ message: "Successfully updated results" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update results" });
  }
}

module.exports = {
  getResults,
  getResultsByTeamId,
  changeResultsByTeamId,
};