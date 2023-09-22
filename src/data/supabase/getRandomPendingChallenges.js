import { getRandomItems } from "@/utils/math/getRandomItems";

export default async function getRandomPendingChallenges({
  supabase,
  activeChallenges,
}) {
  const activeChallengeIds = activeChallenges.map(
    (challenge) => challenge.challenge_id
  );
  // Convert to PostgREST syntax
  const activeChallengeIdString = `(${activeChallengeIds.join(",")})`;

  const { data: challengeList, error } = await supabase
    .from("challenges")
    .select()
    .not("challenge_id", "in", activeChallengeIdString);

  if (error) {
    <div>Error fetching quests</div>;
  }

  const dailyOptions = getRandomItems(challengeList, 3);

  const updatedPendingChallenges = await Promise.all(
    dailyOptions.map(async (challenge) => {
      const challengeImage = await supabase.storage
        .from("quest_images")
        .getPublicUrl(challenge.image);
      challenge.pending = true;
      challenge.coverImage = challengeImage?.data?.publicUrl;
      return challenge;
    })
  );
  return updatedPendingChallenges;
}
