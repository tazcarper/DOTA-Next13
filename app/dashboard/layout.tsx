import Navbar from "@/components/navbar/Navbar";
import { getServerSession } from "next-auth/next";
import { options } from "@/auth/options";
import { getSteamBaseData } from "@/utils/steamConvert";

export async function generateMetadata() {
  const session = await getServerSession(options(null));
  const steamBaseData = getSteamBaseData(session);

  return {
    title: `DotaQuest : ${steamBaseData.name}`,
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard">
      {/* <DotaProfileDataProvider initialState={data}> */}
      <Navbar>
        <li>item test</li>
      </Navbar>
      <a href="/api/auth/signout">Sign out</a>
      {children}
      {/* </DotaProfileDataProvider> */}
    </div>
  );
}

export const dynamic = "force-dynamic";
