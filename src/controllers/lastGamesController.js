const Team = require("../models/Team");

const getLastGames = async (req, res) => {
  try {
    const lastGamesData = await Team.find({
      category: req.params.category,
    }).select(
      "-_id teamId lastgames"
    );

    if (lastGamesData.length > 0) {
      const constructedData = lastGamesData.map((item) => {
        const lastGameItem = { teamId: item.teamId };
        item.lastgames.forEach((element) => {
          lastGameItem[element.name] = element.values;
        });
        return lastGameItem;
      });

      return res.status(200).json(constructedData);
    } else {
      return res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving all last games" });
  }
};

const getLastGamesByTeamId = async (req, res) => {
  try {
    const lastGamesData = await Team.findOne({
      category: req.params.category,
      teamId: req.params.teamId,
    }).select(
      "-_id teamId lastgames"
    );

    if (!lastGamesData) {
      return res.status(404).json({ error: "Last Games not found" });
    }

    const constructedData = { teamId: lastGamesData.teamId };
    lastGamesData.lastgames.forEach((element) => {
      constructedData[element.name] = element.values;
    });

    return res.status(200).json(constructedData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving last games" });
  }
};

const changeLastGamesByTeamId = async (req, res) => {
  try {
    const { destination, option } = req.params;

    const validDestinations = ["apertura", "clausura", "regional", "grupos", "regular", "final"];
    const validOptions = ["w", "d", "l", "r"];

    if (!validDestinations.includes(destination)) {
      return res.status(400).json({ error: "Invalid destination" });
    }

    if (!validOptions.includes(option)) {
      return res.status(400).json({ error: "Invalid option" });
    }

    const valueToPush = option === "r" ? "" : option;

    const updatedLastGames = await Team.findOne({
      category: req.params.category,
      teamId: req.params.teamId,
    });

    if (!updatedLastGames) {
      return res.status(404).json({ error: "Last Games not found" });
    }

    const findedDestination = updatedLastGames.lastgames.find((item) => item.name === destination);

    if (!findedDestination) {
      return res.status(404).json({ error: "Destination not found in last games" });
    }

    findedDestination.values.shift();
    findedDestination.values.push(valueToPush);

    await updatedLastGames.save();

    return res.status(200).json({ message: "Successfully updated last games" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update last games" });
  }
};

module.exports = {
  getLastGames,
  getLastGamesByTeamId,
  changeLastGamesByTeamId,
};