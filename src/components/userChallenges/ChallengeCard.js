import { QUEST_TYPES } from "@/lib/constants";
import Image from "next/image";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function ChallengeCard({ quest }) {
  const supabase = createServerComponentClient({ cookies });
  const questImage = await supabase.storage
    .from("quest_images")
    .getPublicUrl(quest.image);
  return (
    <div className="rounded-md cursor-pointer hover:shadow-lg bg-white">
      <div className="w-full max-w-[480px] max-h-[256px] object-contain">
        <Image
          src={questImage.data.publicUrl}
          width={512}
          height={256}
          alt={quest.name}
          className="max-w-full w-full"
        />
      </div>
      <div className="p-3">
        <div className="flex flex-row justify-between mb-1">
          <h2 className="text-2xl font-bold self-center text-black">
            {quest.name}
          </h2>
          <span className="self-center text-red-500 font-semibold">
            {QUEST_TYPES[quest.type]}
          </span>
        </div>
        <p className="text-gray-700 text-xl">{quest.description}</p>
        <ul className="pl-5 my-3">
          {quest.conditions.map((condition) => (
            <li className="font-bold text-secondary list-disc text-lg">
              {condition}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
