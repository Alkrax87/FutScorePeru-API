const Manager = require('../models/Manager');

const getManagers = async (req, res) => {
  try {
    const managersData = await Manager.find().select('-_id');

    if (managersData.length > 0) {
      return res.status(200).json(managersData.reverse());
    } else {
      return res.status(404).json({ error: 'Managers not found' });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Managers' });
  }
};

const getManagersByCategory = async (req, res) => {
  try {
    const managersData = await Manager.find({
      category: req.params.category,
    }).select(
      '-_id'
    );

    if (managersData.length > 0) {
      return res.status(200).json(managersData.reverse());
    } else {
      return res.status(404).json({ error: 'Managers not found' });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Managers' });
  }
};

const getManagersByTeamId = async (req, res) => {
  try {
    const managersData = await Manager.find({
      teamId: req.params.teamId,
    }).select(
      '-_id'
    );

    if (managersData.length > 0) {
      return res.status(200).json(managersData.reverse());
    } else {
      return res.status(404).json({ error: 'Managers not found' });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Managers' });
  }
};

const createManager = async (req, res) => {
  try {
    const existingManager = await Manager.findOne({
      managerId: req.body.managerId,
    });

    if (existingManager) {
      return res.status(400).json({ error: 'Manager already exists' });
    }

    const newManager = new Manager(req.body);
    await newManager.save();

    return res.status(201).json({ message: 'Manager added successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create Manager' });
  }
};

const updateManager = async (req, res) => {
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
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to update Manager' });
  }
};

const deleteManager = async (req, res) => {
  try {
    const deletedManager = await Manager.findOneAndDelete({
      managerId: req.params.managerId,
    });

    if (!deletedManager) {
      return res.status(404).json({ error: 'Manager not found' });
    }

    return res.status(200).json({ message: 'Manager deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete Manager' });
  }
};

module.exports = {
  getManagers,
  getManagersByCategory,
  getManagersByTeamId,
  createManager,
  updateManager,
  deleteManager,
};