const path =
  "https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes/";

export default function generateHeroPortrait(name) {
  return `${path}${name}.png`;
}
