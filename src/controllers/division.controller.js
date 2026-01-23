const Division = require('../models/Division');

module.exports.getDivisions = async (req, res) => {
  try {
    const divisionsData = await Division.find().select('-_id').sort({ category: 1 });

    return res.status(200).json(divisionsData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Divisions' });
  }
};

module.exports.getDivisionByCategory = async (req, res) => {
  try {
    const divisionData = await Division.findOne({ category: req.params.category }).select('-_id');

    if (divisionData) {
      return res.status(200).json(divisionData);
    }

    return res.status(404).json({ error: 'Division not found' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Division' });
  }
};

module.exports.createDivision = async (req, res) => {
  try {
    const newDivision = new Division(req.body);
    await newDivision.save();

    return res.status(201).json({ message: 'Division added successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Division already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create Division' });
  }
};

module.exports.updateDivision = async (req, res) => {
  try {
    const updatedDivision = await Division.findOneAndUpdate(
      { category: req.params.category },
      { $set: req.body },
      { runValidators: true },
    );

    if (!updatedDivision) {
      return res.status(404).json({ error: 'Division not found' });
    }

    return res.status(200).json({ message: 'Division updated successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Division already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: 'Failed to update Division' });
  }
};

module.exports.deleteDivision = async (req, res) => {
  try {
    const deletedDivision = await Division.findOneAndDelete({ category: req.params.category });

    if (!deletedDivision) {
      return res.status(400).json({ error: 'Division not found' });
    }

    return res.status(201).json({ message: 'Division deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete Division' });
  }
};