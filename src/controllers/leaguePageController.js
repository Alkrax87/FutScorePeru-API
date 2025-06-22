const League = require("../models/League");

const getLeagueInformation = async (req, res) => {
  try {
    const leagueData = await League.findOne({
      leagueId: req.params.leagueId,
    }).select(
      "-_id location image information"
    );

    if (!leagueData) {
      return res.status(404).json({ error: "League not found" });
    }

    return res.status(200).json({
      title: leagueData.location,
      flag: leagueData.image,
      foundation: leagueData.information.foundation,
      latestRepresentatives: leagueData.information.latestRepresentatives,
      topWinner: leagueData.information.topWinner,
      leagues: leagueData.information.leagues,
      allTimeWinners: leagueData.information.allTimeWinners,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving league information" });
  }
}

module.exports = {
  getLeagueInformation
}