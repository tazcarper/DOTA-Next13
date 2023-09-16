export default async function insertUserInformation(user, supabaseClient) {
  const { data, error } = await supabaseClient
    .from("users")
    .insert(user)
    .select();
  return { data, error };
}
