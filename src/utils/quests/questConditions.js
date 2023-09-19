// Challenge 1: Diverse Roles and Heroes
// In 5 games, play 5 different heroes each from a unique role
// Unique heroes only
export const diverseRolesAndHeroes = {
  condition: (match, prevMatches = []) =>
    prevMatches.every((prev) => prev.hero.id !== match.hero.id) &&
    prevMatches.every((prev) => prev.role !== match.role) &&
    match.isVictory,
  streakLength: 5,
};

// Challenge 2: Support Mastery
// Play as support
// Place at least 10 wards in each game.
// Deward (type 0) at least 2 enemy wards.
// Assist in at least 10 kills.
export const supportMastery = {
  condition: (match) =>
    (match.role === "LIGHT_SUPPORT" || match.role === "HARD_SUPPORT") &&
    match.stats?.wards.filter((ward) => ward.type === 1).length >= 10 &&
    match.stats.wardDestruction?.filter((ward) => ward?.isWard).length >= 2 &&
    match.assists >= 10,
  streakLength: 5,
};

// Challenge 3: Stacks on Stacks!
// Stack at least 5 camps per game
// Get at least 8 bounty runes per game
export const stacksOnStacks = {
  condition: (match) =>
    match.stats.campStack.filter((stack) => stack > 0).length >= 5 &&
    match.stats.runes.filter((rune) => rune.rune === "BOUNTY").length >= 8,
  streakLength: 5,
};

// Challenge 4: Greed is Good!
// Win 3 games in a row with over 700 GPM and use unique heroes
export const goldMiner = {
  condition: (match, prevMatches = []) => {
    const hasUsedThisHeroBefore = prevMatches.some(
      (prevMatch) => prevMatch.hero.id === match.hero.id
    );
    return (
      match.isVictory && match.goldPerMinute >= 700 && !hasUsedThisHeroBefore
    );
  },
  streakLength: 3,
};

// Challenge 5: Say 'No' to Death
// Win 3 games with less than 6 deaths three games in a row
// Recommended: findMatchesWithinRange
export const sayNoToDeath = {
  condition: (match) => match.deaths <= 6 && match.isVictory,
  streakLength: 3,
};

// Challenge 7: The Healing Touch
export const skillfulSaver = {
  condition: (match) => match.heroHealing > 7500,
  streakLength: 3,
};

// Challenge 8: Courier Hunter
export const courierHunter = {
  condition: (match) => match.stats.courierKills.length >= 1,
  streakLength: 5,
};

// Challenge 9: Map Dominance
export const mapDominance = {
  condition: (match) =>
    new Set(
      match.stats.wards
        .filter((ward) => ward.type === 1)
        .map((ward) => `${ward.positionX},${ward.positionY}`)
    ).size >= 5 &&
    new Set(
      match.stats.wards
        .filter((ward) => ward.type === 0)
        .map((ward) => `${ward.positionX},${ward.positionY}`)
    ).size >= 3,
  streakLength: 5,
};

// Challenge 10: Efficiency Expert
export const efficiencyExpert = {
  condition: (match) => match.numLastHits > 100 && match.numDenies >= 10,
  streakLength: 5,
};

// Challenge 11: Hero Dominance
export const heroDominance = {
  condition: (match) => match.heroDamage > 20000,
  streakLength: 5,
};

// Challenge 12: Experience Harvester
export const experienceHarvester = {
  condition: (match) => match.experiencePerMinute > 600,
  streakLength: 5,
};

// Challenge 13: Team Player
export const teamPlayer = {
  condition: (match) => match.award === "MVP",
  streakLength: 5,
};
