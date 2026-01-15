const Fixture = require('../models/Fixture');

const validPhase = (p) => !isNaN(p) && Number(p) > 0;

module.exports.getFixture = async (req, res) => {
  try {
    const fixturesData = await Fixture.find().select('-_id').sort({ category: 1 });

    return res.status(200).json(fixturesData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Fixtures' });
  }
}

module.exports.getFixtureByCategory = async (req, res) => {
  try {
    const fixtureData = await Fixture.findOne({ category: req.params.category }).select('-_id');

    if (fixtureData) {
      return res.status(200).json(fixtureData);
    }

    return res.status(404).json({ error: 'Fixture not found' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Fixture' });
  }
};

module.exports.createFixture = async (req, res) => {
  try {
    const { category, phase1, phase2 } = req.body;

    if (!validPhase(phase1) || !validPhase(phase2)) {
      return res.status(400).json({ error: 'Phase must be a number greater than 0' });
    }

    // Phase 1
    matchdayPhase1 = [];
    for (let index = 0; index < phase1; index++) {
      matchdayPhase1.push({ round: index + 1, matches: [] });
    }

    // Phase 2
    matchdayPhase2 = [];
    for (let index = 0; index < phase2; index++) {
      matchdayPhase2.push({ round: index + 1, matches: [] });
    }

    doc = { category, phase1: matchdayPhase1, phase2: matchdayPhase2 };

    const newFixture = new Fixture(doc);
    await newFixture.save();

    return res.status(201).json({ message: 'Fixture added successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Fixture already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: 'Failed to create Fixture' });
  }
};

module.exports.updateFixture = async (req, res) => {
  try {
    const updatedFixture = await Fixture.findOneAndUpdate(
      { category: req.params.category },
      {
        $set: {
          category: req.body.category,
          phase1: req.body.phase1,
          phase2: req.body.phase2,
        },
      },
      { runValidators: true }
    );

    if (!updatedFixture) {
      return res.status(404).json({ error: 'Fixture not found' });
    }

    return res.status(200).json({ message: 'Fixture updated successfully' });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error);
    return res.status(500).json({ error: 'Failed to update Fixture' });
  }
}

module.exports.deleteFixture = async (req, res) => {
  try {
    const deletedFixture = await Fixture.findOneAndDelete({ category: req.params.category });

    if (!deletedFixture) {
      return res.status(404).json({ error: 'Fixture not found' });
    }

    return res.status(200).json({ message: 'Fixture deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete Fixture' });
  }
}