import { findMatchesWithinRange } from "../src/utils/quests/findMatchesWithinRange";

describe("findMatchesWithinRange function", () => {
  const conditions = [
    {
      condition: (matches) =>
        matches.every((match) => match.role === "carry" && match.isVictory),
      challenge_id: "carryVictoryChallenge",
      streakLength: 3,
      streakRange: 5,
    },
  ];

  test("All matches meet the condition", () => {
    const matches = [
      { matchId: 1, role: "carry", isVictory: true },
      { matchId: 2, role: "carry", isVictory: true },
      { matchId: 3, role: "carry", isVictory: true },
      { matchId: 4, role: "carry", isVictory: true },
      { matchId: 5, role: "carry", isVictory: true },
      { matchId: 6, role: "carry", isVictory: true },
    ];
    const result = findMatchesWithinRange({ matches, conditions });
    console.log(result);
    expect(result.carryVictoryChallenge.length).toBe(4);
  });

  test("Matches from first 5 at zero index", () => {
    const matches = [
      { role: "carry", isVictory: true, matchId: "m1" },
      { role: "middle", isVictory: false, matchId: "m2" },
      { role: "carry", isVictory: true, matchId: "m3" },
      { role: "middle", isVictory: false, matchId: "m4" },
      { role: "carry", isVictory: true, matchId: "m5" },
      { role: "middle", isVictory: false, matchId: "m6" },
    ];
    const result = findMatchesWithinRange({
      matches,
      conditions,
    });

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

    const innerConditions = [
      {
        condition: conditions[0].condition,
        challenge_id: "carryVictoryChallenge",
        streakLength: 4,
        streakRange: 4,
      },
    ];
    const result = findMatchesWithinRange({
      matches,
      conditions: innerConditions,
    });

    expect(result.carryVictoryChallenge.length).toBe(1);
  });

  test("2 in any order", () => {
    const matches = [
      { role: "carry", isVictory: false },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: false },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true, matchId: 1 },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true, matchId: 2 },
    ];

    const innerConditions = [
      {
        condition: conditions[0].condition,
        challenge_id: "carryVictoryChallenge",
        streakLength: 2,
        streakRange: 5,
      },
    ];

    const result = findMatchesWithinRange({
      matches,
      conditions: innerConditions,
    });

    expect(result.carryVictoryChallenge.length).toBe(1);
  });
});
