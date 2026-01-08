const TeamForm = require('../models/TeamForm');

const validOptions = ['w', 'd', 'l', 'r'];
const validPhase = (p) => !isNaN(p) && Number(p) > 0;

module.exports.getTeamFormsByCategory = async (req, res) => {
  try {
    const teamFormsData = await TeamForm.find({ category: req.params.category }).select('-_id -category');

    return res.status(200).json(teamFormsData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Team Forms' });
  }
};

module.exports.getTeamFormByTeamId = async (req, res) => {
  try {
    const teamFormData = await TeamForm.findOne({ teamId: req.params.teamId }).select('-_id -category');

    if (teamFormData) {
      return res.status(200).json(teamFormData);
    }

    return res.status(404).json({ error: 'Team Form not found' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Team Form' });
  }
};

module.exports.createTeamForm = async (req, res) => {
  try {
    const { teamId, category, phase1, phase2 } = req.body;

    if (!validPhase(phase1) || !validPhase(phase2)) {
      return res.status(400).json({ error: 'Phase must be a number greater than 0' });
    }

    doc = { teamId, category, phase1: Array(phase1).fill(''), phase2: Array(phase2).fill('') };

    const newTeamForm = new TeamForm(doc);
    await newTeamForm.save();

    return res.status(201).json({ message: 'Team Form added successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Team Form already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create Team Form.' });
  }
};

module.exports.updateTeamForm = async (req, res) => {
  try {
    const { phase, option } = req.params;

    if (!validOptions.includes(option)) {
      return res.status(400).json({ error: 'Invalid option' });
    }

    const valueToPush = option === 'r' ? '' : option;

    const updatedTeamForm = await TeamForm.findOne({ teamId: req.params.teamId });

    if (!updatedTeamForm) {
      return res.status(404).json({ error: 'Team Form not found' });
    }

    if (phase === '1') {
      updatedTeamForm.phase1.shift();
      updatedTeamForm.phase1.push(valueToPush);
    } else if (phase === '2') {
      updatedTeamForm.phase2.shift();
      updatedTeamForm.phase2.push(valueToPush);
    } else {
      return res.status(400).json({ error: 'Invalid phase' });
    }

    await updatedTeamForm.save();
    return res.status(200).json({ message: 'Team Form updated successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to update Team Form' });
  }
};

module.exports.deleteTeamForm = async (req, res) => {
  try {
    const deletedTeamForm = await TeamForm.findOneAndDelete({ teamId: req.params.teamId });

    if (!deletedTeamForm) {
      return res.status(404).json({ error: 'Team Form not found' });
    }

    return res.status(200).json({ message: 'Team Form deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete Team Form' });
  }
};