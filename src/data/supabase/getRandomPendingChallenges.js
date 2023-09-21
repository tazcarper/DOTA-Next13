import { getRandomItems } from "@/utils/math/getRandomItems";

export default async function getRandomPendingChallenges({ supabase }) {
  const { data: challengeList, error } = await supabase
    .from("challenges")
    .select();

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
