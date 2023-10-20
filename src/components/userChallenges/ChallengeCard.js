"use client";
import { QUEST_TYPES } from "@/lib/constants";
import { getPercentageTowards24Hours } from "@/utils/math/timeHelpers";
import Image from "next/image";

export default function ChallengeCard({
  challenge,
  key,
  onClick = null,
  active = false,
}) {
  const challengesData = challenge?.challenges;
  if (!challengesData) {
    return null;
  }
  return (
    <div
      className={`rounded-md cursor-pointer hover:shadow-lg bg-white relative`}
      key={key}
      onClick={onClick}
    >
      {active && (
        <progress
          className="absolute progress w-100 progress-primary bottom-0 left-0 rounded-none"
          value={
            100 -
            Math.round(
              getPercentageTowards24Hours(new Date(challenge.start_time))
            )
          }
          max="100"
        ></progress>
      )}
      <div className="w-full max-w-[480px] max-h-[256px] object-contain relative ">
        {challengesData?.coverImage && (
          <Image
            src={challengesData?.coverImage}
            width={512}
            height={256}
            alt={challengesData.name}
            className="max-w-full w-full"
          />
        )}
      </div>
      <div className="p-3 relative">
        <div className="flex flex-row justify-between mb-1">
          <h2 className="text-2xl font-bold self-center text-black">
            {challengesData.name}
          </h2>
          <span className="self-center text-red-500 font-semibold">
            {QUEST_TYPES[challengesData.type]}
          </span>
        </div>
        <p className="text-gray-700 text-xl">{challengesData.description}</p>
        <ul className="pl-5 my-3">
          {challengesData.conditions.map((condition) => (
            <li
              className="font-bold text-secondary list-disc text-lg"
              key={`${challenge.name}-${condition}`}
            >
              {condition}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
