import MatchList from "@/components/dota/MatchList";
import { options } from "@/auth/options";
import { getServerSession } from "next-auth/next";
export const revalidate = 5;

export default async function Dota(props) {
  console.log(props);
  const session = await getServerSession(options(null));

  if (!session) {
    // Can redirect or do whatever here
  }

  const {
    user: {
      name,
      steam: { steamid },
    },
  } = session;

  return (
    <div>
      <h1>Recent heroes for {name}</h1>
      {steamid}
      <MatchList />
    </div>
  );
}
