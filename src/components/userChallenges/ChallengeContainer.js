import { ChallengeProvider } from "@/providers/ChallengeProvider";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getSteamBaseData } from "@/utils/steamConvert";
import { getServerSession } from "next-auth/next";
import { options } from "@/auth/options";
import getUserChallenges from "@/data/supabase/getUserChallenges";

export default async function ChallengeContainer({ children }) {
  const supabase = createServerComponentClient({ cookies });
  const session = await getServerSession(options(null));
  const steamBaseData = getSteamBaseData(session);
  const { userId } = steamBaseData;

  const challengeData = await getUserChallenges({ userId, supabase });

  return (
    <div>
      <ChallengeProvider data={{ ...challengeData }}>
        {children}
      </ChallengeProvider>
    </div>
  );
}
