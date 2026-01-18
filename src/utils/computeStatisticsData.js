module.exports.computeFixtureData = (teamPerformanceData) => {
  const phase1Data = teamPerformanceData.map((team) => {
    return {
      teamId: team.teamId,
      w: team.phase1.w,
      d: team.phase1.d,
      l: team.phase1.l,
      gf: team.phase1.gf,
      ga: team.phase1.ga,
      gd: team.phase1.gd,
    };
  });
  const phase2Data = teamPerformanceData.map((team) => {
    return {
      teamId: team.teamId,
      w: team.phase2.w,
      d: team.phase2.d,
      l: team.phase2.l,
      gf: team.phase2.gf,
      ga: team.phase2.ga,
      gd: team.phase2.gd,
    };
  });
  const overallData = teamPerformanceData.map((team) => {
    return {
      teamId: team.teamId,
      w: team.overall.w,
      d: team.overall.d,
      l: team.overall.l,
      gf: team.overall.gf,
      ga: team.overall.ga,
      gd: team.overall.gd,
    };
  });

  return {
    phase1: processData(phase1Data),
    phase2: processData(phase2Data),
    overall: processData(overallData),
  };
};

function processData(data) {
  // Defense
  const defenseSorted = data.sort((a, b) => a.ga - b.ga);
  const bestDefense = defenseSorted.slice(0, 8).map(({ teamId, ga }) => ({ teamId, ga }));
  const worstDefense = defenseSorted.slice(-8).map(({ teamId, ga }) => ({ teamId, ga })).reverse();
  // Goals
  const goalsForSorted = data.sort((a, b) => b.gf - a.gf);
  const mostGoalsFor = goalsForSorted.slice(0, 8).map(({ teamId, gf }) => ({ teamId, gf }));
  const fewestGoalsFor = goalsForSorted.slice(-8).map(({ teamId, gf }) => ({ teamId, gf })).reverse();
  // MatchResults
  const mostWins = data.sort((a, b) => b.w - a.w).slice(0, 8).map(({ teamId, w }) => ({ teamId, w }));
  const mostDraws = data.sort((a, b) => b.d - a.d).slice(0, 8).map(({ teamId, d }) => ({ teamId, d }));
  const mostLosses = data.sort((a, b) => b.l - a.l).slice(0, 8).map(({ teamId, l }) => ({ teamId, l }));
  // GoalDifference
  const goalDifferenceSorted = data.sort((a, b) => b.gd - a.gd);
  const bestGoalDifference = goalDifferenceSorted.slice(0, 8).map(({ teamId, gd }) => ({ teamId, gd }));
  const worstGoalDifference = goalDifferenceSorted.slice(-8).map(({ teamId, gd }) => ({ teamId, gd })).reverse();

  return {
    bestDefense,
    worstDefense,
    mostGoalsFor,
    fewestGoalsFor,
    mostWins,
    mostDraws,
    mostLosses,
    bestGoalDifference,
    worstGoalDifference,
  };
}