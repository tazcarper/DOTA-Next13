import { getSessionUserId } from "@/utils/sessionDetails";
import getPlayerData from "@/queries/recipes/getPlayerData";
import { getClient } from "@/lib/apolloClient";
export default async function GuildName({ guildInfo }) {
  const { name, memberCount } = guildInfo;
  return (
    <h2 className="text-2xl mt-10 text-success">
      <span className="text-4xl font-bold">{name}</span> - {memberCount} members
    </h2>
  );
}
