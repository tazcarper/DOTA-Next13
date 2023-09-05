import HeroPortrait from "@/src/components/shared/HeroPortrait";

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
  } = match;

  const victoryStyle = isVictory ? "bg-success bg" : "bg-error bg";

  return (
    <div
      className={`${victoryStyle} w-full text-center mx-1 my-2 md:my-0`}
      key={match.id}
    >
      <img src={HeroPortrait(shortName)} className="mx-auto w-full" />
      <div className="text-black">
        <h2 className="text-2xl uppercase md:m-2">{displayName}</h2>
      </div>
      <div className="w-full flex justify-evenly text-black my-4">
        <div>
          <p>Kills</p>
          <p className="bg-neutral rounded-full p-4 px-6 shadow-sm border-black border-b-2 font-bold text-success">
            {kills}
          </p>
        </div>
        <div>
          <p>Deaths</p>
          <p className="bg-neutral rounded-full p-4 px-6 shadow-sm border-black border-b-2 font-bold text-success">
            {deaths}
          </p>
        </div>
        <div>
          <p>Assists</p>
          <p className="bg-neutral rounded-full p-4 px-6 shadow-sm border-black border-b-2 font-bold text-success">
            {assists}
          </p>
        </div>
      </div>
    </div>
  );
}
