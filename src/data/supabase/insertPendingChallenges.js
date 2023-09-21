export default async function insertPendingChallenges({
  userId,
  pendingChallenges,
  supabaseClient,
  reset = false,
}) {
  let responseError = null;

  const {
    data: currentPendingChallenges,
    error: currentPendingChallengesError,
  } = await supabaseClient
    .from("user_challenges")
    .select("id")
    .eq("user_id", userId)
    .eq("pending", true);

  if (currentPendingChallengesError) {
    console.error("Error fetching challenges:", currentPendingChallengesError);
    responseError = currentPendingChallengesError;
    return;
  }

  const pendingCount = currentPendingChallenges.length;

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
    .select();

  if (error) {
    console.error("Error saving challenge:", error);
    responseError = error;
    return;
  }

  const challengeIds = data.map((challenge) => challenge.challenge_id);

  const { data: challengeData, error: challengeError } = await supabaseClient
    .from("challenges")
    .select("*")
    .in("challenge_id", challengeIds);

  if (challengeError) {
    console.error("Error getting challenges after saving:", challengeError);
    responseError = challengeError;
    return;
  }

  return { data: challengeData, error: challengeError };
}
