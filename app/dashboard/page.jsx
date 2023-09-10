import MatchList from "@/components/dota/MatchList";
import GuildList from "@/components/dota/GuildList";
import { options } from "@/auth/options";
import { getServerSession } from "next-auth/next";
import { toUserID } from "@/utils/steamConvert";
import { getClient } from "@/lib/apolloClient";
import PlayerQuery from "@/queries/PlayerQuery";
import { Suspense } from "react";
import Loading from "@/components/shared/Loading";
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

  if (error) {
    return <div>error</div>;
  }

  const initialGuildList = data?.player?.guildMember?.guild?.members;
  const membersList = initialGuildList
    .map((member) => member.steamAccountId)
    .sort();

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <MatchList initialSteamId={userId} />
      </Suspense>
      <Suspense fallback={<Loading />}>
        <GuildList initialGuildList={membersList} initialSteamId={userId} />
      </Suspense>
    </div>
  );
}
