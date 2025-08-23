const TeamCP = require("../models/TeamCP");

const getTeamsCP = async (req, res) => {
  try {
    const teamsCPData = await TeamCP.find().select('-_id');

    if (teamsCPData.length > 0) {
      return res.status(200).json(teamsCPData);
    } else {
      return res.status(404).json({ error: 'TeamsCP not found' });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving TeamsCP' });
  }
};

getTeamCPByTeamId = async (req, res) => {
  try {
    const teamCPData = await TeamCP.findOne({
      teamId: req.params.teamId,
    }).select(
      '-_id'
    );

    if (!teamCPData) {
      return res.status(404).json({ error: 'TeamCP not found' });
    }

    return res.status(200).json(teamCPData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving TeamsCP' });
  }
};

createTeamCP = async (req, res) => {
  try {
    const existingTeamCP = await TeamCP.findOne({
      teamId: req.body.teamId,
    });

    if (existingTeamCP) {
      return res.status(400).json({ error: 'TeamCP already exists' });
    }

    const newTeamCP = new TeamCP(req.body);
    await newTeamCP.save();

    return res.status(201).json({ message: 'TeamCP added successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create TeamCP' });
  }
}

const updateTeamCP = async (req, res) => {
  try {
    const updatedTeamCP = await TeamCP.findOneAndUpdate(
      { teamId: req.params.teamId },
      {
        $set: {
          teamId: req.body.teamId,
          name: req.body.name,
          abbreviation: req.body.abbreviation,
          image: req.body.image,
          city: req.body.city,
        },
      },
      { runValidators: true }
    );

    if (!updatedTeamCP) {
      return res.status(404).json({ error: 'TeamCP not found' });
    }

    return res.status(200).json({ message: 'TeamCP updated successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to update TeamCP' });
  }
};

const deleteTeamCP = async (req, res) => {
  try {
    const deletedTeamCP = await TeamCP.findOneAndDelete({
      teamId: req.params.teamId,
    });

    if (!deletedTeamCP) {
      return res.status(404).json({ error: 'TeamCP not found' });
    }

    return res.status(200).json({ message: 'TeamCP deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete TeamCP' });
  }
};

module.exports = {
  getTeamsCP,
  getTeamCPByTeamId,
  createTeamCP,
  updateTeamCP,
  deleteTeamCP,
};