import { getSessionUserId } from "@/utils/sessionDetails";
import getSteamUserData from "@/queries/recipes/getSteamUserData";
export default async function UserInfo({ initialState }) {
  const userId = await getSessionUserId();
  const { data, error } = await getSteamUserData({
    variables: { steamAccountId: parseInt(userId) },
  });

  if (error) {
    // Placeholder or blank image can be added here
    return null;
  }
  return <img className="rounded-full w-10" src={data?.steamAccount?.avatar} />;
}
