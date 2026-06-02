const Cup = require('../models/Cup');

module.exports.getCups = async (req, res) => {
  try {
    const cupsData = await Cup.find().select('-_id');

    return res.status(200).json(cupsData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Cups' });
  }
};

module.exports.getCupByCupId = async (req, res) => {
  try {
    const cupData = await Cup.findOne({ cupId: req.params.cupId }).select('-_id');

    if (cupData) {
      return res.status(200).json(cupData);
    }

    return res.status(404).json({ error: 'Cup not found' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Cup' });
  }
};

module.exports.createCup = async (req, res) => {
  try {
    const { cupId, name, image, teams, groups } = req.body;

    nGroups = [];

    for (let index = 0; index < groups; index++) {
      nGroups.push({ name: `Grupo ${index + 1}`, teams: [] });
    }

    doc = { cupId, name, image, teams, groups: nGroups };

    const newCup = new Cup(doc);
    await newCup.save();

    return res.status(201).json({ message: 'Cup added successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Cup already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: 'Failed to create Cup' });
  }
};

module.exports.updateCup = async (req, res) => {
  try {
    const updatedCup = await Cup.findOneAndUpdate(
      { cupId: req.params.cupId },
      {
        $set: {
          cupId: req.body.cupId,
          name: req.body.name,
          image: req.body.image,
          teams: req.body.teams,
          groups: req.body.groups,
        },
      },
      { runValidators: true }
    );

    if (!updatedCup) {
      return res.status(404).json({ error: 'Cup not found' });
    }

    return res.status(200).json({ message: 'Cup updated successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: 'Failed to update Cup' });
  }
};

module.exports.deleteCup = async (req, res) => {
  try {
    const deletedCup = await Cup.findOneAndDelete({ cupId: req.params.cupId });

    if (!deletedCup) {
      return res.status(404).json({ error: 'Cup not found' });
    }

    return res.status(200).json({ message: 'Cup deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete Cup' });
  }
};