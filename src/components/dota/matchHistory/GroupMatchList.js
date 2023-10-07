import Image from "next/image";
import generateHeroPortrait from "@/components/shared/HeroPortrait";
export default function GroupMatchList({ groupMatches, activeChallenges }) {
  return (
    <div className="text-center mt-10">
      <h1 className="text-4xl">Set History</h1>
      {groupMatches?.map((grouping) => {
        const currentMatches = [...grouping?.matches];
        const successMatches = {};
        const conditions = grouping.conditions;
        const buildSuccessChallenges = Object.keys(conditions)
          .map((condition) => {
            if (conditions[condition].length) {
              conditions[condition].forEach((grouping) => {
                grouping.forEach((matchId) => {
                  if (successMatches.hasOwnProperty(matchId)) {
                    successMatches[matchId].push(condition);
                  } else {
                    successMatches[matchId] = [condition];
                  }
                });
              });
              return activeChallenges.find(
                (challenge) => challenge.challenge_id === parseInt(condition)
              );
            }
            return null;
          })
          .filter((valid) => valid);

        return (
          <div
            className="flex gap-2 my-3 bg-neutral-800"
            key={`${currentMatches[0].id}-grouping`}
          >
            <div className="avatars flex gap-2 p-3">
              {grouping?.matches?.map((match) => {
                const { isVictory, kills, assists, deaths } = match.players[0];
                const hero = match.players[0].hero;
                return (
                  <div className="flex flex-col">
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
                    <div>
                      {kills}/{deaths}/{assists}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="bg-neutral-700 w-full border-l-white border-l-4 flex ">
              <div className=" justify-center self-center w-full">
                {buildSuccessChallenges.map((successChallenge) => {
                  return (
                    <p className="text-green-500">
                      <span className="font-bold">
                        {successChallenge.challenges.name}
                      </span>{" "}
                      Success!
                    </p>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
