import MatchesQuery from "@/queries/MatchesQuery";
import { getClient } from "@/lib/apolloClient";

export default async function getMatches({ userId, take = 5, after }) {
  const client = getClient();
  if (!userId) return [];
  const matchQuery = await client.query({
    query: MatchesQuery,
    variables: { steamAccountId: userId, take, after },
  });
  return matchQuery?.data?.player?.matches;
}
