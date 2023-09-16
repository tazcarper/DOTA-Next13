import { getServerSession } from "next-auth/next";
import { options } from "@/auth/options";
import { toUserID } from "@/utils/steamConvert";
export async function getSessionUserId() {
  const session = await getServerSession(options(null));
  if (!session) {
    return null;
  }
  const {
    steam: { steamid },
  } = session?.user;

  // Convert steamId to userID
  return toUserID(BigInt(steamid));
}
