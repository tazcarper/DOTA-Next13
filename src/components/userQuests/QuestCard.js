import { QUEST_TYPES } from "@/lib/constants";
import Image from "next/image";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function QuestCard({ quest }) {
  const supabase = createServerComponentClient({ cookies });
  const questImage = await supabase.storage
    .from("quest_images")
    .getPublicUrl(quest.image);
  return (
    <div className="rounded-md cursor-pointer hover:shadow-lg bg-white">
      <div className="w-full">
        <Image
          src={questImage.data.publicUrl}
          width={450}
          height={253}
          alt={quest.name}
          className="max-w-full w-full"
        />
      </div>
      <div className="p-3">
        <div className="flex flex-row justify-between ">
          <h2 className="text-lg font-bold self-center text-black">
            {quest.name}
          </h2>
          <span className="self-center text-gray-700">
            {QUEST_TYPES[quest.type]}
          </span>
        </div>
        <p className="text-gray-700">{quest.description}</p>
      </div>
    </div>
  );
}
