import PlayerQuery from "@/queries/PlayerQuery";
export default async function getPlayerdata({ userId, client }) {
  if (!userId || !client) return null;
  const { data, error } = await client.query({
    query: PlayerQuery,
    variables: { steamAccountId: parseInt(userId) },
  });
  return { data, error };
}
