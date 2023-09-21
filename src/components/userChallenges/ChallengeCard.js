"use client";
import { QUEST_TYPES } from "@/lib/constants";
import Image from "next/image";

export default function ChallengeCard({ challenge, key }) {
  return (
    <div
      className="rounded-md cursor-pointer hover:shadow-lg bg-white"
      key={key}
    >
      <div className="w-full max-w-[480px] max-h-[256px] object-contain">
        <Image
          src={challenge?.coverImage}
          width={512}
          height={256}
          alt={challenge.name}
          className="max-w-full w-full"
        />
      </div>
      <div className="p-3">
        <div className="flex flex-row justify-between mb-1">
          <h2 className="text-2xl font-bold self-center text-black">
            {challenge.name}
          </h2>
          <span className="self-center text-red-500 font-semibold">
            {QUEST_TYPES[challenge.type]}
          </span>
        </div>
        <p className="text-gray-700 text-xl">{challenge.description}</p>
        <ul className="pl-5 my-3">
          {challenge.conditions.map((condition) => (
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
