import { getSteamBaseData } from "@/utils/steamConvert";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { options } from "@/auth/options";
import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";
import ChallengeCard from "@/components/userChallenges/ChallengeCard";
import addMediaToChallenge from "@/data/supabase/helpers/addMediaToChallenge";
import ResetButton from "@/components/userChallenges/ResetButton";
import ActiveChallengeCards from "./ActiveChallengeCards";

export default async function ActiveChallengeContainer() {
  const supabase = createServerComponentClient({ cookies });
  const session = await getServerSession(options(null));
  const steamBaseData = getSteamBaseData(session);

  const { userId } = steamBaseData;

  let { data: activeChallenges, error: userChallengesError } = await supabase
    .from("user_challenges")
    .select("challenges (*), *")
    .eq("user_id", userId)
    .eq("active", true);
  if (userChallengesError) {
    return <div>Get current challenges error</div>;
  }
  console.log("ACTIVE CHECk");
  console.log(activeChallenges);

  // Add start time
  // activeChallenges = activeChallenges.map((challenge) => {
  //   return { ...challenge.challenges, start_time: challenge.start_time };
  // });

  activeChallenges = await addMediaToChallenge({
    challengeData: activeChallenges,
    supabase,
  });

  return (
    <div className="challengeWrapper mt-10">
      <h2 className="text-2xl uppercase text-center">Available Challenges</h2>
      <ResetButton userId={userId} />
      <div className="w-full">
        {activeChallenges?.length === 0 && (
          <p className="text-center">
            You have yet to select any challenges, coward!
          </p>
        )}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-5">
          <ActiveChallengeCards activeChallenges={activeChallenges} />
        </div>
      </div>
    </div>
  );
}
