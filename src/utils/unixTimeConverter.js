export function unixTimestampToDate(unixTimestamp) {
  return new Date(unixTimestamp * 1000);
}

export function dateToUnixTimestamp(date) {
  return Math.floor(date.getTime() / 1000);
}
