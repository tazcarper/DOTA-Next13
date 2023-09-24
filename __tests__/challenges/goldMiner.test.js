import { findSequentialMatches } from "../../src/utils/quests/findSequentialMatches";
import { goldMiner } from "../../src/utils/quests/questConditions";
describe("Gold Miner Condition Test", () => {
  const sampleMatches = [
    {
      goldPerMinute: 600,
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
      goldPerMinute: 701,
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

  const challenge_id = 1;
  const conditions = [{ challenge_id, ...goldMiner }];

  test("should return a valid index for goldMiner condition", () => {
    const result = findSequentialMatches(sampleMatches, conditions);

    expect(result[challenge_id].length).toBe(1);
    expect(result[challenge_id][0].length).toBe(3);
  });

  test("should return -1 if the condition is not met", () => {
    // change all to 690 gold
    const matchesWithFailCondition = sampleMatches.map((match) => ({
      ...match,
      goldPerMinute: 444,
    }));
    const result = findSequentialMatches(matchesWithFailCondition, conditions);

    expect(result[challenge_id].length).toBe(0);
  });

  test("Must be unique heroes", () => {
    // change all to 690 gold
    const matchesWithFailCondition = [
      {
        goldPerMinute: 720,
        hero: { id: 103 },
        role: "middle",
        isVictory: true,
      },
      {
        goldPerMinute: 701,
        hero: { id: 104 },
        role: "middle",
        isVictory: false,
      },
      {
        goldPerMinute: 730,
        hero: { id: 103 },
        role: "support",
        isVictory: false,
      },
    ];
    const result = findSequentialMatches(matchesWithFailCondition, conditions);

    expect(result[challenge_id].length).toBe(0);
  });

  // Add more tests for other challenges and edge cases as needed.
});
