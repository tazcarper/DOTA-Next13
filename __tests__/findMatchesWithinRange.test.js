import { findMatchesWithinRange } from "../src/utils/quests/findMatchesWithinRange";
describe("findMatchesWithinRange function", () => {
  const condition = (match) => match.role === "carry" && match.isVictory;

  test("All matches meet the condition", () => {
    const matches = [
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
    ];
    expect(findMatchesWithinRange(matches, condition, 5, 3)).toBe(1);
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
    expect(findMatchesWithinRange(matches, condition, 5, 3)).toBe(0);
  });

  test("5 in a row", () => {
    const matches = [
      { role: "middle", isVictory: false },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "middle", isVictory: false },
      { role: "middle", isVictory: false },
    ];
    expect(findMatchesWithinRange(matches, condition, 5, 5)).toBe(2);
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
    expect(findMatchesWithinRange(matches, condition, 5, 2)).toBe(2);
  });
});
