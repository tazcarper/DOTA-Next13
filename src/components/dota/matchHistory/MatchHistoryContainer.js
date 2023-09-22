import getMatches from "@/queries/recipes/getMatches";

// utils
import generateMatchGroups from "@/utils/generateMatchGroups";

// auth
import { options } from "@/auth/options";
import { getSteamBaseData } from "@/utils/steamConvert";
import { getServerSession } from "next-auth/next";
import GroupMatchList from "@/components/dota/matchHistory/GroupMatchList";

export default async function MatchHistoryContainer() {
  const session = await getServerSession(options(null));
  const steamBaseData = getSteamBaseData(session);

  const { userId } = steamBaseData;

  const matchList = await getMatches({ userId, take: 20 });

  const groupMatches = generateMatchGroups(matchList);
  // Dont show first one since it will always be visible on dashboard
  groupMatches.shift();
  return (
    <>
      <GroupMatchList groupMatches={groupMatches} />
    </>
  );
}
