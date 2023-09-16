import { getSessionUserId } from "@/utils/sessionDetails";
import MatchRender from "@/components/dota/MatchRender";
import GuildName from "@/components/dota/GuildName";
import getPlayersData from "@/queries/recipes/getPlayersData";
import getSteamUserData from "@/queries/recipes/getSteamUserData";
import { getClient } from "@/lib/apolloClient";
import buildGuildList from "@/utils/buildGuildList";
export default async function GuildList() {
  const userId = await getSessionUserId();

  const { data, error } = await getSteamUserData({
    variables: { steamAccountId: parseInt(userId) },
  });

  const guildInfo = data?.guildMember?.guild;
  const guildMemberList = data?.guildMember?.guild?.members;

  // Not in a guild
  if (!guildMemberList) {
    return null;
  }
  const allPlayerData = await getPlayersData({
    membersList: guildMemberList,
  });

  const membersList = allPlayerData.sort((a, b) =>
    a.steamAccount.name.localeCompare(b.steamAccount.name)
  );

  const guildList = buildGuildList({ membersList });

  return (
    <div className="flex flex-col text-center">
      <GuildName guildInfo={guildInfo} />
      <h2 className="my-5 text-4xl">Guild Members</h2>
      {guildList.map((guildMember) => {
        const { name, avatar } = guildMember;
        return (
          <div
            key={name}
            className=" mx-auto flex flex-row justify-center w-full"
          >
            <div className="w-1/2">
              <div className="flex flex-row w-full my-5">
                <img className="rounded-full w-10 mr-3" src={avatar} />
                <h3 className="text-gray-400 text-2xl">{guildMember.name}</h3>
              </div>
              <div className="flex flex-col md:flex-row text-center align-middle w-full items-baseline">
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
                    isActive: currentMatch.isActive,
                  };
                  return <MatchRender match={matchProps} key={id} />;
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
