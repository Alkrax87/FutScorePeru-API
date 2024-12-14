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

module.exports = {
  getAllStadiums,
  getStadiumsByStadiumId,
};
