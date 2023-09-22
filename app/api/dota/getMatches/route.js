import authCheck from "@/utils/authSessionCheck";
import { toUserID } from "@/utils/steamConvert";

import { NextResponse } from "next/server";
import MatchesQuery from "@/queries/MatchesQuery";
import { getClient } from "@/lib/apolloClient";

export async function GET(req, res) {
  const { searchParams } = new URL(req.url);
  const req_user_id = searchParams.get("userid");
  const req_take = searchParams.get("take");
  const req_after = searchParams.get("after");
  const req_user_lookup_id = searchParams.get("user_lookup_id");
  const session = await authCheck();
  const userId = toUserID(BigInt(session.steam.steamid));

  if (!req_user_id || !req_user_lookup_id) {
    // Maybe tweak these responses with a better pattern
    return NextResponse.json({
      data: null,
      error: "No userid or user_lookup_id provided.",
    });
  }
  if (parseInt(userId) === parseInt(req_user_id)) {
    const client = getClient();
    console.log(req_user_lookup_id, req_take);
    let matchQuery;
    try {
      matchQuery = await client.query({
        query: MatchesQuery,
        variables: {
          steamAccountId: parseInt(req_user_lookup_id),
          take: parseInt(req_take),
          after: req_after,
        },
      });
    } catch (err) {
      console.log(err.networkError.result.errors);
      return NextResponse.json({
        data: [],
        error: err.networkError.result.errors,
      });
    }

    console.log(matchQuery);
    return NextResponse.json({ data: matchQuery?.data, error: null });
  } else {
    return NextResponse.json({ data: null, error: "Not Autorized" });
  }
}
