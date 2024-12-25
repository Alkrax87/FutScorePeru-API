const { validateDivisionForLastGames } = require("../utils/validateDivision");

const getAllLastGames = async (req, res) => {
  try {
    const { division } = req.params;
    const model = validateDivisionForLastGames(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const lastGamesData = await model.find();
    return res.status(200).json(lastGamesData);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
};

const getAllLastGamesById = async (req, res) => {
  try {
    const { division } = req.params;
    const { teamId } = req.params;
    const model = validateDivisionForLastGames(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const lastgames = await model.findOne({ teamId });
    if (!lastgames) {
      return res.status(404).json({ error: `Información no encontrada para el teamId "${teamId}"` });
    }
    res.status(200).json(lastgames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
};

const createLastGames = async (req, res) => {
  try {
    const { division } = req.params;
    const model = validateDivisionForLastGames(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const newLastGames = new model(req.body);
    await newLastGames.save();
    return res.status(201).json(newLastGames);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
};

const changeLastGamesByTeamId = async (req, res) => {
  try {
    const { division } = req.params;
    const { teamId } = req.params;
    const { destination } = req.params;
    const { option } = req.params;
    const model = validateDivisionForLastGames(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    let updatedLastGames = await model.findOne({ teamId });
    if (!updatedLastGames) {
      return res.status(404).json({ error: "Información no encontrada" });
    }
    if (["apertura", "clausura", "regional", "grupos", "regular", "final"].includes(destination)) {
      if (["w","d","l","r"].includes(option)) {
        const valueToPush = option === "r" ? "" : option;
        updatedLastGames[destination].splice(0,1);
        updatedLastGames[destination].push(valueToPush);
        await updatedLastGames.save();
        return res.status(200).json(updatedLastGames);
      } else {
        return res.status(404).json({ error: `Parámetro "${option}" no encontrado` });
      }
    } else {
      return res.status(404).json({ error: `Parámetro "${destination}" no encontrado` });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
}

const deleteLastGames = async (req, res) => {
  try {
    const { division } = req.params;
    const { teamId } = req.params;
    const model = validateDivisionForLastGames(division);
    if (!model) {
      return res.status(404).json({ error: `No se encontró información para la división "${division}"` });
    }
    const deletedLastGames = await model.findOneAndDelete({ teamId });
    if (!deletedLastGames) {
      return res.status(404).json({ error: "Información no encontrada" });
    }
    return res.status(204).json({ message: "Información eliminada correctamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Ocurrió un error al obtener la información" });
  }
};

module.exports = {
  getAllLastGames,
  getAllLastGamesById,
  createLastGames,
  changeLastGamesByTeamId,
  deleteLastGames,
};