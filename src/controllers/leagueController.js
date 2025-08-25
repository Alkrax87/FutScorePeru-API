const League = require('../models/League');
const teamCPFinder = require('../utils/teamCPFinder');

const getLeagues = async (req, res) => {
  try {
    const leaguesData = await League.find().select(
      '-_id category leagueId region image imageThumbnail alt location color teams'
    );

    if (leaguesData.length > 0) {
      const leaguesWithTeams = await Promise.all(
        leaguesData.map(async (league) => {
          const teams = await teamCPFinder(league.teams);

          return {
            leagueId: league.leagueId,
            category: league.category,
            image: league.image,
            imageThumbnail: league.imageThumbnail,
            alt: league.alt,
            location: league.location,
            color: league.color,
            teams: teams.filter(Boolean),
          };
        })
      );

      return res.status(200).json(leaguesWithTeams);
    } else {
      return res.status(404).json({ error: 'No leagues found' });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error retrieving leagues' });
  }
};

const getLeagueById = async (req, res) => {
  try {
    leagueData = await League.findOne({
      leagueId: req.params.leagueId,
    }).select(
      '-_id category leagueId image imageThumbnail alt location color teams'
    );

    if (!leagueData) {
      return res.status(404).json({ error: 'League not found' });
    }

    const teams = await teamCPFinder(leagueData.teams);

    const leagueWithTeams = {
      leagueId: leagueData.leagueId,
      category: leagueData.category,
      image: leagueData.image,
      imageThumbnail: leagueData.imageThumbnail,
      alt: leagueData.alt,
      location: leagueData.location,
      teams: teams,
    };

    return res.status(200).json(leagueWithTeams);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error retrieving league' });
  }
};

module.exports = {
  getLeagues,
  getLeagueById,
};