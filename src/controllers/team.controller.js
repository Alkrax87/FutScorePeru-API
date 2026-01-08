const Team = require('../models/Team');

module.exports.getAllTeams = async (req, res) => {
  try {
    const teamsData = await Team.find().select('-_id').sort({ category: 1, name: 1 });

    return res.status(200).json(teamsData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Teams' });
  }
};

module.exports.getTeamsByCategory = async (req, res) => {
  try {
    const teamsData = await Team.find({ category: req.params.category }).select('-_id').sort({ name: 1 });

    return res.status(200).json(teamsData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Teams' });
  }
};

module.exports.getTeamByTeamId = async (req, res) => {
  try {
    const teamData = await Team.findOne({ teamId: req.params.teamId }).select('-_id');

    if (teamData) {
      return res.status(200).json(teamData);
    }

    return res.status(404).json({ error: 'Team not found' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Team' });
  }
};

module.exports.createTeam = async (req, res) => {
  try {
    const newTeam = new Team(req.body);
    await newTeam.save();

    return res.status(201).json({ message: 'Team added successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Team already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create Team' });
  }
};

module.exports.updateTeam = async (req, res) => {
  try {
    const updatedTeam = await Team.findOneAndUpdate(
      { teamId: req.params.teamId },
      {
        $set: {
          teamId: req.body.teamId,
          category: req.body.category,
          groupPhase1: req.body.groupPhase1,
          groupPhase2: req.body.groupPhase2,
          name: req.body.name,
          abbreviation: req.body.abbreviation,
          image: req.body.image,
          imageThumbnail: req.body.imageThumbnail,
          background: req.body.background,
          alt: req.body.alt,
          location: req.body.location,
          stadium: req.body.stadium,
          color: req.body.color,
        },
      },
      { runValidators: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }

    return res.status(200).json({ message: 'Team updated successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Team already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to update Team' });
  }
};

module.exports.deleteTeam = async (req, res) => {
  try {
    const deletedTeam = await Team.findOneAndDelete({ teamId: req.params.teamId });

    if (!deletedTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }

    return res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete Team' });
  }
};