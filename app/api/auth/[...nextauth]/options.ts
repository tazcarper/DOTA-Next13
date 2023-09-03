import type { NextAuthOptions } from "next-auth";
import SteamProvider, { PROVIDER_ID } from "next-auth-steam";
import type { NextApiRequest } from "next";

export function options(req: NextApiRequest | null): NextAuthOptions {
  return {
    providers: [
      // @ts-expect-error
      SteamProvider(req, {
        clientSecret: process.env.STEAM_SECRET as string,
        callbackUrl: `${
          process.env.NODE_ENV === "production"
            ? process.env.PROD
            : process.env.LOCALHOST
        }/api/auth/callback`,
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
