const Manager = require('../models/Manager');

module.exports.getAllManagers = async (req, res) => {
  try {
    const managersData = await Manager.find().select('-_id').sort({ managerId: -1 });

    return res.status(200).json(managersData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Managers' });
  }
};

module.exports.getManagersByCategory = async (req, res) => {
  try {
    const managersData = await Manager.find({ category: req.params.category }).select('-_id').sort({ managerId: -1 });

    return res.status(200).json(managersData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Managers' });
  }
};

module.exports.createManager = async (req, res) => {
  try {
    const newManager = new Manager(req.body);
    await newManager.save();

    return res.status(201).json({ message: 'Manager added successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Manager already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create Manager' });
  }
};

module.exports.updateManager = async (req, res) => {
  try {
    const updatedManager = await Manager.findOneAndUpdate(
      { managerId: req.params.managerId },
      {
        $set: {
          managerId: req.body.managerId,
          category: req.body.category,
          teamId: req.body.teamId,
          name: req.body.name,
          cod: req.body.cod,
          photo: req.body.photo,
        },
      },
      { runValidators: true }
    );

    if (!updatedManager) {
      return res.status(404).json({ error: 'Manager not found' });
    }

    return res.status(200).json({ message: 'Manager updated successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Manager already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to update Manager' });
  }
};

module.exports.deleteManager = async (req, res) => {
  try {
    const deletedManager = await Manager.findOneAndDelete({ managerId: req.params.managerId });

    if (!deletedManager) {
      return res.status(404).json({ error: 'Manager not found' });
    }

    return res.status(200).json({ message: 'Manager deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete Manager' });
  }
};