export default function buildGuildList(list = []) {
  if (list.length <= 0) return [];
  return list.map((player) => {
    const playerInfo = { ...player.steamAccount };
    const playerId = player.steamAccount.id;
    const matches = player.matches.map((match) => {
      const { id, startDateTime } = match;
      const playedHero = match.players.filter(
        (player) => player.steamAccount.id === playerId
      );

      playedHero.id = id;
      playedHero.startDateTime = startDateTime;
      return { ...playedHero[0], id, startDateTime };
    });
    playerInfo.matches = matches;
    return playerInfo;
  });
}
