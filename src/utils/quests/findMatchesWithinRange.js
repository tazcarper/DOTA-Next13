export function findMatchesWithinRange({matches, conditions, maxRange = 5, qualifyCount}) {
  const result = {};

  conditions.forEach(({ condition, challenge_id }) => {
    result[challenge_id] = [];

    // Create a set to store strings representing each array of indices
    const indicesSet = new Set();

    for (let range = qualifyCount; range <= maxRange; range++) {
      for (let i = 0; i <= matches.length - range; i++) {
        const indices = [];
        for (let j = i; j < i + range && indices.length < qualifyCount; j++) {
          if (condition(matches[j])) {
            indices.push(j);
          }
        }
        if (indices.length === qualifyCount) {
          // Convert the indices array to a string
          const indicesString = indices.join(',');

          // Check if this string is already in the indicesSet
          if (!indicesSet.has(indicesString)) {
            // If not, add the string to the indicesSet and the array to the result[challenge_id] array
            indicesSet.add(indicesString);
            result[challenge_id].push(indices);
          }
        }
      }
    }
  });

  return result;
}
