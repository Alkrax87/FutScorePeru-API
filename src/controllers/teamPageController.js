const Team = require("../models/Team");
const Stadium = require("../models/Stadium");
const Fixture = require("../models/Fixture");
const sortLastGames = require("../utils/sortLastGames");

const getTeamPageById = async (req, res) => {
  try {
    const teamData = await Team.findOne({
      teamId: req.params.teamId,
    }).select(
      "-_id category name abbreviation image alt location stadium lastgames performance results information"
    );

    if (!teamData) {
      return res.status(404).json({ error: "Team not found" });
    }

    const stadiumData = await Stadium.findOne({
      stadiumId: teamData.stadium,
    }).select(
      "-_id name capacity location image"
    );

    const fixtureData = await Fixture.findOne({
      category: teamData.category,
    });

    let teamFixure = {};

    if (fixtureData) {
      fixtureData.stages.forEach((stage) => {
        let teamMatches = [];
        stage.matches.forEach((matches) => {
          matches.forEach((match) => {
            if (match.home === req.params.teamId) {
              teamMatches.push(match);
            } else if (match.away === req.params.teamId) {
              teamMatches.push(match);
            }
          });
        });
        if (teamMatches.length > 0) {
          teamFixure[stage.name] = teamMatches;
        }
      });
    }

    let divisionTitle;
    let tournamentTitles;
    switch (teamData.category) {
      case 1:
        divisionTitle = "Liga 1";
        tournamentTitles = ["Apertura", "Clausura"];
        break;
      case 2:
        divisionTitle = "Liga 2";
        tournamentTitles = ["Fase Regional", "Fase Grupos"];
        break;
      case 3:
        divisionTitle = "Liga 3";
        tournamentTitles = ["Fase Regular", "Fase Final"];
        break;
      default:
        break;
    }

    return res.status(200).json({
      division: divisionTitle,
      name: teamData.name,
      abbreviation: teamData.abbreviation,
      image: teamData.image,
      alt: teamData.alt,
      location: teamData.location,
      foundation: teamData.information.foundation,
      background: teamData.information.background,
      website: teamData.information.website,
      social: teamData.information.social,
      stadium: stadiumData,
      tournamentTitles: tournamentTitles,
      lastgames: {
        [teamData.lastgames[0].name]: sortLastGames(teamData.lastgames[0].values),
        [teamData.lastgames[1].name]: sortLastGames(teamData.lastgames[1].values),
      },
      performance: {
        [teamData.performance[0].name]: {
          pg: teamData.performance[0].pg,
          pe: teamData.performance[0].pe,
          pp: teamData.performance[0].pp,
          gf: teamData.performance[0].gf,
          gc: teamData.performance[0].gc,
          sanction: teamData.performance[0].sanction,
          addition: teamData.performance[0].addition,
        },
        [teamData.performance[1].name]: {
          pg: teamData.performance[1].pg,
          pe: teamData.performance[1].pe,
          pp: teamData.performance[1].pp,
          gf: teamData.performance[1].gf,
          gc: teamData.performance[1].gc,
          sanction: teamData.performance[1].sanction,
          addition: teamData.performance[1].addition,
        },
      },
      fixture: teamFixure,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving team" });
  }
};

module.exports = {
  getTeamPageById,
};