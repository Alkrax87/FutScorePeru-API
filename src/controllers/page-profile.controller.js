const Team = require('../models/Team');
const TeamDetails = require('../models/TeamDetails');
const League = require('../models/League');
const LeagueDetails = require('../models/LeagueDetails');
const Division = require('../models/Division');
const Stadium = require('../models/Stadium');
const Fixture = require('../models/Fixture');
const { filterMatchesByTeamId } = require('../utils/filterMatchesByTeamId');

module.exports.getTeamProfile = async (req, res) => {
  try {
    // TEAM
    const teamData = await Team.findOne({ teamId: req.params.teamId }).select('-_id');
    // TEAM DETAILS
    const teamDetailsData = await TeamDetails.findOne({ teamId: req.params.teamId }).select('-_id -teamId');

    if (teamData && teamDetailsData) {
      // DIVISION
      const divisionData = await Division.findOne({ category: teamData.category }).select('-_id -divisionId');
      // STADIUM
      const stadiumData = await Stadium.findOne({ stadiumId: teamData.stadium }).select('-_id -stadiumId');
      // FIXTURE
      const fixtureData = await Fixture.findOne({ category: teamData.category }).select('-_id -category').lean();
      let teamFixtureData;
      let nextTeamMatch;
      let latestTeamFixturePhase1;
      let latestTeamFixturePhase2;
      if (fixtureData) {
        teamFixtureData = filterMatchesByTeamId(fixtureData, req.params.teamId);
        // Next Match
        if (divisionData && divisionData.phase1.status) {
          if (teamFixtureData.phase1[divisionData.phase1.inGame - 1].away === undefined) {
            nextTeamMatch = teamFixtureData.phase1[divisionData.phase1.inGame];
          } else {
            nextTeamMatch = teamFixtureData.phase1[divisionData.phase1.inGame - 1];
          }
        } else if ((divisionData && divisionData.phase2.status) || ( divisionData && divisionData.phase3.status)) {
          if (teamFixtureData.phase2[divisionData.phase2.inGame - 1].away === undefined) {
            nextTeamMatch = teamFixtureData.phase2[divisionData.phase2.inGame];
          } else {
            nextTeamMatch = teamFixtureData.phase2[divisionData.phase2.inGame - 1];
          }
        }
        // Filter Phase 1
        if (divisionData && divisionData.phase1.inGame <= 5) {
          latestTeamFixturePhase1 = teamFixtureData.phase1.slice(0, 5)
        } else {
          latestTeamFixturePhase1 = teamFixtureData.phase1.slice(divisionData.phase1.inGame - 6, divisionData.phase1.inGame - 1)
        }
        // Filter Phase 2
        if (divisionData && divisionData.phase2.inGame <= 5) {
          latestTeamFixturePhase2 = teamFixtureData.phase2.slice(0, 5)
        } else {
          latestTeamFixturePhase2 = teamFixtureData.phase2.slice(divisionData.phase2.inGame - 6, divisionData.phase2.inGame - 1)
        }
      }

      return res.status(200).json({
        teamData, teamDetailsData, stadiumData, teamFixtureData: teamFixtureData ?? { phase1: [], phase2: [] },
        teamOverviewData: {
          nextMatch: nextTeamMatch,
          latest: {
            phase1: latestTeamFixturePhase1,
            phase2: latestTeamFixturePhase2,
          }
        }
      });
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