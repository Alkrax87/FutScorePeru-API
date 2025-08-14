const Division = require('../models/Division');

const getDivisions = async (req, res) => {
  try {
    const divisionData = await Division.find().select('-_id');

    if (divisionData.length > 0) {
      return res.status(200).json(divisionData);
    } else {
      return res.status(404).json({ error: 'Divisions not found' });
    }
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Divisions' });
  }
};

const getDivisionByCategoryId = async (req, res) => {
  try {
    const divisionData = await Division.findOne({
      divisionId: req.params.divisionId,
    }).select('-_id');

    if (!divisionData) {
      return res.status(404).json({ error: 'Division not found' });
    }

    return res.status(200).json(divisionData);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Error retrieving Division' });
  }
};

const createDivision = async (req, res) => {
  try {
    const existingDivision = await Division.findOne({
      divisionId: req.body.divisionId,
    });

    if (existingDivision) {
      return res.status(400).json({ error: 'Division already exists' });
    }

    const newDivision = new Division(req.body);
    await newDivision.save();

    return res.status(201).json({ message: 'Division added successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to create Division' });
  }
};

const updateDivision = async (req, res) => {
  try {
    const updatedDivision = await Division.findOneAndUpdate(
      { divisionId: req.params.divisionId },
      {
        $set: {
          divisionId: req.body.divisionId,
          sup: req.body.sup,
          name: req.body.name,
          image: req.body.image,
          season: req.body.season,
          teams: req.body.teams,
          firstPhase: req.body.firstPhase,
          secondPhase: req.body.secondPhase,
          thirdPhase: req.body.thirdPhase,
          brackets: req.body.brackets,
        }
      }
    );

    if (!updatedDivision) {
      return res.status(404).json({ error: 'Division not found' });
    }

    return res.status(200).json({ message: 'Division updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Failed to update division' });
  }
};

const deleteDivision = async (req, res) => {
  try {
    const deletedDivision = await Division.findOneAndDelete({
      divisionId: req.params.divisionId,
    });

    if (!deletedDivision) {
      return res.status(400).json({ error: 'Division not found' });
    }

    return res.status(201).json({ message: 'Division deleted successfully' });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: 'Failed to delete Division' });
  }
};

module.exports = {
  getDivisions,
  getDivisionByCategoryId,
  createDivision,
  updateDivision,
  deleteDivision,
};