import NextAuth from "next-auth";
import { options } from "./options";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  return NextAuth(req, res, options(req));
}

export { handler as GET, handler as POST };
