import MatchList from "@/components/dota/MatchList";
import { options } from "@/auth/options";
import { getServerSession } from "next-auth/next";
import { toUserID } from "@/utils/steamConvert";
export const revalidate = 5;

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

  return (
    <div>
      <MatchList initialSteamId={userId} />
    </div>
  );
}
