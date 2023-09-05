import MatchList from "@/components/dota/MatchList";
import GuildList from "@/components/dota/GuildList";
import { options } from "@/auth/options";
import { getServerSession } from "next-auth/next";
import { toUserID } from "@/utils/steamConvert";
import { getClient } from "@/lib/apolloClient";
import PlayerQuery from "@/queries/PlayerQuery";
import GuildQuery from "@/queries/GuildQuery";

async function getPlayerData({ membersList, client }) {
  const promiseBatch = [];
  const batchSize = 5;
  for (let i = 0; i < membersList.length; i += batchSize) {
    const batch = membersList.slice(i, i + batchSize);

    const guildPromise = client.query({
      query: GuildQuery,
      variables: { steamAccountIds: batch },
    });

    promiseBatch.push(guildPromise);
  }

  return Promise.allSettled(promiseBatch).then((groups) => {
    const groupings = groups.map((group) => {
      if (group.status === "fulfilled") {
        return group?.value?.data?.players;
      }
      return [];
    });
    return groupings
      .flat()
      .filter((player) => player.matches.length > 0)
      .sort((a, b) => a.steamAccount.name.localeCompare(b.steamAccount.name));
  });
}

export default async function Dota(props) {
  const session = await getServerSession(options(null));

  if (!session) {
    // Can redirect or do whatever here
  }

  const {
    user: {
      name,
      steam: { steamid },
    },
  } = session;

  // Convert steamId to userID
  const userId = toUserID(BigInt(steamid));

  const client = getClient();
  const { data, error } = await client.query({
    query: PlayerQuery,
    variables: { steamAccountId: parseInt(userId) },
  });
  console.log(error);

  if (error) {
    return <div>error</div>;
  }

  const initialGuildList = data?.player?.guildMember?.guild?.members;
  const membersList = initialGuildList
    .map((member) => member.steamAccountId)
    .sort();

  const allPlayerData = await getPlayerData({ membersList, client });
  return (
    <div>
      <MatchList initialSteamId={userId} />
      <GuildList initialGuildList={allPlayerData} initialSteamId={userId} />
    </div>
  );
}
