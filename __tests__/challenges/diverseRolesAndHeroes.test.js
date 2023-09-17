import { findSequentialMatches } from "../../src/utils/quests/findSequentialMatches";
import { diverseRolesAndHeroes } from "../../src/utils/quests/questConditions";
// Challenge 1: Diverse Roles and Heroes
// In 5 games, play 5 different heroes each from a unique role
// Unique heroes only
describe("Diverse Roles and Heroes Condition Test", () => {
  const sampleMatches = [
    { hero: { id: 101 }, role: "carry", isVictory: true },
    { hero: { id: 102 }, role: "middle", isVictory: true },
    { hero: { id: 103 }, role: "offlane", isVictory: true },
    { hero: { id: 104 }, role: "LIGHT_SUPPORT", isVictory: true },
    { hero: { id: 105 }, role: "HARD_SUPPORT", isVictory: true },
    { hero: { id: 105 }, role: "offlane", isVictory: true }, // Adding another repeated role and hero
  ];

  // diverseRolesAndHeroes = {
  //   condition: (match, prevMatches = []) =>
  //     prevMatches.every((prev) => prev.hero.id !== match.hero.id) &&
  //     prevMatches.every((prev) => prev.role !== match.role) &&
  //     match.isVictory,
  //   streakLength: 5,
  // };
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

  test("Should fail if playing same heros", () => {
    const matchesWithFailCondition = [
      { hero: { id: 101 }, role: "carry", isVictory: true },
      { hero: { id: 102 }, role: "middle", isVictory: true },
      { hero: { id: 103 }, role: "offlane", isVictory: true },
      { hero: { id: 102 }, role: "LIGHT_SUPPORT", isVictory: true },
      { hero: { id: 105 }, role: "offlane", isVictory: true },
      { hero: { id: 102 }, role: "offlane", isVictory: true },
    ];
    const result = findSequentialMatches(matchesWithFailCondition, conditions);

    expect(result.diverseRolesAndHeroes.startIndex).toBe(-1);
    expect(result.diverseRolesAndHeroes.streakLength).toBe(0);
  });

  test("Should fail if you dont win all your games", () => {
    const matchesWithFailCondition = [
      { hero: { id: 101 }, role: "carry", isVictory: false },
      { hero: { id: 102 }, role: "middle", isVictory: true },
      { hero: { id: 103 }, role: "offlane", isVictory: true },
      { hero: { id: 104 }, role: "LIGHT_SUPPORT", isVictory: true },
      { hero: { id: 105 }, role: "HARD_SUPPORT", isVictory: true },
    ];
    const result = findSequentialMatches(matchesWithFailCondition, conditions);

    expect(result.diverseRolesAndHeroes.startIndex).toBe(-1);
    expect(result.diverseRolesAndHeroes.streakLength).toBe(0);
  });
});
