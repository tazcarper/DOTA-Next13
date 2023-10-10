import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import addMediaToChallenge from "@/data/supabase/helpers/addMediaToChallenge";

export default async function getUserChallenges({ userId, supabase = false }) {
  // default to server component supabase
  if (!supabase) {
    supabase = createServerComponentClient({ cookies });
  }

  let { data: userChallengesData, error: userChallengesError } = await supabase
    .from("user_challenges")
    .select("challenges (*), *")
    .eq("user_id", userId);
  if (userChallengesError) {
    console.error(userChallengesError);
    return { error: "Failed to get challenges from DB" };
  }

  let pendingChallenges = [];
  let activeChallenges = [];
  let successChallenges = [];
  let failedChallenges = [];
  let userChallenges = [];

  let updatedUserData = await addMediaToChallenge({
    challengeData: userChallengesData.map((challenge) => challenge),
    supabase,
  });

  updatedUserData.forEach(async (challenge) => {
    userChallenges.push(challenge);

    if (challenge.pending) {
      pendingChallenges.push(challenge);
    } else if (challenge.active) {
      activeChallenges.push(challenge);
    } else if (challenge.success) {
      successChallenges.push(challenge);
    } else {
      failedChallenges.push(challenge);
    }
  });

  return {
    activeChallenges,
    pendingChallenges,
    userChallenges,
    successChallenges,
    failedChallenges,
  };
}
