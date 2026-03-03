const Team = require('../models/Team');
const TeamDetails = require('../models/TeamDetails');
const League = require('../models/League');
const LeagueDetails = require('../models/LeagueDetails');

module.exports.getTeamProfile = async (req, res) => {
  try {
    const teamData = await Team.findOne({ teamId: req.params.teamId }).select('-_id -teamId');
    const teamDetailsData = await TeamDetails.findOne({ teamId: req.params.teamId }).select('-_id -teamId');

    if (teamData && teamDetailsData) {
      return res.status(200).json({ teamData, teamDetailsData });
    }

    return res.status(404).json({ error: 'Team Profile not found' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Team Profile' });
  }
};

module.exports.getLeagueProfile = async (req, res) => {
  try {
    const leagueData = await League.findOne({ leagueId: req.params.leagueId }).select('-_id -leagueId');
    const leagueDetailsData = await LeagueDetails.findOne({ leagueId: req.params.leagueId }).select('-_id -leagueId');

    if (leagueData && leagueDetailsData) {
      return res.status(200).json({ leagueData, leagueDetailsData });
    }

    return res.status(404).json({ error: 'League Profile not found' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving League Profile' });
  }
};