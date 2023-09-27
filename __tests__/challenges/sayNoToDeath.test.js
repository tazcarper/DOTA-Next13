import { findMatchesWithinRange } from "../../src/utils/quests/findMatchesWithinRange";
import { sayNoToDeath } from "../../src/utils/quests/questConditions";

describe("Say No To Death Condition Test", () => {
  const conditions = [{
    ...sayNoToDeath,
    challenge_id: 'test'
  }];

  // Success tests

  test("should return a valid index for SayNoToDeath condition", () => {
    const matchesWithSuccessCondition = [
      { deaths: 8, isVictory: true },
      { deaths: 4, isVictory: true },
      { deaths: 3, isVictory: true },
      { deaths: 4, isVictory: true },
      { deaths: 3, isVictory: true },
    ];


    const result = findMatchesWithinRange({matches: matchesWithSuccessCondition, conditions, maxRange : 5, qualifyCount : 4});

    expect(result.test.length).toBe(1);
    
  });

  test("should return a valid index for SayNoToDeath condition", () => {
    const matchesWithSuccessCondition = [
      { deaths: 5, isVictory: false },
      { deaths: 4, isVictory: true },
      { deaths: 3, isVictory: false },
      { deaths: 5, isVictory: true },
      { deaths: 4, isVictory: true },
      { deaths: 3, isVictory: true },
    ];

    const result = findMatchesWithinRange({matches: matchesWithSuccessCondition, conditions, maxRange : 5, qualifyCount : 3});

    expect(result.test).toStrictEqual([
      [3, 4, 5],
      [1, 3, 4]
    ]);
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

    const result = findMatchesWithinRange({matches: matchesWithFailCondition, conditions, maxRange : 5, qualifyCount : 3});

    expect(result.test.length).toBe(0);
  });
});
