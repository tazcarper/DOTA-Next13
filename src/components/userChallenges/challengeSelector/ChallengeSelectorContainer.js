import ChallengeSelector from "@/components/userChallenges/challengeSelector/ChallengeSelector";
import Loading from "@/components/shared/Loading";
import { Suspense } from "react";
import { getSteamBaseData } from "@/utils/steamConvert";
import addMediaToChallenge from "@/data/supabase/helpers/addMediaToChallenge";
import getRandomPendingChallenges from "@/data/supabase/getRandomPendingChallenges";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { options } from "@/auth/options";
import insertPendingChallenges from "@/data/supabase/insertPendingChallenges";
import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";

export default async function ChallengeSelectorContainer() {
  const supabase = createServerComponentClient({ cookies });
  const session = await getServerSession(options(null));
  const steamBaseData = getSteamBaseData(session);

  const { userId } = steamBaseData;

  let { data: findPendingChallenges, error: userChallengesError } =
    await supabase
      .from("user_challenges")
      .select("challenges (*)")
      .eq("user_id", userId)
      .eq("pending", true);
  if (userChallengesError) {
    return <div>Get current challenges error</div>;
  }

  findPendingChallenges = findPendingChallenges.map(
    (challenge) => challenge.challenges
  );
  // If no pending, get pending and save in DB
  if (findPendingChallenges?.length <= 0) {
    const pendingChallenges = await getRandomPendingChallenges({ supabase });
    const { data, error } = await insertPendingChallenges({
      userId,
      pendingChallenges: pendingChallenges,
      supabaseClient: supabase,
    });

    findPendingChallenges = data;
  }

  console.log(findPendingChallenges);

  const updatedPendingChallenges = await addMediaToChallenge({
    challengeData: findPendingChallenges,
    supabase,
  });

  return (
    <div className="challengeWrapper">
      <Suspense fallback={<Loading />}>
        <ChallengeSelector
          pendingChallenges={updatedPendingChallenges}
          userId={userId}
        />
      </Suspense>
    </div>
  );
}
