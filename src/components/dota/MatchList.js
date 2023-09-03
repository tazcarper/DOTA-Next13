"use client";

import { useState, Suspense, useContext, useEffect } from "react";
import { ClientDotaProfileDataProviderContext } from "@/providers/DotaClientProvider";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import PlayerQuery from "@/src/queries/PlayerQuery";
import InputSteamId from "@/src/components/dota/form/InputSteamId";
import HeroPortrait from "@/src/components/shared/HeroPortrait";

export default function MatchList({ initialSteamId }) {
  const [matchList, setMatchList] = useState([]);
  const [steamId, setSteamId] = useState(initialSteamId);
  const { state, dispatch } = useContext(ClientDotaProfileDataProviderContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target[0].value.length <= 0 || isNaN(e.target[0].value)) return null;
    setSteamId(e.target[0].value);
  };

  const { data, error } = useSuspenseQuery(PlayerQuery, {
    variables: { steamAccountId: parseInt(steamId) },
  });

  useEffect(() => {
    console.log(data);
    if (data?.player?.steamAccount?.name) {
      dispatch({ type: "UPDATE_USER", payload: data });
    }
  }, [data]);

  if (!data?.player?.steamAccount?.name || error) {
    return (
      <div>
        <InputSteamId handleSubmit={handleSubmit} />
        Not Found
      </div>
    );
  }

  return (
    <div>
      <InputSteamId handleSubmit={handleSubmit} />
      <div className="flex flex-row justify-center items-center my-10">
        <img
          src={data.player.steamAccount.avatar}
          className="rounded-full w-[100px] mr-4 "
        />
        <h1 className="inline-block text-6xl">{`${data.player.steamAccount.name}`}</h1>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col md:flex-row text-center align-middle w-full">
          {steamId &&
            data.player.matches.map((match) => {
              const shortName = match.players[0].hero.shortName;
              const { isVictory, role, matchId, kills, deaths, assists } =
                match.players[0];

              const victoryStyle = isVictory ? "bg-success bg" : "bg-error bg";

              return (
                <div
                  className={`${victoryStyle} w-full text-center mx-1 my-2 md:my-0`}
                  key={match.id}
                >
                  <img
                    src={HeroPortrait(shortName)}
                    className="mx-auto w-full"
                  />
                  <div className="text-black">
                    <h2 className="text-4xl uppercase md:m-2">{shortName}</h2>
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
            })}
        </div>
      </Suspense>
    </div>
  );
}
