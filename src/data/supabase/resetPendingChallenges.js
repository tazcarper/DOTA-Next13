export default async function resetPendingChallenges({
  userId,
  supabaseClient,
}) {
  const { data, error } = await supabaseClient
    .from("user_challenges")
    .delete()
    .eq("user_id", userId)
    .eq("pending", true);

  if (error) {
    console.log(error);
  }

  return { data, error };
}
