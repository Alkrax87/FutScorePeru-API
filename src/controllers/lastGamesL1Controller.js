const lastGamesL1 = require("../models/lastGamesL1");

const getAllLastGamesL1 = async (req, res) => {
  try {
    const lastGames = await lastGamesL1.find();
    res.status(200).json(lastGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const getLastGamesL1ByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    const lastGames = await lastGamesL1.findOne({ teamId });
    if (!lastGames) {
      return res.status(404).json({ error: "Información no encontrada" });
    }
    res.status(200).json(lastGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const createLastGamesL1 = async (req, res) => {
  try {
    const newLastGames = new lastGamesL1(req.body);
    await newLastGames.save();
    res.status(201).json(newLastGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener la información" });
  }
};

const changeLastGamesL1ByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    const { destination } = req.params;
    const { option } = req.params;
    let updatedLastGames = await lastGamesL1.findOne({ teamId });
    if (!updatedLastGames) {
      return res.status(404).json({ error: "Información no encontrada" });
    }
    if (["apertura", "clausura"].includes(destination)) {
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

const deleteLastGamesL1 = async (req, res) => {
  try {
    const { teamId } = req.params;
    const deletedLastGames = await lastGamesL1.findOneAndDelete({ teamId });
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
  getAllLastGamesL1,
  getLastGamesL1ByTeamId,
  createLastGamesL1,
  changeLastGamesL1ByTeamId,
  deleteLastGamesL1,
};
