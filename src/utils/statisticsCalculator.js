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

function calculateStatistics(data) {
  const defenseSorted = data.sort((a, b) => a.gc - b.gc);
  const bestDefenseData = defenseSorted.slice(0, 8).map(({ teamId, gc }) => ({ teamId, gc }));
  const worstDefenseData = defenseSorted.slice(-8).map(({ teamId, gc }) => ({ teamId, gc })).reverse();
  const goalsForSorted = data.sort((a, b) => b.gf - a.gf);
  const mostGoalsForData = goalsForSorted.slice(0, 8).map(({ teamId, gf }) => ({ teamId, gf }));
  const fewestGoalsForData = goalsForSorted.slice(-8).map(({ teamId, gf }) => ({ teamId, gf }));
  const mostWinsData = data.sort((a, b) => b.pg - a.pg).slice(0, 8).map(({ teamId, pg }) => ({ teamId, pg }));
  const mostDrawsData = data.sort((a, b) => b.pe - a.pe).slice(0, 8).map(({ teamId, pe }) => ({ teamId, pe }));
  const mostLossesData = data.sort((a, b) => b.pp - a.pp).slice(0, 8).map(({ teamId, pp }) => ({ teamId, pp }));

  return {
    bestDefense: bestDefenseData,
    worstDefense: worstDefenseData,
    mostGoals: mostGoalsForData,
    fewestGoals: fewestGoalsForData.reverse(),
    mostWins: mostWinsData,
    mostDraws: mostDrawsData,
    mostLosses: mostLossesData,
  }
}

module.exports = {
  prepareDataForStatistics,
};
