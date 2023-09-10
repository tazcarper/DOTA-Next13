import MatchList from "@/components/dota/MatchList";
import GuildList from "@/components/dota/GuildList";
import { options } from "@/auth/options";
import { getServerSession } from "next-auth/next";
import { toUserID } from "@/utils/steamConvert";
import { getClient } from "@/lib/apolloClient";
import getPlayerData from "@/queries/helpers/getPlayerData";
import { Suspense } from "react";
import initiateUser from "@/data/supabase/helpers/initiateUser";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// Components
import Loading from "@/components/shared/Loading";
export default async function Dota(props) {
  const session = await getServerSession(options(null));
  if (!session) {
    // Can redirect or do whatever here
  }

  const {
    user: {
      name,
      steam: { steamid, avatarfull },
    },
  } = session;

  // Setup server clients
  const supabase = createServerComponentClient({ cookies });
  const client = getClient();

  // Convert steamId to userID
  const userId = toUserID(BigInt(steamid));

  const steamBaseData = {
    steamid,
    name,
    avatarfull,
    userId,
  };

  console.log(steamBaseData);

  // Check if we have DB information
  const supabase_user_data = await initiateUser({
    steamBaseData,
    supabaseClient: supabase,
  });

  console.log(supabase_user_data);

  const { data, error } = await getPlayerData({ client, userId });

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
