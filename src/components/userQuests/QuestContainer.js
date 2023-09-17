import QuestCard from "@/components/userQuests/QuestCard";

import { getSteamBaseData } from "@/utils/steamConvert";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { options } from "@/auth/options";

import { getServerSession } from "next-auth/next";
import { cookies } from "next/headers";

export default async function QuestContainer() {
  const supabase = createServerComponentClient({ cookies });
  const session = await getServerSession(options(null));
  const steamBaseData = getSteamBaseData(session);

  const { data: quests, error } = await supabase.from("quests").select();

  if (error) {
    <div>Error fetching quests</div>;
  }
  return (
    <div className="mx-3 w-1/2">
      <h2 className="text-2xl mt-10 text-success">Quests</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-5">
        {quests?.map((quest) => (
          <QuestCard
            key={quest.id}
            quest={quest}
            onClick={() => console.log("clicked")}
          />
        ))}
        {quests?.map((quest) => (
          <QuestCard
            key={quest.id}
            quest={quest}
            onClick={() => console.log("clicked")}
          />
        ))}
      </div>
    </div>
  );
}
