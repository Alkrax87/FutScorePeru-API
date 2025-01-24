const { validateDivisionForManagers } = require("../utils/validateDivision");

const getAllManagers = async (req, res) => {
  try {
    const { division } = req.params;
    const model = validateDivisionForManagers(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    let managers = await model.find();
    managers = managers.reverse();
    return res.status(200).json(managers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener Técnicos" });
  }
};

const getManagerByTeamId = async (req, res) => {
  try {
    const { division } = req.params;
    const { teamId } = req.params;
    const model = validateDivisionForManagers(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    let managers = await model.find({ teamId });
    managers = managers.reverse();
    if (managers.length === 0) {
      return res.status(404).json({ message: "Técnicos no encontrados" });
    }
    return res.status(200).json(managers);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener técnicos" });
  }
};

const createManager = async (req, res) => {
  try {
    const { division } = req.params;
    const model = validateDivisionForManagers(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const newManager = new model(req.body);
    await newManager.save();
    return res.status(201).json(newManager);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al crear un técnico" });
  }
};

const updateManagerByManagerId = async (req, res) => {
  try {
    const { division } = req.params;
    const model = validateDivisionForManagers(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const { managerId } = req.params;
    const updatedManager = await model.findOneAndUpdate(
      { managerId },
      req.body,
      { new: true }
    );
    if (!updatedManager) {
      return res.status(404).json({ message: "Técnico no encontrado" });
    }
    return res.status(200).json(updatedManager);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al actualizar el técnico" });
  }
};

const deleteManager = async (req, res) => {
  try {
    const { division } = req.params;
    const { teamId } = req.params;
    const model = validateDivisionForManagers(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const deletedManager = await model.findOneAndDelete({ teamId });
    if (!deletedManager) {
      return res.status(404).json({ message: "Técnico no encontrado" });
    }
    return res.status(204).json({ message: "Técnico eliminado correctamente" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al eliminar un técnicos" });
  }
};

module.exports = {
  getAllManagers,
  getManagerByTeamId,
  createManager,
  deleteManager,
  updateManagerByManagerId,
};