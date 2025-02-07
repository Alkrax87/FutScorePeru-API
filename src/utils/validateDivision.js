const teamsL1 = require("../models/TeamL1");
const teamsL2 = require("../models/TeamL2");
const teamsL3 = require("../models/TeamL3");
const lastGamesL1 = require("../models/lastGamesL1");
const lastGamesL2 = require("../models/lastGamesL2");
const lastGamesL3 = require("../models/lastGamesL3");
const managerL1 = require("../models/managerL1");
const managerL2 = require("../models/managerL2");
const managerL3 = require("../models/managerL3");
const performanceL1 = require("../models/performanceL1");
const performanceL2 = require("../models/performanceL2");
const performanceL3 = require("../models/performanceL3");
const resultsL1 = require("../models/resultsL1");
const resultsL2 = require("../models/resultsL2");
const resultsL3 = require("../models/resultsL3");
const fixtureL1 = require("../models/fixtureL1");
const fixtureL2 = require("../models/fixtureL2");
const fixtureL3 = require("../models/fixtureL3");

function validateDivisionForTeams(division) {
  const teamsMap = {
    l1: teamsL1,
    l2: teamsL2,
    l3: teamsL3,
  };
  return teamsMap[division];
}

function validateDivisionForLastGames(division) {
  const lastGamesMap = {
    l1: lastGamesL1,
    l2: lastGamesL2,
    l3: lastGamesL3,
  };
  return lastGamesMap[division];
}

function validateDivisionForPerformance(division) {
  const performanceMap = {
    l1: performanceL1,
    l2: performanceL2,
    l3: performanceL3,
  };
  return performanceMap[division];
}

function validateDivisionForResults(division) {
  const results = {
    l1: resultsL1,
    l2: resultsL2,
    l3: resultsL3,
  };
  return results[division];
}

function validateDivisionForManagers(division) {
  const results = {
    l1: managerL1,
    l2: managerL2,
    l3: managerL3,
  };
  return results[division];
}

function validateDivisionForFixture(division) {
  const results = {
    l1: fixtureL1,
    l2: fixtureL2,
    l3: fixtureL3,
  };
  return results[division];
}

module.exports = {
  validateDivisionForTeams,
  validateDivisionForLastGames,
  validateDivisionForPerformance,
  validateDivisionForResults,
  validateDivisionForManagers,
  validateDivisionForFixture,
};
