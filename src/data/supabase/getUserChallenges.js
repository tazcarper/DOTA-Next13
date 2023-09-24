import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function getUserChallenges({ userId, supabase = false }) {

  // default to server component supabase
  if (!supabase){
     supabase = createServerComponentClient({ cookies });
  }

  let { data: userChallengesData, error: userChallengesError } = await supabase
    .from("user_challenges")
    .select("challenges (*), *")
    .eq("user_id", userId);
  if (userChallengesError) {
    console.error(userChallengesError)
    return { error: "Failed to get challenges from DB" };
  }

  let pendingChallenges = userChallengesData.filter(
    (challenge) => challenge.pending
  );

  let activeChallenges = userChallengesData.filter(
    (challenge) => challenge.active
  );

  // Challenge details that are pending
  let userChallenges = userChallengesData.map(
    (challenge) => challenge.challenges
  );

  return {
    activeChallenges,
    pendingChallenges,
    userChallenges,
  };
}
