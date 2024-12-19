const lastGamesL3 = require("../models/lastGamesL3");

const getAllLastGamesL3 = async (req, res) => {
  try {
    const lastGames = await lastGamesL3.find();
    res.status(200).json(lastGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const getLastGamesL3ByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    const lastGames = await lastGamesL3.findOne({ teamId });
    if (!lastGames) {
      return res.status(404).json({ error: "Información no encontrada" });
    }
    res.status(200).json(lastGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const createLastGamesL3 = async (req, res) => {
  try {
    const newLastGames = new lastGamesL3(req.body);
    await newLastGames.save();
    res.status(201).json(newLastGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const changeLastGamesL3ByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { destination } = req.params;
    const { option } = req.params;
    let updatedLastGames = await lastGamesL3.findOne({ teamId });
    if (!updatedLastGames) {
      return res.status(404).json({ error: "Información no encontrada" });
    }
    if (["regular", "final"].includes(destination)) {
      if (["W", "D", "L", "R"].includes(option)) {
        const valueToPush = option === "R" ? "" : option;
        updatedLastGames[destination].splice(0, 1);
        updatedLastGames[destination].push(valueToPush);
      } else {
        return res
          .status(400)
          .json({ error: "Parámetro { option } no válido" });
      }
    } else {
      return res
        .status(400)
        .json({ error: "Parámetro { destination } no válido" });
    }
    await updatedLastGames.save();
    res.status(200).json(updatedLastGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const deleteLastGamesL3 = async (req, res) => {
  try {
    const { teamId } = req.params;
    const deletedLastGames = await lastGamesL3.findOneAndDelete({ teamId });
    if (!deletedLastGames) {
      return res.status(404).json({ error: "Información no encontrada" });
    }
    res.status(200).json({ message: "Información eliminada" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

module.exports = {
  getAllLastGamesL3,
  getLastGamesL3ByTeamId,
  createLastGamesL3,
  changeLastGamesL3ByTeamId,
  deleteLastGamesL3,
};
