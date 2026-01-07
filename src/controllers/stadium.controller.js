const Stadium = require('../models/Stadium');

module.exports.getAllStadiums = async (req, res) => {
  try {
    const stadiumsData = await Stadium.find().select('-_id');

    return res.status(200).json(stadiumsData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Stadiums' });
  }
};

module.exports.getStadiumByStadiumId = async (req, res) => {
  try {
    const stadiumData = await Stadium.findOne({ stadiumId: req.params.stadiumId }).select('-_id');

    if (stadiumData) {
      return res.status(200).json(stadiumData);
    }

    return res.status(404).json({ error: 'Stadium not found' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Stadium' });
  }
};

module.exports.createStadium = async (req, res) => {
  try {
    const newStadium = new Stadium(req.body);
    await newStadium.save();

    return res.status(201).json({ message: 'Stadium added successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Stadium already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create Stadium' });
  }
};

module.exports.updateStadium = async (req, res) => {
  try {
    const updatedStadium = await Stadium.findOneAndUpdate(
      { stadiumId: req.params.stadiumId },
      {
        $set: {
          stadiumId: req.body.stadiumId,
          name: req.body.name,
          capacity: req.body.capacity,
          location: req.body.location,
          image: req.body.image,
        },
      },
      { runValidators: true }
    );

    if (!updatedStadium) {
      return res.status(404).json({ error: 'Stadium not found' });
    }

    return res.status(200).json({ message: 'Stadium updated successfully' });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ error: 'Stadium already exists' });
    }

    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }

    console.error(error.message);
    return res.status(500).json({ error: 'Failed to update Stadium' });
  }
};

module.exports.deleteStadium = async (req, res) => {
  try {
    const deletedStadium = await Stadium.findOneAndDelete({stadiumId: req.params.stadiumId });

    if (!deletedStadium) {
      return res.status(404).json({ error: 'Stadium not found' });
    }

    return res.status(200).json({ message: 'Stadium deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete Stadium' });
  }
};