import getMatches from "@/queries/recipes/getMatches";

// utils
import generateMatchGroups from "@/utils/generateMatchGroups";
import { ChallengeMethods } from "@/utils/quests/questConditions";
import { findSequentialMatches } from "@/utils/quests/findSequentialMatches";
import { findMatchesWithinRange } from "@/utils/quests/findMatchesWithinRange";

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

  const { activeChallenges, successChallenges } = await getUserChallenges({
    userId,
    supabase,
  });
  console.log("success", successChallenges);
  console.log(activeChallenges);
  // Build the conditions list

  const challengeConditionGroups = {
    sequential: [],
    nonSequential: [],
  };
  activeChallenges.forEach((challenge) => {
    const currentChallenge = {
      ...challenge.challenges,
      condition: ChallengeMethods[challenge?.challenge_id].condition,
    };
    if (currentChallenge.sequential) {
      challengeConditionGroups.sequential.push(currentChallenge);
    } else {
      challengeConditionGroups.nonSequential.push(currentChallenge);
    }
  });

  console.log(challengeConditionGroups);
  let conditionObj = {};

  const groupMatches = generateMatchGroups(matchList);

  const results = groupMatches.map((group) => {
    let matches = group.map((match) => match.players[0]);

    const sequentialConditions = findSequentialMatches(
      matches,
      challengeConditionGroups.sequential
    );

    // update this to get the range and qualifying matches from conditions
    const nonSequentialConditions = findMatchesWithinRange({
      matches,
      conditions: challengeConditionGroups.sequential,
    });

    return {
      matches: [...group],
      conditions: { ...sequentialConditions },
    };
  });

  console.log(results);

  // const reverseIt = results.reverse();

  // Dont show first one since it will always be visible on dashboard
  results.shift();
  return (
    <>
      <GroupMatchList groupMatches={results} />
    </>
  );
}
