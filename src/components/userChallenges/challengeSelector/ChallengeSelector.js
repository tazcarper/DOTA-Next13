"use client";
import { useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ChallengeCard from "@/components/userChallenges/ChallengeCard";
import addMediaToChallenge from "@/data/supabase/helpers/addMediaToChallenge";
import { useRouter } from "next/navigation";

export default function ChallengeSelector({
  pendingChallenges,
  userId,
  activeChallenges,
}) {
  const router = useRouter();

  const [availableChallenges, setAvailableChallenges] =
    useState(pendingChallenges);
  const supabase = createClientComponentClient();

  const selectChallenge = async (challengeId) => {
    const pendingChallengeRequest = await fetch(
      `api/supabase/selectChallenge?userid=${userId}&challenge_id=${challengeId}`
    );
    const result = await pendingChallengeRequest.json();
    if (result) {
      await shuffleChallenges();
    }
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
      challengeData: challengeData.map((challenge) => challenge.challenges),
      supabase,
    });

    setAvailableChallenges(updatedPendingChallenges);
    // Maybe not needed?
    router.refresh();
  };

  return (
    <div className="w-full">
      {activeChallenges.length <= 1 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-5">
          {availableChallenges?.length > 0 &&
            availableChallenges.map((challenge) => (
              <ChallengeCard
                key={challenge.challenge_id}
                challenge={challenge}
                onClick={() => selectChallenge(challenge.challenge_id)}
              />
            ))}
        </div>
      )}
      {activeChallenges.length <= 1 && (
        <div
          className="btn btn-primary mt-5"
          onClick={() => shuffleChallenges()}
        >
          Shuffle
        </div>
      )}
    </div>
  );
}
