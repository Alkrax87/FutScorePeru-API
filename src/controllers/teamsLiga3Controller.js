const TeamLiga3 = require("../models/TeamLiga3");

const getAllTeams = async (req, res) => {
  try {
    const teams = await TeamLiga3.find();
    res.status(200).json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los equipos" });
  }
};

const getTeamByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await TeamLiga3.findOne({ teamId });
    if (!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }
    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el equipo" });
  }
};

const createTeam = async (req, res) => {
  try {
    const newTeam = await TeamLiga3.create(req.body);
    res.status(201).json(newTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el equipo" });
  }
};

const updateTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const updatedTeam = await TeamLiga3.findOneAndUpdate({ teamId });
    if (!updatedTeam) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }
    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el equipo" });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { teamId } = req.params;
    const deletedTeam = await TeamLiga3.findOneAndDelete(
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
  getAllTeams,
  getTeamByTeamId,
  createTeam,
  updateTeam,
  deleteTeam,
};
