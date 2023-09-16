import { getClient } from "@/lib/apolloClient";
import PlayerQuery from "@/queries/PlayerQuery";

export default async function getSteamUserData({ variables }) {
  const client = getClient();
  const { data, error } = await client.query({
    query: PlayerQuery,
    variables,
  });
  return { data: data?.player, error };
}
