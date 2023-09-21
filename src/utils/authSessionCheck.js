import { getServerSession } from "next-auth/next";
import { options } from "@/auth/options";
export default async function authCheck() {
  const session = await getServerSession(options());
  if (session) {
    // Signed in
    return session.user;
  } else {
    // Not Signed in
    return { error: "Not authorized" };
  }
}
