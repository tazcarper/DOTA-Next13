export function getPercentageTowards24Hours(
  startTime,
  currentTime = new Date()
) {
  if (!(startTime instanceof Date) || !(currentTime instanceof Date)) {
    throw new Error(
      "Both startTime and currentTime must be instances of Date."
    );
  }

  const oneDayInMillis = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
  const timeDiffInMillis = currentTime.getTime() - startTime.getTime();

  return (timeDiffInMillis / oneDayInMillis) * 100;
}
