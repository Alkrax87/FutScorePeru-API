const TeamL1 = require("../models/TeamL1");

const getAllTeamsL1 = async (req, res) => {
  try {
    const teams = await TeamL1.find();
    res.status(200).json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los equipos" });
  }
};

const getTeamL1ByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await TeamL1.findOne({ teamId });
    if (!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }
    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el equipo" });
  }
};

const createTeamL1 = async (req, res) => {
  try {
    const newTeam = await TeamL1.create(req.body);
    res.status(201).json(newTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el equipo" });
  }
};

const updateTeamL1 = async (req, res) => {
  try {
    const { teamId } = req.params;
    const updatedTeam = await TeamL1.findOneAndUpdate({ teamId });
    if (!updatedTeam) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }
    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el equipo" });
  }
};

const deleteTeamL1 = async (req, res) => {
  try {
    const { teamId } = req.params;
    const deletedTeam = await TeamL1.findOneAndDelete(
      { teamId },
      req.body,
      { new: true }
    );
    if (!deletedTeam) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }
    res.status(200).json({ message: "Equipo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el equipo" });
  }
};

module.exports = {
  getAllTeamsL1,
  getTeamL1ByTeamId,
  createTeamL1,
  updateTeamL1,
  deleteTeamL1,
};
