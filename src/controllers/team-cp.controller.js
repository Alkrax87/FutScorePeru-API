const TeamCP = require('../models/TeamCP');

module.exports.getTeamsCP = async (req, res) => {
  try {
    const teamsCPData = await TeamCP.find().select('-_id').sort({ name: 1 });

    return res.status(200).json(teamsCPData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Teams (Copa Perú)' });
  }
};

module.exports.getTeamCPByTeamId = async (req, res) => {
  try {
    const teamCPData = await TeamCP.findOne({ teamId: req.params.teamId }).select('-_id');

    if (teamCPData) {
      return res.status(200).json(teamCPData);
    }

    return res.status(404).json({ error: 'Team (Copa Perú) not found' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Team (Copa Perú)' });
  }
};

module.exports.createTeamCP = async (req, res) => {
  try {
    const newTeamCP = new TeamCP(req.body);
    await newTeamCP.save();

    return res.status(201).json({ message: 'Team (Copa Perú) added successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Team (Copa Perú) already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create Team (Copa Perú)' });
  }
};

module.exports.updateTeamCP = async (req, res) => {
  try {
    const updatedTeamCP = await TeamCP.findOneAndUpdate(
      { teamId: req.params.teamId },
      {
        $set: {
          teamId: req.body.teamId,
          name: req.body.name,
          abbreviation: req.body.abbreviation,
          image: req.body.image,
          location: req.body.location,
          city: req.body.city,
        },
      },
      { runValidators: true }
    );

    if (!updatedTeamCP) {
      return res.status(404).json({ error: 'Team (Copa Perú) not found' });
    }

    return res.status(200).json({ message: 'Team (Copa Perú) updated successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Team (Copa Perú) already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to update Team (Copa Perú)' });
  }
};

module.exports.deleteTeamCP = async (req, res) => {
  try {
    const deletedTeamCP = await TeamCP.findOneAndDelete({ teamId: req.params.teamId });

    if (!deletedTeamCP) {
      return res.status(404).json({ error: 'Team (Copa Perú) not found' });
    }

    return res.status(200).json({ message: 'Team (Copa Perú) deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete Team (Copa Perú)' });
  }
};