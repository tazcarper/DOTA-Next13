import type { NextAuthOptions } from "next-auth";
import SteamProvider, { PROVIDER_ID } from "next-auth-steam";
import type { NextApiRequest } from "next";

export function options(req: NextApiRequest | null): NextAuthOptions {
  return {
    providers: [
      SteamProvider(req, {
        clientSecret: process.env.STEAM_SECRET as string,
        callbackUrl: "http://localhost:3000/api/auth/callback",
      }),
    ],
    callbacks: {
      async session({ session, token, user }) {
        if ("steam" in token) {
          // @ts-expect-error
          session.user.steam = token.steam;
        }

        return session;
      },
      async jwt({ token, account, profile }) {
        if (account?.provider === PROVIDER_ID) {
          token.steam = profile;
        }

        return token;
      },
    },
  };
}
