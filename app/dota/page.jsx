import { getClient } from "@/lib/apolloClient";
import MatchList from "@/components/dota/MatchList";
import PlayerQuery from "@/queries/PlayerQuery";
export const revalidate = 5;

export default async function Dota() {
  // const client = getClient();
  // const { data, error } = await client.query({
  //   query: PlayerQuery,
  //   variables: { steamAccountId: 9489003 },
  // });

  // const { player } = data;
  return (
    <div>
      <h1>Recent heros for </h1>
      <MatchList />
    </div>
  );
}
