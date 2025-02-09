const { validateDivisionForFixture } = require("../utils/validateDivision");

const getFixture = async (req, res) => {
  try {
    const { division } = req.params;
    const model = validateDivisionForFixture(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const fixtureData = await model.findOne();
    return res.status(200).json(fixtureData);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener Fixture" });
  }
};

module.exports = {
  getFixture,
};
