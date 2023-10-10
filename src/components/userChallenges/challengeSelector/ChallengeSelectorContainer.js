import ChallengeSelector from "@/components/userChallenges/challengeSelector/ChallengeSelector";
import Loading from "@/components/shared/Loading";
import { Suspense } from "react";
import { getSteamBaseData } from "@/utils/steamConvert";
import addMediaToChallenge from "@/data/supabase/helpers/addMediaToChallenge";
import getRandomPendingChallenges from "@/data/supabase/getRandomPendingChallenges";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

import insertPendingChallenges from "@/data/supabase/insertPendingChallenges";
import { getServerSession } from "next-auth/next";
import { options } from "@/auth/options";

import getUserChallenges from "@/data/supabase/getUserChallenges";

export default async function ChallengeSelectorContainer() {
  const supabase = createServerComponentClient({ cookies });
  const session = await getServerSession(options(null));
  const steamBaseData = getSteamBaseData(session);

  const { userId } = steamBaseData;

  let { pendingChallenges, activeChallenges } = await getUserChallenges({
    userId,
    supabase,
  });

  // If no pending, get pending and save in DB
  if (pendingChallenges?.length <= 0) {
    let randomPendingChallenges = await getRandomPendingChallenges({
      supabase,
      activeChallenges,
    });
    const { data, error } = await insertPendingChallenges({
      userId,
      pendingChallenges: randomPendingChallenges,
      supabaseClient: supabase,
    });

    pendingChallenges = data;
  }

  const updatedPendingChallenges = await addMediaToChallenge({
    challengeData: pendingChallenges,
    supabase,
  });

  console.log("pending");
  console.log(updatedPendingChallenges);

  return (
    <div className="challengeWrapper mt-10">
      <h2 className="text-2xl uppercase text-center">Available Challenges</h2>
      <Suspense fallback={<Loading />}>
        <ChallengeSelector
          pendingChallenges={updatedPendingChallenges}
          activeChallenges={activeChallenges}
          userId={userId}
        />
      </Suspense>
    </div>
  );
}
