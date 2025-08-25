const League = require('../models/League');
const teamCPFinder = require('../utils/teamCPFinder');

const getLeagueInformation = async (req, res) => {
  try {
    const leagueData = await League.findOne({
      leagueId: req.params.leagueId,
    }).select(
      '-_id image alt location teams information'
    );

    if (!leagueData) {
      return res.status(404).json({ error: 'League not found' });
    }

    const teams = await teamCPFinder(leagueData.teams);

    return res.status(200).json({
      image: leagueData.image,
      alt: leagueData.alt,
      location: leagueData.location,
      teams: teams.map(({ name, abbreviation, image }) => ({ name, abbreviation, image })),
      information: leagueData.information,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error retrieving league information' });
  }
};

module.exports = {
  getLeagueInformation,
};