const Team = require('../models/Team');
const Stadium = require('../models/Stadium');
const Fixture = require('../models/Fixture');
const LastGames = require('../models/LastGames');
const Performance = require('../models/Performance');
const sortLastGames = require('../utils/sortLastGames');
const TeamInformation = require('../models/TeamInformation');

const getTeamInformationByTeamId = async (req, res) => {
  try {
    const teamData = await Team.findOne({
      teamId: req.params.teamId,
    }).select(
      '-_id -groupFirstPhase -groupSecondPhase -imageThumbnail -color'
    );

    if (!teamData) {
      return res.status(404).json({ error: 'Team Data not found' });
    }

    const teamInformation = await TeamInformation.findOne({
      teamId: req.params.teamId,
    }).select(
      '-_id'
    );

    const stadiumData = await Stadium.findOne({
      stadiumId: teamData.stadium,
    }).select(
      '-_id name capacity location image'
    );

    const fixtureData = await Fixture.findOne({
      category: teamData.category,
    }).select(
      '-_id'
    );

    const teamLastGames = await LastGames.findOne({
      teamId: req.params.teamId,
    }).select(
      '-_id -teamId -category'
    );

    const teamPerformance = await Performance.findOne({
      teamId: req.params.teamId,
    }).select(
      '-_id -teamId -category'
    );

    let teamFixure = {};

    if (fixtureData) {
      fixtureData.stages.forEach((stage) => {
        let teamMatches = [];
        stage.matches.forEach((matches) => {
          let matchFound = false;

          matches.forEach((match) => {
            if (match.home === req.params.teamId || match.away === req.params.teamId) {
              matchFound = true;
              teamMatches.push(match);
            }
          });

          if (!matchFound) {
            teamMatches.push({
              home: req.params.teamId,
              away: null,
            });
          }
        });
        if (teamMatches.length > 0) {
          teamFixure[stage.name] = teamMatches;
        }
      });

      const categoryStages = [
        ['regional', 'grupos'],
        ['regional', 'final'],
      ];

      const stageMap = {
        2: ['regionalA', 'regionalB', 'gruposPromotionA', 'gruposPromotionB', 'gruposRelegation'],
        3: ['regional1', 'regional2', 'regional3', 'regional4', 'finalA', 'finalB', 'finalC', 'finalD'],
      };

      function processStages(stages, labels) {
        let counter = 0;

        for (const stage of stages) {
          if (!teamFixure[stage]) continue;

          for (const match of teamFixure[stage]) {
            if (match.away === null) {
              counter++;
              if (counter > 2) {
                delete teamFixure[stage];
                break;
              }
            }
          }

          counter = 0;
        }

        const [regionalKey, secondKey] = labels;

        const regionalStages = stages.filter((s) => s.toLowerCase().startsWith('regional') && teamFixure[s]);
        if (regionalStages.length > 0) {
          teamFixure[regionalKey] = teamFixure[regionalStages[0]];
          for (const stage of regionalStages) {
            delete teamFixure[stage];
          }
        }

        const otherStages = stages.filter((s) => !s.toLowerCase().startsWith('regional') && teamFixure[s]);
        if (otherStages.length > 0) {
          teamFixure[secondKey] = teamFixure[otherStages[0]];
          for (const stage of otherStages) {
            delete teamFixure[stage];
          }
        }
      }

      switch (teamData.category) {
        case 2:
          processStages(stageMap[2], categoryStages[0]);
          break;
        case 3:
          processStages(stageMap[3], categoryStages[1]);
          break;
        default:
          break;
      }
    }

    let divisionTitle;
    switch (teamData.category) {
      case 1:
        divisionTitle = 'Liga 1';
        break;
      case 2:
        divisionTitle = 'Liga 2';
        break;
      case 3:
        divisionTitle = 'Liga 3';
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
      foundation: teamInformation.foundation,
      background: teamInformation.background,
      website: teamInformation.website,
      social: teamInformation.social,
      stadium: stadiumData,
      lastgames: teamLastGames,
      performance: teamPerformance,
      fixture: teamFixure,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Team Information' });
  }
};

const createTeamInformation = async (req, res) => {
  try {
    const existingTeamInformation = await TeamInformation.findOne({
      teamId: req.body.teamId,
    });

    if (existingTeamInformation) {
      return res.status(400).json({ error: 'Team Information already exists' });
    }

    const newTeamInformation = new TeamInformation(req.body);
    await newTeamInformation.save();

    return res.status(201).json({ message: 'Team Information added successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create Team Information' });
  }
};

const updateTeamInformation = async (req, res) => {
  try {
    const updatedTeamInformation = await TeamInformation.findOneAndUpdate(
      { teamId: req.params.teamId },
      {
        $set: {
          foundation: req.body.foundation,
          background: req.body.background,
          website: req.body.website,
          social: req.body.social,
        },
      },
      { runValidators: true }
    );

    if (!updatedTeamInformation) {
      return res.status(404).json({ error: 'Team Information not found' });
    }

    return res.status(200).json({ message: 'Team Information updated successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to update Team Information' });
  }
};

const deleteTeamInformation = async (req, res) => {
  try {
    const deletedTeamInformation = await TeamInformation.findOneAndDelete({
      teamId: req.params.teamId,
    });

    if (!deletedTeamInformation) {
      return res.status(404).json({ error: 'Team Information not found' });
    }

    return res.status(200).json({ message: 'Team Information deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete Team Information' });
  }
};

module.exports = {
  getTeamInformationByTeamId,
  createTeamInformation,
  updateTeamInformation,
  deleteTeamInformation,
};