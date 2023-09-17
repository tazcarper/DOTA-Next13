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

export function findSequentialMatches(matches, conditions) {
  const results = {};
  const counters = {};
  const lastStartIndexes = {};

  for (let conditionName in conditions) {
    counters[conditionName] = 0;
    lastStartIndexes[conditionName] = -1;
  }

  for (let i = 0; i < matches.length; i++) {
    for (let conditionName in conditions) {
      const conditionObj = conditions[conditionName];
      const prevMatches = matches.slice(
        Math.max(0, i - conditionObj.streakLength + 1),
        i
      ); // extract previous matches for the streak

      if (conditionObj.condition(matches[i], prevMatches)) {
        counters[conditionName]++;

        if (counters[conditionName] === conditionObj.streakLength) {
          lastStartIndexes[conditionName] = i - conditionObj.streakLength + 1;
        }
      } else {
        counters[conditionName] = 0;
      }
    }
  }

  for (let conditionName in conditions) {
    const conditionObj = conditions[conditionName];
    results[conditionName] = {
      startIndex: lastStartIndexes[conditionName],
      streakLength:
        lastStartIndexes[conditionName] === -1 ? 0 : conditionObj.streakLength,
    };
  }

  return results;
}
