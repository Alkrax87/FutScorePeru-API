const TeamMatchResults = require('../models/TeamMatchResults');

const validPhase = (p) => !isNaN(p) && Number(p) > 0;

module.exports.getTeamMatchResultsByCategory = async (req, res) => {
  try {
    const teamMatchResultsData = await TeamMatchResults.find({ category: req.params.category }).select('-_id -category');

    return res.status(200).json(teamMatchResultsData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Team MatchResults' });
  }
};

module.exports.getTeamMatchResultsByTeamId = async (req, res) => {
  try {
    const teamMatchResultsData = await TeamMatchResults.findOne({ teamId: req.params.teamId }).select('-_id -category');

    if (teamMatchResultsData) {
      return res.status(200).json(teamMatchResultsData);
    }

    return res.status(404).json({ error: 'Team MatchResults not found' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Team MatchResults' });
  }
};

module.exports.createTeamMatchResults = async (req, res) => {
  try {
    const { teamId, category, phase1, phase2 } = req.body;

    if (!validPhase(phase1) || !validPhase(phase2)) {
      return res.status(400).json({ error: 'Phase must be a number greater than 0' });
    }

    doc = { teamId, category, phase1: Array(phase1).fill(null), phase2: Array(phase2).fill(null) };

    const newTeamMatchResults = new TeamMatchResults(doc);
    await newTeamMatchResults.save();

    return res.status(201).json({ message: 'Team MatchResults added successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Team MatchResults already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create Team MatchResults' });
  }
}

module.exports.updateTeamMatchResults = async (req, res) => {
  try {
    const { phase, index } = req.params;

    const updatedTeamMatchResults = await TeamMatchResults.findOne({ teamId: req.params.teamId });

    if (!updatedTeamMatchResults) {
      return res.status(404).json({ error: 'Team MatchResults not found' });
    }

    if (phase === '1') {
      updatedTeamMatchResults.phase1[index] = req.body.score;
    } else if (phase === '2') {
      updatedTeamMatchResults.phase2[index] = req.body.score;
    } else {
      return res.status(400).json({ error: 'Invalid phase' });
    }

    await updatedTeamMatchResults.save();
    return res.status(200).json({ message: 'Team MatchResults updated successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to update Team MatchResults' });
  }
};

module.exports.deleteTeamMatchResults = async (req, res) => {
  try {
    const deletedTeamMatchResults = await TeamMatchResults.findOneAndDelete({ teamId: req.params.teamId });

    if (!deletedTeamMatchResults) {
      return res.status(404).json({ error: 'Team MatchResults not found' });
    }

    return res.status(200).json({ message: 'Team MatchResults deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete Team MatchResults' });
  }
}