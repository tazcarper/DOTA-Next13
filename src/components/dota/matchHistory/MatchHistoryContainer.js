import getMatches from "@/queries/recipes/getMatches";
import { simpleKillChallenge } from "@/utils/quests/questConditions";

// utils
import generateMatchGroups from "@/utils/generateMatchGroups";
import { ChallengeMethods } from "@/utils/quests/questConditions";
import { findSequentialMatches } from "@/utils/quests/findSequentialMatches";

// auth
import { options } from "@/auth/options";
import { getSteamBaseData } from "@/utils/steamConvert";
import { getServerSession } from "next-auth/next";
import GroupMatchList from "@/components/dota/matchHistory/GroupMatchList";
import getUserChallenges from "@/src/data/supabase/getUserChallenges";

// supa
import { cookies } from "next/headers";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function MatchHistoryContainer() {
  const session = await getServerSession(options(null));
  const steamBaseData = getSteamBaseData(session);
  const supabase = createServerComponentClient({ cookies });
  const { userId } = steamBaseData;

  const matchList = await getMatches({ userId, take: 10 });

  const { activeChallenges } = await getUserChallenges({ userId, supabase });

  // Build the conditions list
  const challengeConditions = activeChallenges.map((challenge) => {
    const challengeConditions = ChallengeMethods[challenge.challenge_id];
    return {
      condition: challengeConditions,
      challenge_id: challenge.challenge_id,
    };
  });

  let conditionObj = {};
  challengeConditions.map((i) => {
    conditionObj[i.challenge_id] = i.condition;
  });

  const groupMatches = generateMatchGroups(matchList);

  const results = groupMatches.map((group) => {
    let matches = group.map((match) => match.players[0]);
    const tempConditions = [
      {
        challenge_id: 13,
        ...simpleKillChallenge,
      },
    ];
    return {
      matches: [...group],
      conditions: findSequentialMatches(matches, tempConditions),
    };
  });

  // const reverseIt = results.reverse();

  // Dont show first one since it will always be visible on dashboard
  results.shift();
  return (
    <>
      <GroupMatchList groupMatches={results} />
    </>
  );
}
