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

    const fixture = await Fixture.findOne({
      category: req.params.category,
    }).lean();

    if (!fixture) {
      return res.status(404).json({ error: "Fixture not found" });
    }

    const filteredFixture = fixture.stages.map(stage => ({
      name: stage.name,
      matches: stage.matches?.map(matchArray =>
        matchArray.filter(match => match.home === teamId || match.away === teamId)
      ).filter(matchArray => matchArray.length > 0)
    })).filter(stage => stage.matches.length > 0);

    if (filteredFixture.length < 1) {
      return res.status(404).json({ error: "Fixture not found" });
    }

    return res.status(200).json(filteredFixture);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Error retrieving team fixture" });
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
  createFixture,
  deleteFixture,
};