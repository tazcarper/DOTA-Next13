import { ClientDotaProfileDataProviderContext } from "@/providers/DotaClientProvider";
import MatchRender from "@/components/dota/MatchRender";
export default function GuildList({ initialGuildList, initialSteamId }) {
  const guildList = initialGuildList.players.map((player) => {
    const playerInfo = { ...player.steamAccount };
    const playerId = player.steamAccount.id;
    const matches = player.matches.map((match) => {
      return match.players.filter(
        (player) => player.steamAccount.id === playerId
      );
    });
    playerInfo.matches = matches;
    return playerInfo;
  });

  return (
    <div>
      <h2>guild list</h2>
      {guildList.map((guildMember) => {
        console.log(guildMember);
        const { name } = guildMember;
        return (
          <div key={name}>
            <h3>{guildMember.name}</h3>
            <div className="flex flex-col md:flex-row text-center align-middle w-1/2 items-baseline">
              {guildMember.matches.map((match) => {
                const currentMatch = match[0];
                const { matchId } = currentMatch;
                const { isVictory, kills, deaths, assists } = currentMatch;
                const matchProps = {
                  shortName: currentMatch.hero.shortName,
                  displayName: currentMatch.hero.displayName,
                  isVictory,
                  kills,
                  deaths,
                  assists,
                };
                return <MatchRender match={matchProps} key={matchId} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
