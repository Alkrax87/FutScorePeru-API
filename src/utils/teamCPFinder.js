const TeamCP = require('../models/TeamCP');

async function teamCPFinder(teamsId) {
  const teams = await Promise.all(
    teamsId.map(async (teamId) => {
      const newTeam = await TeamCP.findOne({ teamId }).select('-_id');
      return newTeam;
    })
  );

  return teams.filter(Boolean);
}

module.exports = teamCPFinder;