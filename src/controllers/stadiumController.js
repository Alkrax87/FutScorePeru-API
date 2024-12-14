const Stadium = require("../models/Stadium");

const getAllStadiums = async (req, res) => {
  try {
    const stadiums = await Stadium.find();
    res.status(200).json(stadiums);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los estadios" });
  }
};

const getStadiumsByStadiumId = async (req, res) => {
  try {
    const { stadiumId } = req.params;
    const stadium = await Stadium.findOne({ stadiumId });
    if (!stadium) {
      return res.status(404).json({ message: "Estadio no encontrado" });
    }
    res.status(200).json(stadium);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener los estadios" });
  }
};

const createStadium = async (req, res) => {
  try {
    const newStadium = new Stadium(req.body);
    await newStadium.save();
    res.status(201).json(newStadium);
  } catch (error) {
    console.error("Error al crear el estadio:", error);
    res.status(500).json({ message: "Error al crear el estadio" });
  }
};

const updateStadium = async (req, res) => {
  try {
    const { stadiumId } = req.params;
    const updatedTeam = await Stadium.findOneAndUpdate(
      { stadiumId },
      req.body,
      { new: true }
    );
    if (!updatedTeam) {
      return res.status(404).json({ message: "Estadio no encontrado" });
    }
    res.status(200).json(updatedTeam);
  } catch (error) {
    console.error("Error al actualizar el estadio:", error);
    res.status(500).json({ message: "Error al actualizar el estadio" });
  }
};

const deleteStadium = async (req, res) => {
  try {
    const { stadiumId } = req.params;
    const deletedStadium = await Stadium.findOneAndDelete({ stadiumId });
    if (!deletedStadium) {
      return res.status(404).json({ message: "Estadio no encontrado" });
    }
    res.status(200).json({ message: "Estadio eliminado correctamente" });
  } catch (error) {
    console.error("Error al elimnar el estadio:", error);
    res.status(500).json({ message: "Error al elimnar el estadio" });
  }
};

module.exports = {
  getAllStadiums,
  getStadiumsByStadiumId,
  createStadium,
  deleteStadium,
  updateStadium,
};
