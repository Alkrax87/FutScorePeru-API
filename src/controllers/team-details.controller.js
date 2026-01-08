const TeamDetails = require('../models/TeamDetails');

module.exports.getAllTeamDetails = async (req, res) => {
  try {
    const teamDetailsData = await TeamDetails.find().select('-_id');

    return res.status(200).json(teamDetailsData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Team Details' });
  }
};

module.exports.getTeamDetailsByTeamId = async (req, res) => {
  try {
    const teamDetailsData = await TeamDetails.findOne({ teamId: req.params.teamId }).select('-_id');

    if (teamDetailsData) {
      return res.status(200).json(teamDetailsData);
    }

    return res.status(404).json({ error: 'Team Details not found' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Team Details' });
  }
};

module.exports.createTeamDetails = async (req, res) => {
  try {
    const newTeamDetails = new TeamDetails(req.body);
    await newTeamDetails.save();

    return res.status(201).json({ message: 'Team Details added successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Team Details already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create Team Details' });
  }
};

module.exports.updateTeamDetails = async (req, res) => {
  try {
    const updatedTeamDetails = await TeamDetails.findOneAndUpdate(
      { teamId: req.params.teamId },
      {
        $set: {
          teamId: req.body.teamId,
          description: req.body.description,
          founded: req.body.founded,
          website: req.body.website,
          social: req.body.social,
        },
      },
      { runValidators: true }
    );

    if (!updatedTeamDetails) {
      return res.status(404).json({ error: 'Team Details not found' });
    }

    return res.status(200).json({ message: 'Team Details updated successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Team Details already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to update Team Details' });
  }
};

module.exports.deleteTeamDetails = async (req, res) => {
  try {
    const deletedTeamDetails = await TeamDetails.findOneAndDelete({ teamId: req.params.teamId });

    if (!deletedTeamDetails) {
      return res.status(404).json({ error: 'Team Details not found' });
    }

    return res.status(200).json({ message: 'Team Details deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete Team Details' });
  }
};