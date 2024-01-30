"use client";
import { useState, useContext } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import ChallengeCard from "@/components/userChallenges/ChallengeCard";
import addMediaToChallenge from "@/data/supabase/helpers/addMediaToChallenge";
import { useRouter } from "next/navigation";
import { ChallengeProviderContext } from "@/providers/ChallengeProvider";

export default function ChallengeSelector({
  pendingChallenges,
  userId,
  activeChallenges,
}) {
  const router = useRouter();
  const { state, dispatch } = useContext(ChallengeProviderContext);

  const { userChallenges } = state || [];
  console.log(userChallenges);
  const [availableChallenges, setAvailableChallenges] =
    useState(pendingChallenges);

  const [currentActiveChallenges, setCurrentActiveChallenges] =
    useState(activeChallenges);
  // console.log(availableChallenges);

  const supabase = createClientComponentClient();
  // console.log(currentActiveChallenges);

  const selectChallenge = async (challengeId) => {
    // optimistic update
    const challengeToAdd = availableChallenges.find(
      (challenge) => challenge.challenge_id === challengeId
    );

    console.log(challengeToAdd);

    dispatch({
      type: "SELECT_CHALLENGE",
      payload: challengeToAdd,
    });

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
      challengeData: challengeData,
      supabase,
    });

    setAvailableChallenges(updatedPendingChallenges);
    // Maybe not needed?
    // router.refresh();
  };
  return (
    <div className="w-full">
      {currentActiveChallenges.length <= 2 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 w-full pt-5">
          {availableChallenges?.length > 0 &&
            availableChallenges.map((challenge) => (
              <div key={challenge.challenge_id}>
                <ChallengeCard
                  challenge={challenge}
                  onClick={() => selectChallenge(challenge.challenge_id)}
                />
              </div>
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
