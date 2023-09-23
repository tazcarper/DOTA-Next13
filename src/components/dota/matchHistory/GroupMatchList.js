import Image from "next/image";
import generateHeroPortrait from "@/components/shared/HeroPortrait";
export default function GroupMatchList({ groupMatches }) {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl">Set History</h1>
      {groupMatches?.map((grouping) => {
        return (
          <div
            className="flex gap-2 my-3 bg-neutral-800"
            key={`${grouping[0].id}-grouping`}
          >
            <div className="avatars flex gap-2 p-3">
              {grouping.map((match) => {
                const { isVictory } = match.players[0];
                const hero = match.players[0].hero;
                return (
                  <div
                    className="avatar"
                    key={`${match.id}-avatar-${hero.shortName}`}
                  >
                    <div className="w-16 rounded-full">
                      <Image
                        src={generateHeroPortrait(hero.shortName)}
                        width={527}
                        height={296}
                        alt={hero.shortName}
                        className={`rounded-full ${
                          isVictory
                            ? "border-2 border-success"
                            : "border-2 border-error"
                        }`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-neutral-700 w-full border-l-white border-l-4">
              Show awards and stuff here
            </div>
          </div>
        );
      })}
    </div>
  );
}
