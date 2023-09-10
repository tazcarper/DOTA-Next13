export default async function getUserInformation(
  userId: string,
  supabaseClient
) {
  const { data, error } = await supabaseClient
    .from("users")
    .select()
    .eq("user_id", userId);
  console.log(data, error);
  return { data, error };
}
