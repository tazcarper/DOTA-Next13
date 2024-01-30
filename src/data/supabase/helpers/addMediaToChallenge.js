export default async function getChallengeMedia({ challengeData, supabase }) {
  return await Promise.all(
    challengeData.map(async (challenge) => {
      const challengeImage = await supabase.storage
        .from("quest_images")
        .getPublicUrl(challenge?.challenges?.image);
      challenge.challenges.coverImage = challengeImage?.data?.publicUrl;
      return challenge;
    })
  );
}
