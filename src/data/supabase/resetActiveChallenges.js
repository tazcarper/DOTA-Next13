export default async function resetPendingChallenges({ userId, supabase }) {
  const { data, error } = await supabase
    .from("user_challenges")
    .delete()
    .eq("user_id", userId)
    .eq("active", true);

  if (error) {
    console.log(error);
  }

  return { data, error };
}
