const Team = require("../models/Team");

const getTeams = async (req, res) => {
  try {
    const teamsData = await Team.find({
      category: req.params.category,
    }).select(
      "-_id teamId group name abbreviation image imageThumbnail alt url location stadium color"
    );

    if (teamsData.length > 0) {
      return res.status(200).json(teamsData);
    } else {
      return res.status(404).json({ error: "Category not found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving teams" });
  }
};

const getTeamById = async (req, res) => {
  try {
    const teamData = await Team.findOne({
      category: req.params.category,
      teamId: req.params.teamId,
    }).select(
      "-_id teamId group name abbreviation image imageThumbnail alt url location stadium color"
    );

    if (!teamData) {
      return res.status(404).json({ error: "Team not found" });
    }

    return res.status(200).json(teamData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving team" });
  }
};

const createTeam = async (req, res) => {
  try {
    const existingTeam = await Team.findOne({
      teamId: req.body.teamId,
    });

    if (existingTeam) {
      return res.status(400).json({ error: "Team already exists" });
    }

    req.body.category = req.params.category;

    for (const lastgames of req.body.lastgames) {
      if (typeof lastgames.games === "number" && lastgames.games > 0) {
        lastgames.values = Array(lastgames.games).fill("");
      } else {
        return res.status(400).json({ error: "Invalid games value" });
      }
    }

    for (const result of req.body.results) {
      if (typeof result.games === "number" && result.games > 0) {
        result.score = Array(result.games).fill(null);
      } else {
        return res.status(400).json({ error: "Invalid games value" });
      }
    }

    const newTeam = new Team(req.body);
    await newTeam.save();

    return res.status(201).json({ message: "Successfully added new team" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add a new team" });
  }
};

const updateTeam = async (req, res) => {
  try {
    const updatedTeam = await Team.findOneAndUpdate(
      { category: req.params.category, teamId: req.params.teamId },
      {
        $set: {
          teamId: req.params.teamId,
          group: req.body.group ?? undefined,
          name: req.body.name ?? undefined,
          abbreviation: req.body.abbreviation ?? undefined,
          image: req.body.image ?? undefined,
          imageThumbnail: req.body.imageThumbnail ?? undefined,
          alt: req.body.alt ?? undefined,
          url: req.body.url ?? undefined,
          location: req.body.location ?? undefined,
          stadium: req.body.stadium ?? undefined,
          color: req.body.color ?? undefined,
        },
      },
      { runValidators: true }
    );

    if (!updatedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }

    return res.status(200).json({ message: "Successfully updated team" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to update the team" });
  }
};

const deleteTeam = async (req, res) => {
  try {
    const deletedTeam = await Team.findOneAndDelete({
      category: req.params.category,
      teamId: req.params.teamId,
    });

    if (!deletedTeam) {
      return res.status(404).json({ error: "Team not found" });
    }

    return res.status(200).json({ message: "Successfully deleted team" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete the team" });
  }
};

module.exports = {
  getTeams,
  getTeamById,
  createTeam,
  updateTeam,
  deleteTeam,
};
