import { Suspense } from "react";
import MatchRender from "@/components/dota/MatchRender";
import GuildName from "@/components/dota/GuildName";
import getPlayersData from "@/queries/helpers/getPlayersData";
import Loading from "@/components/shared/Loading";
import { getClient } from "@/lib/apolloClient";
import buildGuildList from "@/utils/buildGuildList";
export default async function GuildList({ initialGuildList = [] }) {
  const client = getClient();
  const allPlayerData = await getPlayersData({
    membersList: initialGuildList,
    client,
  });

  const guildList = buildGuildList(allPlayerData);

  return (
    <div className="flex flex-col text-center">
      <GuildName />
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
