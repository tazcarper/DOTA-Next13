import MatchList from "@/components/dota/MatchList";
import MatchHistoryContainer from "@/components/dota/matchHistory/MatchHistoryContainer";
import ChallengeSelectorContainer from "@/components/userChallenges/challengeSelector/ChallengeSelectorContainer";
import Loading from "@/components/shared/Loading";
import ActiveChallengeContainer from "@/components/userChallenges/activeChallenges/ActiveChallengeContainer";
import ChallengeContainer from "@/components/userChallenges/ChallengeContainer";

import getPlayerData from "@/queries/recipes/getPlayerData";
import initiateUser from "@/data/supabase/helpers/initiateUser";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { getSteamBaseData } from "@/utils/steamConvert";
import { getClient } from "@/lib/apolloClient";

import { options } from "@/auth/options";
import { getServerSession } from "next-auth/next";
import { Suspense } from "react";
import { cookies } from "next/headers";

export default async function Dota(props) {
  const session = await getServerSession(options(null));
  if (!session) {
    return <div>error</div>;
  }

  // Setup server clients
  const supabase = createServerComponentClient({ cookies });
  const client = getClient();

  const steamBaseData = getSteamBaseData(session);

  // Check if we have DB information
  const supabase_user_data = await initiateUser({
    steamBaseData,
    supabaseClient: supabase,
  });

  const { data, error } = await getPlayerData({
    client,
    userId: steamBaseData.userId,
  });

  if (error) {
    return <div>error</div>;
  }

  const initialGuildList = data?.player?.guildMember?.guild?.members;
  const membersList = initialGuildList
    .map((member) => member.steamAccountId)
    .sort();

  return (
    <div className="px-3">
      <Suspense fallback={<Loading />}>
        <MatchList initialSteamId={steamBaseData.userId} />
      </Suspense>

      <div className="flex">
        <div className="w-1/2">
          <MatchHistoryContainer />
        </div>
        <div className="w-1/2">
          <ChallengeContainer>
          <Suspense fallback={<Loading />}>
            <ActiveChallengeContainer />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <ChallengeSelectorContainer />
          </Suspense>
          </ChallengeContainer>
        </div>
      </div>
    </div>
  );
}
