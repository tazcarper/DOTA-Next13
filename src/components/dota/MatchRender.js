import HeroPortrait from "@/src/components/shared/HeroPortrait";
import Image from "next/image";
export default function MatchRender({ match }) {
  const {
    isVictory,
    role,
    id,
    kills,
    deaths,
    assists,
    shortName,
    displayName,
    startDateTime,
    isActive = true,
  } = match;

  const convertedDate = new Date(
    parseInt(startDateTime) * 1000
  ).toLocaleDateString();
  const victoryStyle = isVictory
    ? "border-success border-b-4"
    : "border-error border-b-4 ";
  const inactiveStyle = !isActive ? "grayscale" : "grayscale-0";

  return (
    <div
      className={`${victoryStyle} ${inactiveStyle} w-full text-center my-2 md:my-0 bg-neutral-700 `}
      key={id}
    >
      {!isActive && <div className="absolute w-full bg-gray-500">Inactive</div>}
      <div className="avatar relative top-[-25px] ">
        <div
          className={`w-40 rounded-full ring ring-offset-base-100 ring-offset-2 ${
            isVictory ? "ring-success" : "ring-error"
          }`}
        >
          <Image
            src={HeroPortrait(shortName)}
            className="mx-auto w-full"
            width={527}
            height={296}
            alt={shortName}
          />
        </div>
      </div>

      <div className="text-gray-500">
        <h2 className="text-1xl uppercase md:m-2 text-neutral-200 ">
          {displayName}
        </h2>
        <p className="my-[-10px]">{convertedDate}</p>
      </div>
      <div className="w-full flex justify-evenly text-neutral-200 my-6 text-2xl">
        <div>
          <p>Kills</p>
          <p className=" p-2 px-6 shadow-sm border-black border-b-2 font-bold text-white">
            {kills}
          </p>
        </div>
        <div>
          <p>Deaths</p>
          <p className=" p-2 px-6 shadow-sm border-black border-b-2 font-bold text-white">
            {deaths}
          </p>
        </div>
        <div>
          <p>Assists</p>
          <p className="p-2 px-6 shadow-sm border-black border-b-2 font-bold text-white">
            {assists}
          </p>
        </div>
      </div>
    </div>
  );
}
