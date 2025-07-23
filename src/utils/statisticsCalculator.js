function prepareDataForStatistics(data, stage1, stage2) {
  const mergedData = data.map(team => ({
    teamId: team.teamId,
    w: team[stage1].w + team[stage2].w,
    d: team[stage1].d + team[stage2].d,
    l: team[stage1].l + team[stage2].l,
    gf: team[stage1].gf + team[stage2].gf,
    ga: team[stage1].ga + team[stage2].ga,
    gd: team[stage1].gf + team[stage2].gf - (team[stage1].ga + team[stage2].ga),
  }));

  return calculateStatistics(structuredClone(mergedData));
}

function calculateStatistics(data) {
  const defenseSorted = data.sort((a, b) => a.ga - b.ga);
  const bestDefenseData = defenseSorted.slice(0, 8).map(({ teamId, ga }) => ({ teamId, ga }));
  const worstDefenseData = defenseSorted.slice(-8).map(({ teamId, ga }) => ({ teamId, ga })).reverse();
  const goalsForSorted = data.sort((a, b) => b.gf - a.gf);
  const mostGoalsForData = goalsForSorted.slice(0, 8).map(({ teamId, gf }) => ({ teamId, gf }));
  const fewestGoalsForData = goalsForSorted.slice(-8).map(({ teamId, gf }) => ({ teamId, gf })).reverse();
  const mostWinsData = data.sort((a, b) => b.w - a.w).slice(0, 8).map(({ teamId, w }) => ({ teamId, w }));
  const mostDrawsData = data.sort((a, b) => b.d - a.d).slice(0, 8).map(({ teamId, d }) => ({ teamId, d }));
  const mostLossesData = data.sort((a, b) => b.l - a.l).slice(0, 8).map(({ teamId, l }) => ({ teamId, l }));
  const goalDifferenceSorted = data.sort((a, b) => b.gd - a.gd);
  const bestGoalDifferenceData = goalDifferenceSorted.slice(0, 8).map(({ teamId, gd }) => ({ teamId, gd }));
  const worstGoalDifferenceData = goalDifferenceSorted.slice(-8).map(({ teamId, gd }) => ({ teamId, gd })).reverse();

  return {
    bestDefense: bestDefenseData,
    worstDefense: worstDefenseData,
    mostGoals: mostGoalsForData,
    fewestGoals: fewestGoalsForData,
    mostWins: mostWinsData,
    mostDraws: mostDrawsData,
    mostLosses: mostLossesData,
    bestGoalDifference: bestGoalDifferenceData,
    worstGoalDifference: worstGoalDifferenceData,
  }
}

module.exports = {
  prepareDataForStatistics,
};