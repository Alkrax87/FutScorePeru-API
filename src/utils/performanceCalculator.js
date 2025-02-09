function calculatePerformance(data, stage1, stage2, stage3 = null) {
  return data.map((team) => ({
    teamId: team.teamId,
    [stage1]: {
      points: team[stage1].pg * 3 + team[stage1].pe - (team[stage1].sanction ?? 0),
      pj: team[stage1].pg + team[stage1].pe + team[stage1].pp,
      pg: team[stage1].pg,
      pe: team[stage1].pe,
      pp: team[stage1].pp,
      gf: team[stage1].gf,
      gc: team[stage1].gc,
      dg: team[stage1].gf - team[stage1].gc,
    },
    [stage2]: {
      points: team[stage2].pg * 3 + team[stage2].pe - (team[stage2].sanction ?? 0),
      pj: team[stage2].pg + team[stage2].pe + team[stage2].pp,
      pg: team[stage2].pg,
      pe: team[stage2].pe,
      pp: team[stage2].pp,
      gf: team[stage2].gf,
      gc: team[stage2].gc,
      dg: team[stage2].gf - team[stage2].gc,
    },
    ...(stage3 ? {
      [stage3]: {
        points: team[stage1].pg * 3 + team[stage1].pe + team[stage2].pg * 3 + team[stage2].pe - team.sanction,
        pj: team[stage1].pg + team[stage1].pe + team[stage1].pp + team[stage2].pg + team[stage2].pe + team[stage2].pp,
        pg: team[stage1].pg + team[stage2].pg,
        pe: team[stage1].pe + team[stage2].pe,
        pp: team[stage1].pp + team[stage2].pp,
        gf: team[stage1].gf + team[stage2].gf,
        gc: team[stage1].gc + team[stage2].gc,
        dg: (team[stage1].gf - team[stage1].gc) + (team[stage2].gf - team[stage2].gc)
      }
    } : {})
  }));
}

module.exports = { calculatePerformance };