import { findSequentialMatches } from "../../src/utils/quests/findSequentialMatches";
import { supportMastery } from "../../src/utils/quests/questConditions";

describe("Support Mastery Condition Test", () => {
  const conditions = {
    supportMastery,
  };

  const matchThatPasses = {
    role: "LIGHT_SUPPORT",
    stats: {
      wards: [
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 }, // 10 type 1 wards
      ],
      wardDestruction: [{ isWard: true }, { isWard: true }],
    },
    assists: 11,
  };

  const matchesWithFailCondition = {
    role: "LIGHT_SUPPORT",
    stats: {
      wards: [{ type: 1 }, { type: 1 }, { type: 1 }, { type: 0 }, { type: 0 }],
      wardDestruction: [],
    },
    assists: 5,
  };

  const matchesWithFailConditionNoAssists = {
    role: "LIGHT_SUPPORT",
    stats: {
      wardDestruction: [],
      wards: [
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 },
        { type: 1 }, // 10 type 1 wards
        { type: 0 },
        { type: 0 },
        { type: 0 },
        { type: 0 },
        { type: 0 }, // 5 type 0 wards
      ],
    },
    assists: 0,
  };

  test("Should return a valid index for supportMastery condition", () => {
    const matchesWithSuccessCondition = new Array(5).fill(matchThatPasses);

    const result = findSequentialMatches(
      matchesWithSuccessCondition,
      conditions
    );

    expect(result.supportMastery.startIndex).toBe(0);
    expect(result.supportMastery.streakLength).toBe(5);
  });

  test("Should pass when first fails but 5 next ones succeed", () => {
    const matchesWithSuccessCondition = new Array(5).fill(matchThatPasses);

    const matchesWithFailConditionArray = [
      matchesWithFailCondition,
      ...matchesWithSuccessCondition,
      matchesWithFailConditionNoAssists,
    ];

    const result = findSequentialMatches(
      matchesWithFailConditionArray,
      conditions
    );

    expect(result.supportMastery.startIndex).toBe(1);
    expect(result.supportMastery.streakLength).toBe(5);
  });

  test("Should return a valid index, 0, for supportMastery condition", () => {
    const matchesWithSuccessCondition = new Array(5).fill(matchThatPasses);

    const result = findSequentialMatches(
      matchesWithSuccessCondition,
      conditions
    );

    expect(result.supportMastery.startIndex).toBe(0);
    expect(result.supportMastery.streakLength).toBe(5);
  });

  test("Should return a valid index at 4", () => {
    const matchesWithSuccessCondition = new Array(5).fill(matchThatPasses);

    const result = findSequentialMatches(
      [
        matchesWithFailCondition,
        matchesWithFailConditionNoAssists,
        matchesWithFailCondition,
        matchesWithFailCondition,
        ...matchesWithSuccessCondition,
      ],
      conditions
    );

    expect(result.supportMastery.startIndex).toBe(4);
    expect(result.supportMastery.streakLength).toBe(5);
  });

  test("Should fail and return -1 if 5 matchds with 1 failed one", () => {
    const matchesWithSuccessCondition = new Array(4).fill(matchThatPasses);
    const matchesWithFailConditionArray = [
      matchesWithFailCondition,
      ...matchesWithSuccessCondition,
    ];

    const result = findSequentialMatches(
      matchesWithFailConditionArray,
      conditions
    );

    expect(result.supportMastery.startIndex).toBe(-1);
    expect(result.supportMastery.streakLength).toBe(0);
  });

  test("Should fail with 4 bad, 1 good, 4 bad", () => {
    const matchesWithSuccessCondition = new Array(4).fill(matchThatPasses);
    const matchesWithFailConditionArray = [
      ...matchesWithSuccessCondition,
      matchesWithFailConditionNoAssists,
      ...matchesWithSuccessCondition,
    ];

    const result = findSequentialMatches(
      matchesWithFailConditionArray,
      conditions
    );

    expect(result.supportMastery.startIndex).toBe(-1);
    expect(result.supportMastery.streakLength).toBe(0);
  });
});
