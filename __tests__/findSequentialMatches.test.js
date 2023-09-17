import { findSequentialMatches } from "../src/utils/achievements/findSequentialMatches";

describe("findSequentialMatches  function", () => {
  const conditions = {
    streak_carry_3: {
      condition: (match) => match.role === "carry" && match.isVictory,
      streakLength: 3,
    },
    streak_mid_5: {
      condition: (match) => match.role === "middle" && match.isVictory,
      streakLength: 5,
    },
  };

  test("Carry 3 game streak to be 0. 5 mid wins in a row to be -1", () => {
    const matches = [
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
    ];
    expect(
      findSequentialMatches(matches, conditions).streak_carry_3.startIndex
    ).toBe(0);
    expect(
      findSequentialMatches(matches, conditions).streak_mid_5.startIndex
    ).toBe(-1);
  });

  test("No matches", () => {
    const matches = [
      { role: "carry", isVictory: true },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
      { role: "middle", isVictory: false },
    ];
    expect(
      findSequentialMatches(matches, conditions).streak_carry_3.startIndex
    ).toBe(-1);
    expect(
      findSequentialMatches(matches, conditions).streak_mid_5.startIndex
    ).toBe(-1);
  });

  test("One passes towards the end. Gets furthest one down the list", () => {
    const matches = [
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
    ];
    expect(
      findSequentialMatches(matches, conditions).streak_carry_3.startIndex
    ).toBe(7);
    expect(
      findSequentialMatches(matches, conditions).streak_mid_5.startIndex
    ).toBe(-1);
  });

  test("Both pass", () => {
    const matches = [
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "middle", isVictory: true },
      { role: "middle", isVictory: true },
      { role: "middle", isVictory: true },
      { role: "middle", isVictory: true },
      { role: "middle", isVictory: true },
    ];
    expect(
      findSequentialMatches(matches, conditions).streak_carry_3.startIndex
    ).toBe(3);
    expect(
      findSequentialMatches(matches, conditions).streak_mid_5.startIndex
    ).toBe(6);
  });
});
