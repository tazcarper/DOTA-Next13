/**
 * Transforms a list of players with their Steam accounts and match details
 * into a list of Steam accounts enriched with specific match details.
 */

import { unixTimestampToDate } from "@/utils/unixTimeConverter";

export default function buildGuildList({ membersList = [], filters }) {
  if (membersList.length <= 0) return [];
  return membersList.map((player) => {
    const playerInfo = { ...player.steamAccount };
    const playerId = player.steamAccount.id;
    const matches = player.matches.map((match) => {
      const { id, startDateTime } = match;
      const playedHero = match.players.filter(
        (player) => player.steamAccount.id === playerId
      );

      playedHero.id = id;
      playedHero.startDateTime = startDateTime;
      // Check if active
      const isActive = isActiveRange(unixTimestampToDate(startDateTime), 6);
      return { ...playedHero[0], id, startDateTime, isActive };
    });
    playerInfo.matches = matches;
    return playerInfo;
  });
}

function isActiveRange(startDate, months = 3) {
  // Get the current date and its details
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  // Calculate the date 'months' ago
  const monthsAgoDate = new Date(
    currentYear,
    currentMonth - months,
    currentDate.getDate()
  );

  // Check if the event date is after 'months' ago and before or equal to the current date
  return startDate >= monthsAgoDate && startDate <= currentDate;
}
