function sortLastGames(element) {
  const nonEmpty = element.filter(e => e !== "");
  const empty = element.filter(e => e === "");

  return [...nonEmpty, ...empty];
}

module.exports = sortLastGames;