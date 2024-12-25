const { validateDivisionForTeams } = require("../utils/validateDivision");

const getAllTeams = async (req, res) => {
  try {
    const { division } = req.params;
    const model = validateDivisionForTeams(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const teamsData = await model.find();
    return res.status(200).json(teamsData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
};

const getTeamById = async (req, res) => {
  try {
    const { division } = req.params;
    const { teamId } = req.params;
    const model = validateDivisionForTeams(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const team = await model.findOne({ teamId });
    if (!team) {
      return res.status(404).json({ error: `Equipo no encontrado para el teamId "${teamId}"` });
    }
    return res.status(200).json(team);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
};

const createTeam = async (req, res) => {
  try {
    const { division } = req.params;
    const model = validateDivisionForTeams(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const newTeam = new model(req.body);
    await newTeam.save();
    return res.status(201).json(newTeam);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const { division } = req.params;
    const { teamId } = req.params;
    const model = validateDivisionForTeams(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const deletedTeam = await model.findOneAndDelete({ teamId });
    if (!deletedTeam) {
      return res.status(404).json({ error: "Equipo no encontrado" });
    }
    return res.status(204).json({ message: "Equipo eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
};

module.exports = {
  getAllTeams,
  getTeamById,
  createTeam,
  deleteTeam,
};