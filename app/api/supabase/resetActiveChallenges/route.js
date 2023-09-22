import authCheck from "@/utils/authSessionCheck";
import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { toUserID } from "@/utils/steamConvert";
import resetActiveChallenges from "@/data/supabase/resetActiveChallenges";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const supabase = createRouteHandlerClient({ cookies });
  const { searchParams } = new URL(req.url);
  const req_user_id = searchParams.get("userid");
  const session = await authCheck();
  const userId = toUserID(BigInt(session.steam.steamid));

  if (!req_user_id) {
    // Maybe tweak these responses with a better pattern
    return NextResponse.json({ data: null, error: "Not Autorized" });
  }
  if (parseInt(userId) === parseInt(req_user_id)) {
    const { data, error } = await resetActiveChallenges({
      supabase,
      userId,
    });
    if (error) {
      console.log("Did not delete anything");
    }

    return NextResponse.json({ data: data, error });
  }
}
