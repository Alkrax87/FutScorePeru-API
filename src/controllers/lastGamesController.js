const LastGames = require('../models/LastGames');

const validPhases = ['apertura', 'clausura', 'regional', 'grupos', 'final'];
const validOptions = ['w', 'd', 'l', 'r'];

const getLastGamesByCategory = async (req, res) => {
  try {
    const lastGamesData = await LastGames.find({
      category: req.params.category,
    }).select('-_id -category');

    if (lastGamesData.length > 0) {
      return res.status(200).json(lastGamesData);
    } else {
      return res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving LastGames' });
  }
};

const getLastGamesByTeamId = async (req, res) => {
  try {
    const lastGamesData = await LastGames.findOne({
      teamId: req.params.teamId,
    }).select('-_id -category');

    if (!lastGamesData) {
      return res.status(404).json({ error: 'LastGames not found' });
    }

    return res.status(200).json(lastGamesData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving LastGames' });
  }
};

const createLastGames = async (req, res) => {
  try {
    const { teamId, category, phase } = req.body;

    const existingLastGames = await LastGames.findOne({
      teamId: teamId,
    });

    if (existingLastGames) {
      return res.status(400).json({ error: 'LastGames already exists' });
    }

    if (!Array.isArray(phase) || phase.length === 0) {
      return res.status(400).json({ error: 'Phase must be a non-empty array' });
    }

    const doc = {
      teamId,
      category,
    };

    for (const p of phase) {
      const { phase: phaseName, size } = p;

      if (!validPhases.includes(phaseName)) {
        return res.status(400).json({ error: `Invalid phase: ${phaseName}` });
      }

      if (!isNaN(size) && size > 0) {
        doc[phaseName] = Array(size).fill('');
      }
    }

    const newLastGames = new LastGames(doc);
    await newLastGames.save();

    return res.status(201).json({ message: 'LastGames created successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create LastGames.' });
  }
};

const updateLastGamesByTeamId = async (req, res) => {
  try {
    const { phase, option } = req.params;

    if (!validPhases.includes(phase)) {
      return res.status(400).json({ error: 'Invalid phase' });
    }

    if (!validOptions.includes(option)) {
      return res.status(400).json({ error: 'Invalid option' });
    }

    const valueToPush = option === 'r' ? '' : option;

    const updatedLastGames = await LastGames.findOne({
      teamId: req.params.teamId,
    });

    if (!updatedLastGames) {
      return res.status(404).json({ error: 'LastGames not found' });
    }

    const findedPhase = updatedLastGames[phase];

    if (!findedPhase) {
      return res.status(404).json({ error: 'Phase not found in LastGames' });
    }

    findedPhase.shift();
    findedPhase.push(valueToPush);

    await updatedLastGames.save();

    return res.status(200).json({ message: 'Successfully updated LastGames' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to update LastGames' });
  }
};

const deleteLastGames = async (req, res) => {
  try {
    const deletedLastGames = await LastGames.findOneAndDelete({
      teamId: req.params.teamId,
    });

    if (!deletedLastGames) {
      return res.status(404).json({ error: 'LastGames not found' });
    }

    return res.status(200).json({ message: 'LastGames deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete LastGames' });
  }
};

module.exports = {
  getLastGamesByCategory,
  getLastGamesByTeamId,
  createLastGames,
  updateLastGamesByTeamId,
  deleteLastGames,
};