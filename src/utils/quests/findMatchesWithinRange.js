/**
 * Finds matches within a given range that satisfy certain conditions.
 * @param {Array} matches - Array of match data.
 * @param {Object} conditions - An object containing various match conditions to check.
 * @param {number} windowSize - The range within which we are checking the condition (defaults to 5).
 * @returns {Object} An object containing the result for each condition in conditions.
 */
export function findMatchesWithinRange(matches, conditions, windowSize = 5) {
  const output = {};

  for (const [conditionName, conditionData] of Object.entries(conditions)) {
    output[conditionName] = { results: [] };

    for (let i = 0; i < matches.length; i++) {
      const result = [];
      for (let j = i; j < matches.length && j < i + windowSize; j++) {
        if (conditionData.condition(matches[j])) {
          result.push(j);
          if (result.length === conditionData.streakLength) {
            output[conditionName].results.push([...result]);
            break;
          }
        }
      }
    }

    // Remove overlapping results
    output[conditionName].results = output[conditionName].results.reduce(
      (unique, item) => {
        const last = unique[unique.length - 1];
        if (
          !last ||
          last[last.length - 1] !== item[conditionData.streakLength - 1]
        ) {
          unique.push(item);
        }
        return unique;
      },
      []
    );
  }

  return output;
}
