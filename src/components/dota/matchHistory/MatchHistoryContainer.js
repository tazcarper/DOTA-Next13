import getMatches from "@/queries/recipes/getMatches";

// utils
import generateMatchGroups from "@/utils/generateMatchGroups";
import {ChallengeMethods} from "@/utils/quests/questConditions";
import {findSequentialMatches,} from "@/utils/quests/findSequentialMatches"

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

  const {activeChallenges} = await getUserChallenges({userId, supabase});

  
  // Build the conditions list
  const challengeConditions = activeChallenges.map((challenge => {
    const challengeConditions = ChallengeMethods[challenge.challenge_id]
    return {
      condition: challengeConditions,
      challenge_id: challenge.challenge_id,
    }
  }));

  console.log(challengeConditions)

  let conditionObj = {}
  challengeConditions.map((i) => {
    conditionObj[i.challenge_id] = i.condition
  })
 
  console.log(conditionObj)
  const groupMatches = generateMatchGroups(matchList);

  const results = groupMatches.map((group) => {
  let matches = group.map((match) => match.players[0])
  console.log( findSequentialMatches(matches, conditionObj))
  return {...findSequentialMatches(matches, conditionObj), matches: matches.map((match) => match.hero.shortName)}
  
  })

const reverseIt = results.reverse();


  // Dont show first one since it will always be visible on dashboard
  groupMatches.shift();
  return (
    <>
      <GroupMatchList groupMatches={groupMatches}   />
    </>
  );
}
