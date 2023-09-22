export default async function getUserChallenges({ userId, supabase }) {
  let { data: userChallengesData, error: userChallengesError } = await supabase
    .from("user_challenges")
    .select("challenges (*), *")
    .eq("user_id", userId);
  if (userChallengesError) {
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
