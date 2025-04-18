const Team = require("../models/Team");
const Stadium = require("../models/Stadium");

const getTeamPageById = async (req, res) => {
  try {
    const teamPageData = await Team.findOne({
      teamId: req.params.teamId,
    }).select(
      "-_id category name abbreviation image alt location stadium lastgames performance results information"
    );

    if (!teamPageData) {
      return res.status(404).json({ error: "Team not found" });
    }

    const stadiumData = await Stadium.findOne({
      stadiumId: teamPageData.stadium,
    }).select(
      "-_id name capacity location image"
    );

    let divisionTitle;
    switch (teamPageData.category) {
      case 1:
        divisionTitle = "Liga 1";
        break;
      case 2:
        divisionTitle = "Liga 2";
        break;
      case 3:
        divisionTitle = "Liga 3";
        break;
      default:
        break;
    }

    return res.status(200).json({
      division: divisionTitle,
      name: teamPageData.name,
      abbreviation: teamPageData.abbreviation,
      image: teamPageData.image,
      alt: teamPageData.alt,
      location: teamPageData.location,
      foundation: teamPageData.information.foundation,
      background: teamPageData.information.background,
      website: teamPageData.information.website,
      social: teamPageData.information.social,
      stadium: stadiumData,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving team" });
  }
};

module.exports = {
  getTeamPageById,
};