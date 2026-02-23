const LeagueDetails = require('../models/LeagueDetails');

module.exports.getLeagueDetails = async (req, res) => {
  try {
    const leagueDetailsData = await LeagueDetails.find().select('-_id');

    return res.status(200).json(leagueDetailsData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving League Details' });
  }
}

module.exports.getLeagueDetailsByLeagueId = async (req, res) => {
  try {
    const leagueDetailsData = await LeagueDetails.findOne({ leagueId: req.params.leagueId }).select('-_id');

    if (leagueDetailsData) {
      return res.status(200).json(leagueDetailsData);
    }

    return res.status(404).json({ error: 'League Details not found' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving League Details' });
  }
};

module.exports.createLeagueDetails = async (req, res) => {
  try {
    const newLeagueDetails = new LeagueDetails(req.body);
    await newLeagueDetails.save();

    return res.status(201).json({ message: 'League Details added successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'League Details already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create League Details' });
  }
}

module.exports.updateLeagueDetails = async (req, res) => {
  try {
    const updatedLeagueDetails = await LeagueDetails.findOneAndUpdate(
      { leagueId: req.params.leagueId },
      {
        $set: {
          leagueId: req.body.leagueId,
          founded: req.body.founded,
          topChampion: req.body.topChampion,
          provincialLeagues: req.body.provincialLeagues,
          historicalChampions: req.body.historicalChampions,
        },
      },
      { runValidators: true }
    );

    if (!updatedLeagueDetails) {
      return res.status(404).json({ error: 'League Details not found' });
    }

    return res.status(200).json({ message: 'League Details updated successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'League Details already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to update League Details' });
  }
}

module.exports.deleteLeagueDetails = async (req, res) => {
  try {
    const deletedLeagueDetails = await LeagueDetails.findOneAndDelete({ leagueId: req.params.leagueId });

    if (!deletedLeagueDetails) {
      return res.status(404).json({ error: 'League Details not found' });
    }

    return res.status(200).json({ message: 'League Details deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete League Details' });
  }
}