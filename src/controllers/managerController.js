const Manager = require("../models/Manager");

const getAllManagers = async (req, res) => {
  try {
    let managers = await Manager.find();
    managers = managers.reverse();
    res.status(200).json(managers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener Técnicos" });
  }
};

const getManagerByTeamId = async (req, res) => {
  try {
    const { teamId } = req.params;
    let managers = await Manager.find({ teamId });
    managers = managers.reverse();
    if (!managers) {
      return res.status(404).json({ message: "Técnicos no encontrados" });
    }
    res.status(200).json(managers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener técnicos" });
  }
};

const createManager = async (req, res) => {
  try {
    const newManager = new Manager(req.body);
    await newManager.save();
    res.status(201).json(newManager);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear un técnicos" });
  }
};

const updateManagerByManagerId = async (req, res) => {
  try {
    const { managerId } = req.params;
    const updatedManager = await Manager.findOneAndUpdate(
      { managerId },
      req.body,
      { new: true }
    );
    if (!updatedManager) {
      return res.status(404).json({ message: "Técnico no encontrado" });
    }
    res.status(200).json(updatedManager);
  } catch (error) {
    console.error("Error al actualizar el técnico:", error);
    res.status(500).json({ message: "Error al actualizar el técnico" });
  }
};

const deleteManager = async (req, res) => {
  try {
    const { teamId } = req.params;
    const deletedManager = await Manager.findOneAndDelete({ teamId });
    if (!deletedManager) {
      return res.status(404).json({ message: "Técnico no encontrado" });
    }
    res.status(200).json({ message: "Técnico eliminado correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar un técnicos" });
  }
};

module.exports = {
  getAllManagers,
  getManagerByTeamId,
  createManager,
  deleteManager,
  updateManagerByManagerId,
};
