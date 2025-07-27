const Results = require('../models/Results');

const validPhases = ['apertura', 'clausura', 'regional', 'grupos', 'final'];

const getResultsByCategory = async (req, res) => {
  try {
    const resultsData = await Results.find({
      category: req.params.category,
    }).select('-_id -category');

    if (resultsData.length > 0) {
      return res.status(200).json(resultsData);
    } else {
      return res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Results' });
  }
};

const getResultsByTeamId = async (req, res) => {
  try {
    const resultsData = await Results.findOne({
      teamId: req.params.teamId,
    }).select('-_id -category');

    if (!resultsData) {
      return res.status(404).json({ error: 'Results not found' });
    }

    return res.status(200).json(resultsData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Results' });
  }
};

const createResults = async (req, res) => {
  try {
    const { teamId, category, phases } = req.body;

    const existingResults = await Results.findOne({
      teamId: teamId,
    });

    if (existingResults) {
      return res.status(400).json({ error: 'Results already exists' });
    }

    if (!Array.isArray(phases) || phases.length === 0) {
      return res.status(400).json({ error: 'Phase must be a non-empty array' });
    }

    const doc = {
      teamId,
      category,
    };

    for (const phase of phases) {
      if (!validPhases.includes(phase.name)) {
        return res.status(400).json({ error: `Invalid phase: ${phase.name}` });
      }

      if (!isNaN(phase.size) && phase.size > 0) {
        doc[phase.name] = Array(phase.size).fill(null);
      }
    }

    const newResults = new Results(doc);
    await newResults.save();

    return res.status(201).json({ message: 'Results created successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create Results' });
  }
}

const updateResultsByTeamId = async (req, res) => {
  try {
    const { teamId, phase, index } = req.params;

    if (!validPhases.includes(phase)) {
      return res.status(400).json({ error: 'Invalid phase' });
    }

    const newValue = req.body.score;

    const updatedResults = await Results.findOne({
      teamId: teamId,
    });

    if (!updatedResults) {
      return res.status(404).json({ error: 'Results not found' });
    }

    const findedResults = updatedResults[phase];

    if (!findedResults) {
      return res.status(404).json({ error: 'Phase not found in Results' });
    }

    findedResults[index] = newValue;

    await updatedResults.save();

    return res.status(200).json({ message: 'Successfully updated results' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to update results' });
  }
};

const deleteResults = async (req, res) => {
  try {
    const deletedResults = await Results.findOneAndDelete({
      teamId: req.params.teamId,
    });

    if (!deletedResults) {
      return res.status(404).json({ error: 'Results not found' });
    }

    return res.status(200).json({ message: 'Results deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Results' });
  }
}

module.exports = {
  getResultsByCategory,
  getResultsByTeamId,
  createResults,
  updateResultsByTeamId,
  deleteResults
};