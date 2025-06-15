const Fixture = require("../models/Fixture");

const getFixture = async (req, res) => {
  try {
    const fixtureData = await Fixture.findOne({
      category: req.params.category,
    }).select(
      "-_id"
    );

    if (!fixtureData) {
      return res.status(404).json({ error: "Fixture not found" });
    }

    let transformedFixture = {};

    for (const stage of fixtureData.stages) {
      transformedFixture[stage.name] = stage.matches;
    }

    return res.status(200).json(transformedFixture);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving fixture" });
  }
};

const getFixtureByTeamId = async (req, res) => {
  try {
    const teamId = req.params.teamId;

    const fixtureData = await Fixture.findOne({
      category: req.params.category,
    }).lean();

    if (!fixtureData) {
      return res.status(404).json({ error: "Fixture not found" });
    }

    const filteredStages = fixtureData.stages.reduce((acc, stage) => {
      const matches = stage.matches?.map(matchArray =>
        matchArray.filter(match => match.home === teamId || match.away === teamId)
      ).filter(matchArray => matchArray.length > 0);

      if (matches.length > 0) {
        acc[stage.name] = { matches };
      }

      return acc;
    }, {});

    if (Object.keys(filteredStages).length === 0) {
      return res.status(404).json({ error: "Fixture not found" });
    }

    return res.status(200).json(filteredStages);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving team fixture" });
  }
}

const getFixtureByStageAndRound = async (req, res) => {
  try {
    const { category, stage, round  } = req.params;

    const validStage = ["apertura", "clausura", "regional", "grupos", "final"];

    if (!validStage.includes(stage)) {
      return res.status(400).json({ error: "Invalid stage" });
    }

    const fixture = await Fixture.findOne({
      category: category,
    }).select(
      "-_id -category"
    );

    if (!fixture) {
      return res.status(404).json({ error: "Fixture not found" });
    }

    const roundIndex = parseInt(round) - 1;
    if (isNaN(roundIndex) || roundIndex < 0) {
      return res.status(400).json({ error: "Invalid round" });
    }

    let stageNames = [];

    switch (category) {
      case '1':
        stageNames = [stage];
        break;
      case '2':
        if (stage === "regional") {
          stageNames = ["regionalA", "regionalB"];
        } else if (stage === "grupos") {
          stageNames = ["gruposPromotionA", "gruposPromotionB", "gruposRelegation"];
        }
        break;
      case '3':
        if (stage === "regional") {
          stageNames = ["regional1", "regional2", "regional3", "regional4"];
        } else if (stage === "final") {
          stageNames = ["finalA", "finalB", "finalC", "finalD"];
        }
        break;
      default:
        break;
    }

    const matchingStages = fixture.stages.filter(stage => stageNames.includes(stage.name));

    if (!matchingStages || matchingStages.length === 0) {
      return res.status(400).json({ error: "Stages not found" });
    }

    const filterMatches = matchingStages
      .map(stage => stage.matches[roundIndex])
      .filter(matches => matches && matches.length > 0)
      .flat();

    if (filterMatches.length === 0) {
      return res.status(400).json({ error: "Invalid round" });
    }

    return res.status(200).json(filterMatches);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving fixture" });
  }
}

const createFixture = async (req, res) => {
  try {
    const existingFixture = await Fixture.findOne({
      category: req.body.category,
    });

    if (existingFixture) {
      return res.status(400).json({ error: "Fixture already exists" });
    }

    const newFixture = new Fixture(req.body);
    await newFixture.save();

    return res.status(201).json({ message: "Fixture added successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to add a new fixture" });
  }
}

const deleteFixture = async (req, res) => {
  try {
    const deletedFixture = await Fixture.findOneAndDelete({
      category: req.params.category,
    });

    if (!deletedFixture) {
      return res.status(404).json({ error: "Fixture not found" });
    }

    return res.status(200).json({ message: "Successfully deleted fixture" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Failed to delete fixture" });
  }
}

module.exports = {
  getFixture,
  getFixtureByTeamId,
  getFixtureByStageAndRound,
  createFixture,
  deleteFixture,
};