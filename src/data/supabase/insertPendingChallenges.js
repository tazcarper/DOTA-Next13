export default async function insertPendingChallenges({
  userId,
  pendingChallenges,
  supabaseClient,
  reset = false,
}) {
  let responseError = null;

  let { data: currentPendingChallenges, error: currentPendingChallengesError } =
    await supabaseClient
      .from("user_challenges")
      .select("challenges (*)")
      .eq("user_id", userId)
      .eq("pending", true);

  if (currentPendingChallengesError) {
    console.error("Error fetching challenges:", currentPendingChallengesError);
    responseError = currentPendingChallengesError;
    return;
  }

  currentPendingChallenges = currentPendingChallenges.map(
    (challenge) => challenge.challenges
  );

  const pendingCount = currentPendingChallenges.length;

  if (pendingCount !== 0) {
    return { data: currentPendingChallenges, error: "Already found 3" };
  }

  pendingChallenges = pendingChallenges.map(
    (challenge) => challenge.challenge_id
  );

  const challengesToInsert = pendingChallenges.map((challengeId) => {
    return {
      user_id: userId,
      challenge_id: challengeId,
      pending: true,
      pending_time: new Date(),
    };
  });
  const { data, error } = await supabaseClient
    .from("user_challenges")
    .insert(challengesToInsert)
    .select("challenges (*)");

  if (error) {
    console.error("Error saving challenge:", error);
    responseError = error;
    return;
  }

  const challengeList = data.map((challenge) => challenge.challenges);

  return { data: challengeList, error: error };
}
