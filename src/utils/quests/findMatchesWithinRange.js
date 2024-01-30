export function findMatchesWithinRange({ matches, conditions }) {
  const result = {};

  conditions.forEach(
    ({ condition, challenge_id, streakLength, streakRange }) => {
      result[challenge_id] = [];

      for (
        let startIdx = 0;
        startIdx <= matches.length - streakLength;
        startIdx++
      ) {
        let qualifyingMatches = [];
        let endIdx = startIdx + streakRange - 1;

        if (endIdx >= matches.length) {
          endIdx = matches.length - 1;
        }

        for (
          let currIdx = startIdx;
          currIdx <= endIdx && qualifyingMatches.length < streakLength;
          currIdx++
        ) {
          if (condition([matches[currIdx]])) {
            qualifyingMatches.push(matches[currIdx].matchId); // changed this line
          }
        }

        if (
          qualifyingMatches.length === streakLength &&
          !result[challenge_id].some(
            (arr) => JSON.stringify(arr) === JSON.stringify(qualifyingMatches)
          )
        ) {
          result[challenge_id].push(qualifyingMatches);
        }
      }
    }
  );

  return result;
}
