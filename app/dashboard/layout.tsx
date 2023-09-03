import type { Metadata } from "next";
import { options } from "@/auth/options";
import { getServerSession } from "next-auth/next";
import { DotaProfileDataProvider } from "@/providers/DotaClientProvider";
import { toUserID } from "@/utils/steamConvert";
import Navbar from "@/components/navbar/Navbar";
import { getClient } from "@/lib/apolloClient";
import PlayerQuery from "@/queries/PlayerQuery";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(options(null));

  if (!session) {
    // Can redirect or do whatever here
  }

  const {
    steam: { steamid },
  } = session?.user;

  // Convert steamId to userID
  const userId = toUserID(BigInt(steamid));

  const client = getClient();
  const { data } = await client.query({
    query: PlayerQuery,
    variables: { steamAccountId: parseInt(userId) },
  });

  return (
    <div className="dashboard">
      <DotaProfileDataProvider initialState={data}>
        <Navbar initialState={data}>
          <li>item test</li>
        </Navbar>
        <a href="/api/auth/signout">Sign out</a>
        {children}
      </DotaProfileDataProvider>
    </div>
  );
}
