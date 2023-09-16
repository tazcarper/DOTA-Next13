import PlayerQuery from "@/queries/PlayerQuery";
import { getClient } from "@/lib/apolloClient";
export default async function getPlayerdata({ userId }) {
  const client = getClient();
  if (!userId || !client) return null;
  const { data, error } = await client.query({
    query: PlayerQuery,
    variables: { steamAccountId: parseInt(userId) },
  });
  return { data, error };
}
