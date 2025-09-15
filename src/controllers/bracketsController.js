const FixtureBracket = require('../models/Brackets');

const getFixtureBracket = async (req, res) => {
  try {
    const fixtureBracketData = await FixtureBracket.find({
      divisionId: req.params.divisionId,
    }).select(
      '-_id'
    );

    if (!fixtureBracketData) {
      return res.status(404).json({ error: 'Fixture Bracket not found' });
    }

    return res.status(200).json(fixtureBracketData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving fixture' });
  }
};

module.exports = {
  getFixtureBracket,
};