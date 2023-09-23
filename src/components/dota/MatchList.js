"use client";

import { useState, Suspense, useContext, useEffect } from "react";
import { ClientDotaProfileDataProviderContext } from "@/providers/DotaClientProvider";
import { useSuspenseQuery } from "@apollo/experimental-nextjs-app-support/ssr";
import PlayerQuery from "@/src/queries/PlayerQuery";
import InputSteamId from "@/src/components/dota/form/InputSteamId";
import MatchRender from "@/components/dota/MatchRender";

export default function MatchList({ initialSteamId }) {
  const [steamId, setSteamId] = useState(initialSteamId);
  const { state, dispatch } = useContext(ClientDotaProfileDataProviderContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (e.target[0].value.length <= 0 || isNaN(e.target[0].value)) return null;
    setSteamId(e.target[0].value);
  };

  const { data, error } = useSuspenseQuery(PlayerQuery, {
    skip: !steamId,
    variables: { steamAccountId: parseInt(steamId) },
  });

  useEffect(() => {
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
      <Suspense fallback={<div>Loading...</div>}>
        <div className="flex flex-col md:flex-row text-center align-middle w-1/2 gap-5 mt-16">
          {steamId &&
            data?.player?.matches.map((match) => {
              const { id, startDateTime } = match;
              const { shortName, displayName } = match.players[0].hero;
              const { isVictory, kills, deaths, assists } = match.players[0];

              const matchProps = {
                shortName,
                isVictory,
                kills,
                deaths,
                assists,
                displayName,
                startDateTime,
                id,
              };
              return <MatchRender match={matchProps} key={id} />;
            })}
        </div>
      </Suspense>
    </div>
  );
}
