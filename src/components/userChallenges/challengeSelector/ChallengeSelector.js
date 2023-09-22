"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ChallengeCard from "@/components/userChallenges/ChallengeCard";
import addMediaToChallenge from "@/data/supabase/helpers/addMediaToChallenge";

export default function ChallengeSelector({ pendingChallenges, userId }) {
  const [availableChallenges, setAvailableChallenges] =
    useState(pendingChallenges);
  const supabase = createClientComponentClient();

  const setPendingChallengesDb = async ({ pendingChallenges }) => {
    const pendingChallengeRequest = await fetch(
      `api/supabase/shufflePendingChallenges?userid=${userId}`
    );
    const result = await pendingChallengeRequest.json();
  };

  const shuffleChallenges = async () => {
    const pendingChallengeRequest = await fetch(
      `api/supabase/shufflePendingChallenges?userid=${userId}&reset=true`
    );
    const { data: challengeData, error } = await pendingChallengeRequest.json();
    if (error) {
      console.log(error);
    }

    const updatedPendingChallenges = await addMediaToChallenge({
      challengeData,
      supabase,
    });

    setAvailableChallenges(updatedPendingChallenges);
  };

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-5">
        {availableChallenges?.length > 0 &&
          availableChallenges.map((challenge) => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
      </div>
      <div className="btn btn-primary mt-5" onClick={() => shuffleChallenges()}>
        Shuffle
      </div>
    </div>
  );
}
