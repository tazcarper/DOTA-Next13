// const condition = match => match.role === "carry" && match.isVictory;

export function findMatchesWithinRange(
  matches,
  condition,
  windowSize,
  requiredMatches
) {
  let latestValidStartIndex = -1;

  for (let i = 0; i <= matches.length - windowSize; i++) {
    let matchCount = 0;
    for (let j = i; j < i + windowSize; j++) {
      if (condition(matches[j])) {
        matchCount++;
      }
    }
    if (matchCount >= requiredMatches) {
      latestValidStartIndex = i;
    }
  }

  return latestValidStartIndex;
}
