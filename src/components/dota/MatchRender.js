import HeroPortrait from "@/src/components/shared/HeroPortrait";
import { Suspense } from "react";
export default function MatchRender({ match }) {
  const {
    isVictory,
    role,
    matchId,
    kills,
    deaths,
    assists,
    shortName,
    displayName,
    startDateTime,
  } = match;

  const convertedDate = new Date(
    parseInt(startDateTime) * 1000
  ).toLocaleDateString();
  const victoryStyle = isVictory
    ? "border-success border-b-4"
    : "border-error border-b-4 ";

  return (
    <div
      className={`${victoryStyle} w-full text-center mx-1 my-2 md:my-0 bg-neutral-700`}
      key={match.id}
    >
      <img src={HeroPortrait(shortName)} className="mx-auto w-full" />
      <div className="text-gray-500">
        <h2 className="text-1xl uppercase md:m-2 text-neutral-200 ">
          {displayName}
        </h2>
        <p className="my-[-10px]">{convertedDate}</p>
      </div>
      <div className="w-full flex justify-evenly text-neutral-200 my-6">
        <div>
          <p>Kills</p>
          <p className="bg-neutral rounded-full p-4 px-6 shadow-sm border-black border-b-2 font-bold text-white">
            {kills}
          </p>
        </div>
        <div>
          <p>Deaths</p>
          <p className="bg-neutral rounded-full p-4 px-6 shadow-sm border-black border-b-2 font-bold text-white">
            {deaths}
          </p>
        </div>
        <div>
          <p>Assists</p>
          <p className="bg-neutral rounded-full p-4 px-6 shadow-sm border-black border-b-2 font-bold text-white">
            {assists}
          </p>
        </div>
      </div>
    </div>
  );
}
