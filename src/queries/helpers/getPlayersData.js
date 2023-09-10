import GuildQuery from "@/queries/GuildQuery";

export default async function getPlayerData({ membersList, client }) {
  if (!membersList || membersList <= 0) return [];
  const promiseBatch = [];
  const batchSize = 5;
  for (let i = 0; i < membersList.length; i += batchSize) {
    const batch = membersList.slice(i, i + batchSize);

    const guildPromise = client.query({
      query: GuildQuery,
      variables: { steamAccountIds: batch },
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
