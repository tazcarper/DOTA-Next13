import { ClientDotaProfileDataProviderContext } from "@/providers/DotaClientProvider";
import MatchRender from "@/components/dota/MatchRender";
export default function GuildList({ initialGuildList, initialSteamId }) {
  const guildList = initialGuildList.players.map((player) => {
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

  return (
    <div>
      <h2 className="my-5 text-4xl">Guild Members</h2>
      {guildList.map((guildMember) => {
        const { name, avatar } = guildMember;
        return (
          <div key={name}>
            <div className="flex flex-row w-full my-5">
              <img className="rounded-full w-10 mr-3" src={avatar} />
              <h3 className="text-gray-400 text-2xl">{guildMember.name}</h3>
            </div>
            <div className="flex flex-col md:flex-row text-center align-middle w-1/2 items-baseline">
              {guildMember.matches.map((match) => {
                const currentMatch = match;

                const { startDateTime, id } = match;
                const { isVictory, kills, deaths, assists } = currentMatch;
                const matchProps = {
                  shortName: currentMatch.hero.shortName,
                  displayName: currentMatch.hero.displayName,
                  isVictory,
                  kills,
                  deaths,
                  assists,
                  startDateTime,
                  id,
                };
                return <MatchRender match={matchProps} key={id} />;
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
