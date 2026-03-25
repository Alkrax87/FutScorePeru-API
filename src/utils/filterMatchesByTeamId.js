module.exports.filterMatchesByTeamId = (fixture, teamId) => {
  return {
    phase1: filterMatches(fixture.phase1, teamId),
    phase2: filterMatches(fixture.phase2, teamId),
  };
};

function filterMatches(phaseFixture, teamId) {
  return phaseFixture.flatMap((matchday) => {

    const teamMatches = matchday.matches.filter((match) => match.home === teamId || match.away === teamId);

    if (teamMatches.length === 0) {
      return {
        round: matchday.round,
        home: teamId,
      }
    } else {
      return teamMatches.map((match) => {
        const { group, ...matchData } = match;

        return {
          round: matchday.round,
          ...matchData,
        };
      });
    }
  });
}