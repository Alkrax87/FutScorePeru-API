const TeamPerformance = require('../models/Performance');
const { computeTeamPerformance } = require('../utils/computeTeamPerformance');

module.exports.getTeamPerformancesByCategory = async (req, res) => {
  try {
    const teamPerformancesData = await TeamPerformance.find({ category: req.params.category }).select('-_id -category');

    return res.status(200).json(computeTeamPerformance(teamPerformancesData));
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Team Performances' });
  }
};

module.exports.getTeamPerformanceByTeamId = async (req, res) => {
  try {
    const teamPerformanceData = await TeamPerformance.findOne({ teamId: req.params.teamId }).select('-_id -category');

    if (teamPerformanceData) {
      return res.status(200).json(computeTeamPerformance(teamPerformanceData));
    }

    return res.status(404).json({ error: 'Team Performance not found' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Team Performance' });
  }
};

module.exports.createTeamPerformance = async (req, res) => {
  try {
    const newTeamPerformance = new TeamPerformance(req.body);
    await newTeamPerformance.save();

    return res.status(201).json({ message: 'Team Performance added successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Team Performance already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create Team Performance.' });
  }
};

module.exports.updateTeamPerformance = async (req, res) => {
  try {
    const updatedTeamPerformance = await TeamPerformance.findOneAndUpdate(
      { teamId: req.params.teamId },
      {
        $set: {
          teamId: req.body.teamId,
          category: req.body.category,
          phase1: req.body.phase1,
          phase2: req.body.phase2,
        },
      },
      { runValidators: true }
    );

    if (!updatedTeamPerformance) {
      return res.status(404).json({ error: 'Team Performance not found' });
    }

    return res.status(200).json({ message: 'Team Performance updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update Team Performance' });
  }
};

module.exports.deleteTeamPerformance = async (req, res) => {
  try {
    const deletedTeamPerformance = await TeamPerformance.findOneAndDelete({ teamId: req.params.teamId });

    if (!deletedTeamPerformance) {
      return res.status(404).json({ error: 'Team Performance not found' });
    }

    return res.status(200).json({ message: 'Team Performance deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete Team Performance' });
  }
};