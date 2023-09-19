import { findSequentialMatches } from "../../src/utils/quests/findSequentialMatches";
import { stacksOnStacks } from "../../src/utils/quests/questConditions";

describe("Stacks on Stacks Condition Test", () => {
  const conditions = {
    stacksOnStacks,
  };

  const successRunes = [
    { rune: "BOUNTY" },
    { rune: "BOUNTY" },
    { rune: "REGEN" },
    { rune: "BOUNTY" },
    { rune: "BOUNTY" },
    { rune: "BOUNTY" },
    { rune: "BOUNTY" },
    { rune: "BOUNTY" },
    { rune: "BOUNTY" },
    { rune: "REGEN" },
    { rune: "DOUBLE_DAMAGE" },
  ];

  const successStacks = [1, 1, 1, 1, 1, 0, 0];

  const successMatch = {
    stats: {
      runes: successRunes,
      campStack: successStacks,
    },
  };

  const failMatch = {
    stats: {
      campStack: [1, 1, 1, 1, 0], // 4 stacks
      runes: successRunes,
    },
  };

  test("Should pass. 8+ runes and 5 stacked camps in 5 games", () => {
    const successArray = new Array(5).fill({
      stats: {
        campStack: successStacks,
        runes: successRunes,
      },
    });

    const result = findSequentialMatches(successArray, conditions);

    expect(result.stacksOnStacks.startIndex).toBe(0);
    expect(result.stacksOnStacks.streakLength).toBe(5);
  });

  test("Should pass even with big list of fails", () => {
    const successArray = new Array(5).fill({
      stats: {
        campStack: successStacks,
        runes: successRunes,
      },
    });

    const bigFailList = new Array(20).fill(failMatch);

    const bigList = [...bigFailList, ...successArray, ...bigFailList];

    const result = findSequentialMatches(bigList, conditions);

    expect(result.stacksOnStacks.startIndex).toBe(20);
    expect(result.stacksOnStacks.streakLength).toBe(5);
  });

  test("Should fail if one match has 4 stacks", () => {
    const successArray = new Array(3).fill({
      stats: {
        campStack: successStacks,
        runes: successRunes,
      },
    });
    const matchesWithFailCondition = [
      ...successArray,
      {
        stats: {
          campStack: [1, 1, 1, 1, 0], // 4 stacks
          runes: successRunes,
        },
      },
      successMatch,
    ];

    const result = findSequentialMatches(matchesWithFailCondition, conditions);

    expect(result.stacksOnStacks.startIndex).toBe(-1);
    expect(result.stacksOnStacks.streakLength).toBe(0);
  });

  test("Should fail if not getting bounties", () => {
    const successArray = new Array(4).fill({
      stats: {
        campStack: successStacks,
        runes: successRunes,
      },
    });
    const matchesWithFailCondition = [
      ...successArray,
      {
        stats: {
          campStack: [1, 1, 1, 1, 1, 1], // 4 stacks
          runes: [{ rune: "BOUNTY" }, { rune: "DOUBLE_DAMAGE" }],
        },
      },
      successMatch,
    ];

    const result = findSequentialMatches(matchesWithFailCondition, conditions);

    expect(result.stacksOnStacks.startIndex).toBe(-1);
    expect(result.stacksOnStacks.streakLength).toBe(0);
  });
});
