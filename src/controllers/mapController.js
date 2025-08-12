const Map = require('../models/Map');

const getMaps = async (req, res) => {
  try {
    const mapsData = await Map.find().select('-_id');

    if (!mapsData) {
      return res.status(404).json({ error: 'Maps not found' });
    }

    return res.status(200).json(mapsData);
  } catch (error) {
    console.error(error.error);
    return res.status(500).json({ message: 'Error retrieving Maps' });
  }
}

const getMapByCategory = async (req, res) => {
  try {
    const mapData = await Map.findOne({
      category: req.params.category,
    }).select(
      '-_id'
    );

    if (!mapData) {
      return res.status(404).json({ error: 'Map not found' });
    }

    return res.status(200).json(mapData.model);
  } catch (error) {
    console.error(error.error);
    return res.status(500).json({ message: 'Error retrieving Map' });
  }
};

const changeMapElementStatus = async (req, res) => {
  try {
    const updatedMapData = await Map.findOne({
      category: req.params.category,
    });

    if (!updatedMapData) {
      return res.status(404).json({ error: 'Category not found' });
    }

    const findedMapElement = updatedMapData.model.find(
      (item) => item.mapId === req.params.mapId
    );

    if (!findedMapElement) {
      return res.status(404).json({ error: 'MapId not found' });
    }

    findedMapElement.mapStatus = req.body.mapStatus;

    await updatedMapData.save();

    return res.status(200).json({ message: 'Map updated successfully' });
  } catch (error) {
    console.error(error.error);
    return res.status(500).json({ message: 'Failed to update Map' });
  }
};

module.exports = {
  getMaps,
  getMapByCategory,
  changeMapElementStatus,
};