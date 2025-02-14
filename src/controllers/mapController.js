const Map = require("../models/Map");

const getMapElements = async (req, res) => {
  try {
    const mapData = await Map.findOne({
      category: req.params.category,
    }).select(
      "-_id"
    );

    if (!mapData) {
      return res.status(404).json({ error: "Category not found" });
    }

    return res.status(200).json(mapData.model);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener MapElements" });
  }
};

const changeMapElementStatus = async (req, res) => {
  const updatedMapData = await Map.findOne({
    category: req.params.category,
  })

  if (!updatedMapData) {
    return res.status(404).json({ error: "Category not found" });
  }

  const findedMapElement = updatedMapData.model.find((item) => item.mapId === req.params.mapId);

  if (!findedMapElement) {
    return res.status(404).json({ error: "MapId not found" });
  }

  findedMapElement.mapStatus = !findedMapElement.mapStatus;

  await updatedMapData.save();

  return res.status(200).json({ message: "Successfully updated map element" });
}

module.exports = {
  getMapElements,
  changeMapElementStatus,
};