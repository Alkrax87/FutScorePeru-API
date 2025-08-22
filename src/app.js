const express = require("express");
const morgan = require("morgan");
const path = require("path");
const cors = require("cors");
const { authenticateAPIKey } = require("./middleware/authenticateApiKey");
require("./config/database");

const app = express();

// CORS
const corsOptions = {
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE']
}

// Middlewares
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../public")));

// Routes APIKEY
app.use("/api/auth", require("./routes/authRoutes"));

// Rutas
app.use("/api/divisions", authenticateAPIKey, require("./routes/routesDivision"));
app.use("/api/map", authenticateAPIKey, require("./routes/routesMap"));
app.use("/api/teams", authenticateAPIKey, require("./routes/routesTeams"));
app.use("/api/teamsCP", authenticateAPIKey, require("./routes/routesTeamsCP"));
app.use("/api/lastgames", authenticateAPIKey, require("./routes/routesLastGames"));
app.use("/api/performance", authenticateAPIKey, require("./routes/routesPerformance"));
app.use("/api/results", authenticateAPIKey, require("./routes/routesResults"));
app.use("/api/statistics", authenticateAPIKey, require("./routes/routesStatistics"));
app.use("/api/stadiums", authenticateAPIKey, require("./routes/routesStadiums"));
app.use("/api/managers", authenticateAPIKey, require("./routes/routesManagers"));
app.use("/api/fixture", authenticateAPIKey, require("./routes/routesFixture"));
app.use("/api/leagues", authenticateAPIKey, require("./routes/routesLeagues"));
app.use("/api/information/club", authenticateAPIKey, require("./routes/routesTeamInformation"));
app.use("/api/information/league", authenticateAPIKey, require("./routes/routesLeaguePage"));

// Manejo de errores
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

module.exports = app;