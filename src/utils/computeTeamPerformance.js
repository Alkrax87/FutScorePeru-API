module.exports.computeTeamPerformance = (teamPerformanceData) => {
  if (!Array.isArray(teamPerformanceData)) {
    return processData([teamPerformanceData])[0];
  } else {
    return processData(teamPerformanceData);
  }
};

function processData(data) {
  return data.map((team) => ({
    teamId: team.teamId,
    phase1: {
      points: team.phase1.w * 3 + team.phase1.d - team.phase1.sanction,
      played: team.phase1.w + team.phase1.d + team.phase1.l,
      w: team.phase1.w,
      d: team.phase1.d,
      l: team.phase1.l,
      gf: team.phase1.gf,
      ga: team.phase1.ga,
      gd: team.phase1.gf - team.phase1.ga,
      sanction: team.phase1.sanction,
    },
    phase2: {
      points: team.phase2.w * 3 + team.phase2.d - team.phase2.sanction + team.phase2.addition,
      played: team.phase2.w + team.phase2.d + team.phase2.l,
      w: team.phase2.w,
      d: team.phase2.d,
      l: team.phase2.l,
      gf: team.phase2.gf,
      ga: team.phase2.ga,
      gd: team.phase2.gf - team.phase2.ga,
      sanction: team.phase2.sanction,
      addition: team.phase2.addition,
    },
    overall: {
      points:
        team.phase1.w * 3 + team.phase1.d +
        team.phase2.w * 3 + team.phase2.d -
        (team.phase1.sanction + team.phase2.sanction) + team.phase2.addition,
      played: team.phase1.w + team.phase1.d + team.phase1.l + team.phase2.w + team.phase2.d + team.phase2.l,
      w: team.phase1.w + team.phase2.w,
      d: team.phase1.d + team.phase2.d,
      l: team.phase1.l + team.phase2.l,
      gf: team.phase1.gf + team.phase2.gf,
      ga: team.phase1.ga + team.phase2.ga,
      gd: team.phase1.gf - team.phase1.ga + (team.phase2.gf - team.phase2.ga),
      sanction: team.phase1.sanction + team.phase2.sanction,
      addition: team.phase2.addition,
    },
  }));
}