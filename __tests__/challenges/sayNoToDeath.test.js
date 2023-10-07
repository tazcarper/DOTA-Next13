import { findMatchesWithinRange } from "../../src/utils/quests/findMatchesWithinRange";
import { sayNoToDeath } from "../../src/utils/quests/questConditions";

describe("Say No To Death Condition Test", () => {
  const conditions = [
    {
      ...sayNoToDeath,
      challenge_id: "test",
      streakRange: 5,
      streakLength: 4,
    },
  ];

  // Success tests

  test("should return a valid index for SayNoToDeath condition", () => {
    const matchesWithSuccessCondition = [
      { deaths: 8, isVictory: true, matchId: 1 },
      { deaths: 4, isVictory: true, matchId: 2 },
      { deaths: 3, isVictory: true, matchId: 3 },
      { deaths: 4, isVictory: true, matchId: 4 },
      { deaths: 3, isVictory: true, matchId: 5 },
    ];

    const result = findMatchesWithinRange({
      matches: matchesWithSuccessCondition,
      conditions,
    });
    console.log(result);
    expect(result.test.length).toBe(1);
  });

  test("should return a valid index for SayNoToDeath condition", () => {
    const matchesWithSuccessCondition = [
      { deaths: 5, isVictory: false, matchId: 1 },
      { deaths: 4, isVictory: true, matchId: 133 },
      { deaths: 3, isVictory: false, matchId: 13 },
      { deaths: 5, isVictory: true, matchId: 4 },
      { deaths: 4, isVictory: true, matchId: 5 },
      { deaths: 3, isVictory: true, matchId: 6 },
    ];

    const result = findMatchesWithinRange({
      matches: matchesWithSuccessCondition,
      conditions,
    });

    expect(result.test).toStrictEqual([[133, 4, 5, 6]]);
  });

  // Fail tests

  test("Should fail because no window of 5 has 3 wins with conditions met", () => {
    const matchesWithFailCondition = [
      { deaths: 3, isVictory: false }, // This match breaks the streak
      { deaths: 3, isVictory: true },
      { deaths: 16, isVictory: true }, // This match breaks the streak
      { deaths: 1, isVictory: true },
      { deaths: 3, isVictory: false }, // This match breaks the streak
      { deaths: 3, isVictory: false }, // This match breaks the streak
      { deaths: 1, isVictory: true },
    ];

    const result = findMatchesWithinRange({
      matches: matchesWithFailCondition,
      conditions,
    });

    expect(result.test.length).toBe(0);
  });
});
