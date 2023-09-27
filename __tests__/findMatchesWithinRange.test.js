import { findMatchesWithinRange } from "../src/utils/quests/findMatchesWithinRange";

describe("findMatchesWithinRange function", () => {
  const conditions = [
    {
      condition: (match) => match.role === "carry" && match.isVictory,
      challenge_id: 'carryVictoryChallenge',
      streakLength: 3
    },
  ];

  test("All matches meet the condition", () => {
    const matches = [
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
    ];
    const result = findMatchesWithinRange({matches, conditions, maxRange : 5, qualifyCount : 5});
    expect(result.carryVictoryChallenge.length).toBe(2);
  });

  test("Matches from first 5 at zero index", () => {
    const matches = [
      { role: "carry", isVictory: true },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
      { role: "middle", isVictory: false },
    ];
    const result = findMatchesWithinRange({matches, conditions, maxRange : 5, qualifyCount : 3});
    expect(result.carryVictoryChallenge.length).toBe(1);
  });

  test("5 in a row", () => {
    const matches = [
      { role: "middle", isVictory: false },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
      { role: "middle", isVictory: false },
    ];
    const result = findMatchesWithinRange({matches, conditions, maxRange : 4, qualifyCount : 4});

    expect(result.carryVictoryChallenge.length).toBe(1);
  });

  test("2 in any order", () => {
    const matches = [
      { role: "carry", isVictory: false },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: false },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
    ];
    const result = findMatchesWithinRange({matches, conditions, maxRange : 5, qualifyCount : 2});
    expect(result.carryVictoryChallenge.length).toBe(1);
  });
});
