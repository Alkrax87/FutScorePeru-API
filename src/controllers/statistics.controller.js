const TeamPerformance = require('../models/TeamPerformance');
const { computeTeamPerformance } = require('../utils/computeTeamPerformance');
const { computeFixtureData } = require('../utils/computeStatisticsData');

module.exports.getStatisticsByCategory = async (req, res) => {
  try {
    const performanceData = await TeamPerformance.find({ category: req.params.category }).select('-_id');

    if (performanceData.length > 0) {
      const teamPerformancesData = computeTeamPerformance(performanceData);
      const statistics = computeFixtureData(teamPerformancesData);

      return res.status(200).json(statistics);
    } else {
      return res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Statistics' });
  }
};