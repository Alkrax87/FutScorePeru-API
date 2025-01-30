function prepareDataForStatistics(data, stage1, stage2) {
  const mergedData = data.map(team => ({
    teamId: team.teamId,
    pg: team[stage1].pg + team[stage2].pg,
    pe: team[stage1].pe + team[stage2].pe,
    pp: team[stage1].pp + team[stage2].pp,
    gf: team[stage1].gf + team[stage2].gf,
    gc: team[stage1].gc + team[stage2].gc,
  }));

  return calculateStatistics(structuredClone(mergedData));
}


function prepareDataForStatisticsL2(data) {
  const mergedData = [];
  for (const team of data) {
    mergedData.push({
      teamId: team.teamId,
      pg: team.regional.pg + team.grupos.pg,
      pe: team.regional.pe + team.grupos.pe,
      pp: team.regional.pp + team.grupos.pp,
      gf: team.regional.gf + team.grupos.gf,
      gc: team.regional.gc + team.grupos.gc,
    });
  }

  statisticsData = calculateStatistics(structuredClone(mergedData));
  return statisticsData;
}

function prepareDataForStatisticsL3(data) {
  const mergedData = [];
  for (const team of data) {
    mergedData.push({
      teamId: team.teamId,
      pg: team.regular.pg + team.final.pg,
      pe: team.regular.pe + team.final.pe,
      pp: team.regular.pp + team.final.pp,
      gf: team.regular.gf + team.final.gf,
      gc: team.regular.gc + team.final.gc,
    });
  }

  statisticsData = calculateStatistics(structuredClone(mergedData));
  return statisticsData;
}

function calculateStatistics(data) {
  const defenseSorted = data.sort((a, b) => a.gc - b.gc);
  const bestDefenseData = defenseSorted.slice(0, 5).map(({ teamId, gc }) => ({ teamId, gc }));
  const worstDefenseData = defenseSorted.slice(-5).map(({ teamId, gc }) => ({ teamId, gc })).reverse();
  const goalsForSorted = data.sort((a, b) => b.gf - a.gf);
  const mostGoalsForData = goalsForSorted.slice(0, 5).map(({ teamId, gf }) => ({ teamId, gf }));
  const fewestGoalsForData = goalsForSorted.slice(-5).map(({ teamId, gf }) => ({ teamId, gf }));
  const mostWinsData = data.sort((a, b) => b.pg - a.pg).slice(0, 5).map(({ teamId, pg }) => ({ teamId, pg }));
  const mostDrawsData = data.sort((a, b) => b.pe - a.pe).slice(0, 5).map(({ teamId, pe }) => ({ teamId, pe }));
  const mostLossesData = data.sort((a, b) => b.pp - a.pp).slice(0, 5).map(({ teamId, pp }) => ({ teamId, pp }));

  return {
    bestDefense: bestDefenseData,
    worstDefense: worstDefenseData,
    mostGoals: mostGoalsForData,
    fewestGoals: fewestGoalsForData,
    mostWins: mostWinsData,
    mostDraws: mostDrawsData,
    mostLosses: mostLossesData,
  }
}

module.exports = {
  prepareDataForStatistics,
};
