"use client";

import { useState, Suspense } from "react";

import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import PlayerQuery from "@/src/queries/PlayerQuery";
import InputSteamId from "@/src/components/dota/form/InputSteamId";
import HeroPortrait from "@/src/components/shared/HeroPortrait";

export default function MatchList({ initialSteamId }) {
  const [matchList, setMatchList] = useState([]);
  const [steamId, setSteamId] = useState(initialSteamId);
  // 219981899
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(e.target[0].value);

    if (e.target[0].value.length <= 0 || isNaN(e.target[0].value)) return null;
    setSteamId(e.target[0].value);
  };

  const { data, error } = useSuspenseQuery(PlayerQuery, {
    skip: !steamId,
    variables: { steamAccountId: parseInt(steamId) },
  });

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
      <p>{`Matches for ${data.player.steamAccount.name}`}</p>
      <Suspense fallback={<div>Loading...</div>}>
        {steamId &&
          data.player.matches.map((match) => {
            const shortName = match.players[0].hero.shortName;
            return (
              <div>
                <img src={HeroPortrait(shortName)} />
                <h5>{shortName}</h5>
              </div>
            );
          })}
      </Suspense>
    </div>
  );
}
