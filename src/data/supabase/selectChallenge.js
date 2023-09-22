export default async function selectChallenge({
  supabase,
  challengeId,
  userId,
}) {
  const { data: existingData, error: existingError } = await supabase
    .from("user_challenges")
    .select("challenges (*)")
    .eq("user_id", userId)
    .eq("challenge_id", challengeId)
    .eq("active", true);

  if (existingError) {
    console.error("Error checking existing challenge:", existingError);
  }
  if (existingData.length > 0) {
    console.log("The challenge is already active for this user.");
    return {
      data: existingData[0].challenges,
      error: "Did not update. Challenges is already active in Database.",
    };
  }

  const { data: updateData, error: updateError } = await supabase
    .from("user_challenges")
    .update({ active: true, pending: false, start_time: new Date() })
    .eq("user_id", userId)
    .eq("challenge_id", challengeId)
    .eq("pending", true)
    .select("challenges (*)");

  if (updateError) {
    console.error("Error updating challenge:", updateError);
  }

  const { data: deleteData, error: deleteError } = await supabase
    .from("user_challenges")
    .delete()
    .eq("user_id", userId)
    .neq("challenge_id", challengeId)
    .eq("pending", true);

  if (deleteError) {
    console.error("Error deleting challenges:", deleteError);
  }
  return { data: updateData, updateError };
}
