import GuildQuery from "@/queries/GuildQuery";
import { getClient } from "@/lib/apolloClient";

export default async function getPlayerData({ membersList }) {
  const client = getClient();
  if (!membersList || membersList <= 0) return [];
  const promiseBatch = [];
  const batchSize = 5;
  for (let i = 0; i < membersList.length; i += batchSize) {
    const batch = membersList.slice(i, i + batchSize);
    const ids = batch.map((i) => i.steamAccountId);
    const guildPromise = client.query({
      query: GuildQuery,
      variables: { steamAccountIds: ids },
    });

    promiseBatch.push(guildPromise);
  }

  return Promise.allSettled(promiseBatch).then((groups) => {
    const groupings = groups.map((group) => {
      if (group.status === "fulfilled") {
        return group?.value?.data?.players;
      }
      return [];
    });
    return groupings
      .flat()
      .filter((player) => player.matches.length > 0)
      .sort((a, b) => a.steamAccount.name.localeCompare(b.steamAccount.name));
  });
}
