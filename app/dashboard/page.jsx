import MatchList from "@/components/dota/MatchList";
import GuildList from "@/components/dota/GuildList";
import { options } from "@/auth/options";
import { getServerSession } from "next-auth/next";
import { toUserID } from "@/utils/steamConvert";
export const revalidate = 5;
import { getClient } from "@/lib/apolloClient";
import PlayerQuery from "@/queries/PlayerQuery";
import GuildQuery from "@/queries/GuildQuery";
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
  const { data } = await client.query({
    query: PlayerQuery,
    variables: { steamAccountId: parseInt(userId) },
  });

  const initialGuildList = data?.player?.guildMember?.guild?.members;

  const membersList = initialGuildList.map((member) => member.steamAccountId);
  const { data: guildData, error } = await client.query({
    query: GuildQuery,
    variables: { steamAccountIds: membersList.slice(0, 5) },
  });

  return (
    <div>
      <MatchList initialSteamId={userId} />
      <GuildList initialGuildList={guildData} initialSteamId={userId} />
    </div>
  );
}
