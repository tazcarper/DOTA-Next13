import getUserInformation from "../getUserInformation";
import insertUserInformation from "../insertUserInformation";
export default async function initiateUser({
  steamBaseData: { userId, steamId, avatarfull, name },
  supabaseClient,
}) {
  const { data: userInfo, error: userInfoError } = await getUserInformation(
    userId,
    supabaseClient
  );
  if (userInfo || userInfo.length === 0) {
    const insertUser = await insertUserInformation(
      {
        steam_id: steamId,
        username: name,
        avatar: avatarfull,
        user_id: userId,
      },
      supabaseClient
    );
    return { data: insertUser };
  } else {
    return { data: userInfo, error: userInfoError };
  }
}
