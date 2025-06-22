const League = require("../models/League");

const getLeagues = async (req, res) => {
  try {
    const leaguesData = await League.find().select(
      "-_id category leagueId region image imageThumbnail alt location color teams"
    );

    if (leaguesData.length > 0) {
      return res.status(200).json(leaguesData);
    } else {
      return res.status(404).json({ error: "No leagues found" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving leagues" });
  }
};

const getLeagueById = async (req, res) => {
  try {
    const leagueData = await League.findOne({
      leagueId: req.params.leagueId,
    }).select(
      "-_id category leagueId region image imageThumbnail alt location color teams"
    );

    if (!leagueData) {
      return res.status(404).json({ error: "League not found" });
    }

    return res.status(200).json(leagueData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving league" });
  }
};

const createLeague = async (req, res) => {
  try {
    const exitingLeague = await League.findOne({
      leagueId: req.body.leagueId,
    })

    if (exitingLeague) {
      return res.status(400).json({ error: "League already exists" });
    }

    const newLeague = new League(req.body);
    await newLeague.save();

    return res.status(201).json({ message: "League created successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error creating league" });
  }
}

module.exports = {
  getLeagues,
  getLeagueById,
  createLeague,
};
