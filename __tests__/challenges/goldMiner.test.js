import { findSequentialMatches } from "../../src/utils/quests/findSequentialMatches";
import { goldMiner } from "../../src/utils/quests/questConditions";
describe("Gold Miner Condition Test", () => {
  const sampleMatches = [
    {
      goldPerMinute: 710,
      hero: { id: 101 },
      role: "carry",
      isVictory: true,
    },
    {
      goldPerMinute: 715,
      hero: { id: 102 },
      role: "carry",
      isVictory: true,
    },
    {
      goldPerMinute: 720,
      hero: { id: 103 },
      role: "middle",
      isVictory: true,
    },
    {
      goldPerMinute: 700,
      hero: { id: 104 },
      role: "middle",
      isVictory: false,
    },
    {
      goldPerMinute: 730,
      hero: { id: 101 },
      role: "support",
      isVictory: false,
    },
  ];

  const conditions = {
    goldMiner,
  };

  test("should return a valid index for goldMiner condition", () => {
    const result = findSequentialMatches(sampleMatches, conditions);

    expect(result.goldMiner.startIndex).toBe(0); // It starts at the first index
    expect(result.goldMiner.streakLength).toBe(3);
  });

  test("should return -1 if the condition is not met", () => {
    const matchesWithFailCondition = sampleMatches.map((match) => ({
      ...match,
      goldPerMinute: 690,
    }));
    const result = findSequentialMatches(matchesWithFailCondition, conditions);

    expect(result.goldMiner.startIndex).toBe(-1);
    expect(result.goldMiner.streakLength).toBe(0);
  });

  // Add more tests for other challenges and edge cases as needed.
});
