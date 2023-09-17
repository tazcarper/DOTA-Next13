import { findSequentialMatches } from "../../src/utils/quests/findSequentialMatches";
import { diverseRolesAndHeroes } from "../../src/utils/quests/questConditions";
describe("Diverse Roles and Heroes Condition Test", () => {
  const sampleMatches = [
    { hero: { id: 101 }, role: "carry", isVictory: true },
    { hero: { id: 102 }, role: "middle", isVictory: true },
    { hero: { id: 103 }, role: "offlane", isVictory: true },
    { hero: { id: 104 }, role: "LIGHT_SUPPORT", isVictory: true },
    { hero: { id: 105 }, role: "HARD_SUPPORT", isVictory: true },
    { hero: { id: 105 }, role: "offlane", isVictory: true }, // Adding another repeated role and hero
  ];

  const conditions = {
    diverseRolesAndHeroes,
  };

  test("should return a valid index for diverseRolesAndHeroes condition", () => {
    const matchesWithSuccessCondition = [
      ...sampleMatches,
      { hero: { id: 105 }, role: "offlane", isVictory: true },
    ];

    const result = findSequentialMatches(
      matchesWithSuccessCondition,
      conditions
    );

    expect(result.diverseRolesAndHeroes.startIndex).toBe(0);
    expect(result.diverseRolesAndHeroes.streakLength).toBe(5);
  });

  test("should return -1 if the condition is not met", () => {
    const matchesWithFailCondition = [
      { hero: { id: 101 }, role: "carry", isVictory: true },
      { hero: { id: 102 }, role: "middle", isVictory: true },
      { hero: { id: 103 }, role: "offlane", isVictory: true },
      { hero: { id: 102 }, role: "support", isVictory: true },
      { hero: { id: 105 }, role: "offlane", isVictory: true },
      { hero: { id: 102 }, role: "offlane", isVictory: true }, // Adding another repeated role and hero
    ];
    const result = findSequentialMatches(matchesWithFailCondition, conditions);

    expect(result.diverseRolesAndHeroes.startIndex).toBe(-1);
    expect(result.diverseRolesAndHeroes.streakLength).toBe(0);
  });

  // Add more tests for other challenges and edge cases as needed.
});
