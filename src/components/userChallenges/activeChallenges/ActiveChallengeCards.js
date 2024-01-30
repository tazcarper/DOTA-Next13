"use client";
import { useState, useContext } from "react";
import ChallengeCard from "@/components/userChallenges/ChallengeCard";
import { ChallengeProviderContext } from "@/providers/ChallengeProvider";
import addMediaToChallenge from "@/data/supabase/helpers/addMediaToChallenge";

export default function ActiveChallengeCards({}) {
  const { state, dispatch } = useContext(ChallengeProviderContext);
  console.log(state);
  const { userChallenges, activeChallenges } = state || [];

  return (
    <>
      {activeChallenges?.map((challenge) => {
        return (
          <div key={challenge.challenge_id}>
            <ChallengeCard challenge={challenge} active={true} />
          </div>
        );
      })}
    </>
  );
}
