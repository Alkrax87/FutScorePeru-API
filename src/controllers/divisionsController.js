const getDivisionSettings = async (req, res) => {
  try {
    const { division } = req.params;
    switch (division) {
      case "l1":
        return res.status(200).json({
          category: "1<sup>ra</sup> División",
          season: 2025,
          teams: 19,
          stages: [
            {
              name: "apertura",
              inGame: 1,
            },
            {
              name: "clausura",
              inGame: 1,
            },
          ],
        });
      case "l2":
        return res.status(200).json({
          category: "2<sup>da</sup> División",
          season: 2025,
          teams: 15,
          stages: [
            {
              name: "regional",
              inGame: 1,
            },
            {
              name: "grupos",
              inGame: 1,
            },
          ],
        });
      case "l3":
        return res.status(200).json({
          category: "3<sup>ra</sup> División",
          season: 2025,
          teams: 37,
          stages: [
            {
              name: "regular",
              inGame: 1,
            },
            {
              name: "final",
              inGame: 1,
            },
          ],
        });
      default:
        break;
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error al obtener Divisions" });
  }
};

module.exports = {
  getDivisionSettings,
};
