const League = require('../models/League');

module.exports.getLeagues = async (req, res) => {
  try {
    const leaguesData = await League.find().select('-_id');

    return res.status(200).json(leaguesData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Leagues' });
  }
};

module.exports.getLeagueByLeagueId = async (req, res) => {
  try {
    const leagueData = await League.findOne({ leagueId: req.params.leagueId }).select('-_id');

    if (leagueData) {
      return res.status(200).json(leagueData);
    }

    return res.status(404).json({ error: 'League not found' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Error retrieving Leagues' });
  }
};

module.exports.createLeague = async (req, res) => {
  try {
    const newLeague = new League(req.body);
    await newLeague.save();

    return res.status(201).json({ message: 'League added successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'League already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create League' });
  }
}

module.exports.updateLeague = async (req, res) => {
  try {
    const updatedLeague = await League.findOneAndUpdate(
      { leagueId: req.params.leagueId },
      {
        $set: {
          leagueId: req.body.leagueId,
          image: req.body.image,
          imageThumbnail: req.body.imageThumbnail,
          alt: req.body.alt,
          location: req.body.location,
          color: req.body.color,
          teams: req.body.teams,
        },
      },
      { runValidators: true }
    );

    if (!updatedLeague) {
      return res.status(404).json({ error: 'League not found' });
    }

    return res.status(200).json({ message: 'League updated successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'League already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to update League' });
  }
}

module.exports.deleteLeague = async (req, res) => {
  try {
    const deletedLeague = await League.findOneAndDelete({ leagueId: req.params.leagueId });

    if (!deletedLeague) {
      return res.status(404).json({ error: 'League not found' });
    }

    return res.status(200).json({ message: 'League deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete League' });
  }
}