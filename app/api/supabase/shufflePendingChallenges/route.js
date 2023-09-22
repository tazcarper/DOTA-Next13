import authCheck from "@/utils/authSessionCheck";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { toUserID } from "@/utils/steamConvert";
import insertPendingChallenges from "@/data/supabase/insertPendingChallenges";
import resetPendingChallenges from "@/data/supabase/resetPendingChallenges";
import getRandomPendingChallenges from "@/data/supabase/getRandomPendingChallenges";
import getUserChallenges from "@/src/data/supabase/getUserChallenges";
import { NextResponse } from "next/server";
export async function GET(req, res) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const req_user_id = searchParams.get("userid");
  const session = await authCheck();
  const userId = toUserID(BigInt(session.steam.steamid));

  if (parseInt(userId) === parseInt(req_user_id)) {
    // Reset any existing (shuffle)
    await resetPendingChallenges({
      userId: parseInt(userId),
      supabaseClient: supabase,
    });

    let { activeChallenges } = await getUserChallenges({
      userId,
      supabase,
    });

    const pendingChallenges = await getRandomPendingChallenges({
      supabase,
      activeChallenges,
    });

    // Add pending challenges
    const insertIntoDb = await insertPendingChallenges({
      userId: parseInt(userId),
      pendingChallenges: pendingChallenges,
      supabaseClient: supabase,
    });

    return NextResponse.json(insertIntoDb);
  }
}
