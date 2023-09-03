import MatchList from "@/components/dota/MatchList";
import { options } from "@/auth/options";
import { getServerSession } from "next-auth/next";
import { toUserID } from "@/utils/steamConvert";
export const revalidate = 5;
import { getClient } from "@/lib/apolloClient";
import PlayerQuery from "@/queries/PlayerQuery";
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

  console.log(data);

  return (
    <div>
      <MatchList initialSteamId={userId} />
    </div>
  );
}
