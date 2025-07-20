const Team = require('../models/Team');

const getTeams = async (req, res) => {
  try {
    const teamsData = await Team.find().select('-_id');

    if (teamsData.length > 0) {
      return res.status(200).json(teamsData);
    } else {
      return res.status(404).json({ error: 'Teams not found' });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Teams' });
  }
};

const getTeamsByCategory = async (req, res) => {
  try {
    const teamsData = await Team.find({
      category: req.params.category
    }).select(
      '-_id'
    );

    if (teamsData.length > 0) {
      return res.status(200).json(teamsData);
    } else {
      return res.status(404).json({ error: 'Teams not found' });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Teams' });
  }
};

const getTeamById = async (req, res) => {
  try {
    const teamData = await Team.findOne({
      teamId: req.params.teamId,
    }).select(
      '-_id'
    );

    if (!teamData) {
      return res.status(404).json({ error: 'Team not found' });
    }

    return res.status(200).json(teamData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Team' });
  }
};

const createTeam = async (req, res) => {
  try {
    const existingTeam = await Team.findOne({
      teamId: req.body.teamId,
    });

    if (existingTeam) {
      return res.status(400).json({ error: 'Team already exists' });
    }

    const newTeam = new Team(req.body);
    await newTeam.save();

    return res.status(201).json({ message: 'Team added successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create Team' });
  }
};

const updateTeam = async (req, res) => {
  try {
    const updatedTeam = await Team.findOneAndUpdate(
      { teamId: req.params.teamId },
      {
        $set: {
          teamId: req.body.teamId,
          category: req.body.category,
          groupFirstPhase: req.body.groupFirstPhase,
          groupSecondPhase: req.body.groupSecondPhase,
          name: req.body.name,
          abbreviation: req.body.abbreviation,
          image: req.body.image,
          imageThumbnail: req.body.imageThumbnail,
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
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to update Team' });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const deletedTeam = await Team.findOneAndDelete({
      teamId: req.params.teamId,
    });

    if (!deletedTeam) {
      return res.status(404).json({ error: 'Team not found' });
    }

    return res.status(200).json({ message: 'Team deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete Team' });
  }
};

module.exports = {
  getTeams,
  getTeamsByCategory,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};