import { Suspense } from "react";
import ChallengeCard from "@/components/userChallenges/ChallengeCard";
import ChallengeSelector from "@/components/userChallenges/ChallengeSelector";
import Loading from "@/components/shared/Loading";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// auth
import { options } from "@/auth/options";
import { getSteamBaseData } from "@/utils/steamConvert";
import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";

export default async function Challenges() {
  const supabase = createServerComponentClient({ cookies });
  const session = await getServerSession(options(null));
  const steamBaseData = getSteamBaseData(session);
  const { userId } = steamBaseData;

  const { data: userChallenges, error: userChallengesError } = await supabase
    .from("user_challenges")
    .select("*")
    .eq("user_id", userId)
    .eq("active", true);

  if (userChallengesError) {
    <div>Get current challenges error</div>;
  }

  return (
    <div className="mx-3 w-1/2">
      <h2 className="text-3xl mt-10 text-success mb-5 uppercase underline">
        Challenges
      </h2>
      {findActiveChallenges.length > 0 && (
        <div className="challengeWrapper">
          <div>
            <h2 className="text-2xl text-center uppercase">
              Active Challenges
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-5">
            {/* Show active challenges or pending */}
            {findActiveChallenges?.map((challenge) => (
              <div key={challenge.challenge_id}>
                <ChallengeCard challenge={challenge} />
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="challengeWrapper">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-5">
          <Suspense fallback={<Loading />}>
            <ChallengeSelector />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
