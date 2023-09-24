/**
 * Analyzes an array of matches to identify sequences that meet specific conditions.
 *
 * For each condition provided, the function scans the matches array once to find
 * the latest sequence where the condition is met for a specified number of consecutive matches.
 *
 * @param {Array} matches - An array of match objects. Each match object should have properties used by the conditions.
 * @param {Object} conditions - An object where each key is a descriptive name for a condition and each value is an object containing:
 *   - condition: A function that takes a match and returns a boolean indicating whether the match meets the condition.
 *   - streakLength: The number of consecutive matches that must meet the condition for a "hit".
 *
 * @return {Object} An object where each key is the name of a condition from the conditions parameter and each value is an object containing:
 *   - startIndex: The starting index of the latest sequence where the condition is met, or -1 if no such sequence exists.
 *   - streakLength: The length of the found sequence (equals to the streakLength from conditions if a sequence is found, 0 otherwise).
 */

// Sample inputs:
// const conditions = {
//     streak_carry_3: {
//       condition: (match) => match.role === "carry" && match.isVictory,
//       streakLength: 3,
//     },
//     streak_mid_5: {
//       condition: (match) => match.role === "middle" && match.isVictory,
//       streakLength: 5,
//     },
//   };

export const findSequentialMatches = (allMatches, conditions) => {
  let result = {};

  conditions.forEach(({ challenge_id, condition, streakLength }) => {
    let qualifying_matches = [];

    for (let i = 0; i < allMatches.length; i++) {
      if (i + streakLength > allMatches.length) break; // exit if insufficient remaining matches

      const streakMatches = allMatches.slice(i, i + streakLength);

      if (condition(streakMatches)) {
        const matchIndices = Array.from(
          { length: streakLength },
          (_, index) => i + index
        );
        qualifying_matches.push(matchIndices);
      }
    }

    result[challenge_id] = qualifying_matches;
  });

  return result;
};
