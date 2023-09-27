import { findSequentialMatches } from "../src/utils/quests/findSequentialMatches";
import {simpleKillChallenge, goldMiner} from "../src/utils/quests/questConditions";

describe("findSequentialMatches  function", () => {
  const challenge1 = 3;
  const challenge2 = 6;
  const conditions = [
    {
      ...simpleKillChallenge,
      challenge_id: challenge1,
    },
     {
      ...goldMiner,
      challenge_id: challenge2,
    },
  ];

  test("Two conditions both pass", () => {
    const matches = [
      {  hero: { id: 101 }, role: "carry", isVictory: true, kills: 7, goldPerMinute: 5 },
      {  hero: { id: 102 }, role: "carry", isVictory: true,  kills: 7, goldPerMinute: 666 },
      {  hero: { id: 103 }, role: "carry", isVictory: true,  kills: 7, goldPerMinute: 666 },
      {  hero: { id: 104 }, role: "middle", isVictory: false, kills: 0, goldPerMinute: 666 },
      {  hero: { id: 105 }, role: "carry", isVictory: false, kills: 7, goldPerMinute: 666 },
      {  hero: { id: 106 },  role: "carry", isVictory: true, kills: 7, goldPerMinute: 666 },
      {  hero: { id: 107 }, role: "carry", isVictory: true, kills: 7, goldPerMinute: 666 },
      {  hero: { id: 108 },  role: "carry", isVictory: true, kills: 7, goldPerMinute: 666 },
    ];

    const result = findSequentialMatches(
      matches,
      conditions
    );
   
    expect(result[challenge1].length).toBe(5);
    expect(result[challenge1][0].length).toBe(2);

    expect(result[challenge2].length).toBe(1);
    expect(result[challenge2][0].length).toBe(3);
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
    const result = findSequentialMatches(
      matches,
      conditions
    );
   
    expect(result[challenge1].length).toBe(0);
    expect(result[challenge2].length).toBe(0);
   
  });

  test("One passes and one fails.", () => {
    const matches = [
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true },
      { role: "middle", isVictory: false },
      { role: "carry", isVictory: true },
      { role: "carry", isVictory: true,kills: 7 },
      { role: "carry", isVictory: true,kills: 7 },
    ];
    const result = findSequentialMatches(
      matches,
      conditions
    );
   
    expect(result[challenge1].length).toBe(1);
    expect(result[challenge1][0].length).toBe(2);

    expect(result[challenge2].length).toBe(0);
  });

 
});
