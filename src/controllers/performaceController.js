const Performance = require('../models/Performance');
const { calculatePerformance } = require('../utils/performanceCalculator');

const divisionPhases = {
  1: ['apertura', 'clausura', 'acumulado'],
  2: ['regional', 'grupos'],
  3: ['regional', 'final'],
};
const validPhases = ['apertura', 'clausura', 'regional', 'grupos', 'final'];

const getPerformanceByCategory = async (req, res) => {
  try {
    const performanceData = await Performance.find({
      category: req.params.category,
    }).select('-_id -category');

    if (performanceData.length > 0) {
      const phases = divisionPhases[req.params.category];
      const calculatedPerformance = calculatePerformance(performanceData, phases[0], phases[1], phases[2]);

      return res.status(200).json(calculatedPerformance);
    } else {
      return res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Performance' });
  }
};

const getPerformanceByTeamId = async (req, res) => {
  try {
    const performanceData = await Performance.findOne({
      teamId: req.params.teamId,
    }).select('-_id -category');

    if (!performanceData) {
      return res.status(404).json({ error: 'Performance not found' });
    }

    const phases = divisionPhases[req.params.category];
    const calculatedPerformance = calculatePerformance(performanceData, phases[0], phases[1], phases[2]);

    return res.status(200).json(calculatedPerformance[0]);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Performance' });
  }
};

const createPerformance = async (req, res) => {
  try {
    const { teamId, category } = req.body;

    const existingPerformance = await Performance.findOne({
      teamId: teamId,
    });

    if (existingPerformance) {
      return res.status(400).json({ error: 'Performance already exists' });
    }

    const doc = {
      teamId,
      category,
    };

    switch (category) {
      case 1:
        doc.apertura = {};
        doc.clausura = {};
        break;
      case 2:
        doc.regional = {};
        doc.grupos = {};
        break;
      case 3:
        doc.regional = {};
        doc.final = {};
        break;
      default:
        break;
    }

    const newPerformance = new Performance(doc);
    await newPerformance.save();

    return res.status(201).json({ message: 'Performance created successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create Performance.' });
  }
};

const updatePerformanceByTeamId = async (req, res) => {
  try {
    const { phase } = req.params;

    if (!validPhases.includes(phase)) {
      return res.status(400).json({ error: 'Invalid phase' });
    }

    const updatedPerformance = await Performance.findOne({
      teamId: req.params.teamId,
    });

    if (!updatedPerformance) {
      return res.status(404).json({ error: 'Performance not found' });
    }

    updatedPerformance[phase] = req.body;

    await updatedPerformance.save();

    return res.status(200).json({ message: 'Successfully updated performance' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update performance' });
  }
};

const deletePerformance = async (req, res) => {
  try {
    const deletedPerformance = await Performance.findOneAndDelete({
      teamId: req.params.teamId,
    });

    if (!deletedPerformance) {
      return res.status(404).json({ error: 'Performance not found' });
    }

    return res.status(200).json({ message: 'Performance deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete Performance' });
  }
}

module.exports = {
  getPerformanceByCategory,
  getPerformanceByTeamId,
  createPerformance,
  updatePerformanceByTeamId,
  deletePerformance,
};