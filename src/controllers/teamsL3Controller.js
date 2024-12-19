const TeamL3 = require("../models/TeamL3");

const getAllTeamsL3 = async (req, res) => {
  try {
    const teams = await TeamL3.find();
    res.status(200).json(teams);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los equipos" });
  }
};

const getTeamL3ByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    const team = await TeamL3.findOne({ teamId });
    if (!team) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }
    res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener el equipo" });
  }
};

const createTeamL3 = async (req, res) => {
  try {
    const newTeam = await TeamL3.create(req.body);
    res.status(201).json(newTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el equipo" });
  }
};

const updateTeamL3 = async (req, res) => {
  try {
    const { teamId } = req.params;
    const updatedTeam = await TeamL3.findOneAndUpdate({ teamId });
    if (!updatedTeam) {
      return res.status(404).json({ message: "Equipo no encontrado" });
    }
    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el equipo" });
  }
};

const deleteTeamL3 = async (req, res) => {
  try {
    const { teamId } = req.params;
    const deletedTeam = await TeamL3.findOneAndDelete(
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
  getAllTeamsL3,
  getTeamL3ByTeamId,
  createTeamL3,
  updateTeamL3,
  deleteTeamL3
};
