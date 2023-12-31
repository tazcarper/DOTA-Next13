export default async function getChallengeMedia({ challengeData, supabase }) {
  return await Promise.all(
    challengeData.map(async (challenge) => {
      const challengeImage = await supabase.storage
        .from("quest_images")
        .getPublicUrl(challenge?.image);
      challenge.coverImage = challengeImage?.data?.publicUrl;
      return challenge;
    })
  );
}
