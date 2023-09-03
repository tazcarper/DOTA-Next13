export function toCommunityID(id) {
  if (typeof id === "string" && id.startsWith("STEAM_")) {
    const parts = id.split(":");
    const value = BigInt(parts[2]) * 2n + 76561197960265728n + BigInt(parts[1]);
    return value;
  } else if (typeof id === "number" && id.toString().length < 16) {
    return BigInt(id) + 76561197960265728n;
  } else {
    return id; // We have no idea what this is, so just return it.
  }
}

export function toSteamID(id) {
  let z;
  if (typeof id === "bigint" && id.toString().length >= 16) {
    z = (id - 76561197960265728n) / 2n;
  } else if (typeof id === "number") {
    z = BigInt(id) / 2n;
  } else {
    return id; // We have no idea what this is, so just return it.
  }
  const y = id % 2n;
  return `STEAM_0:${y}:${Number(z)}`;
}

export function toUserID(id) {
  if (typeof id === "string" && id.startsWith("STEAM_")) {
    const split = id.split(":");
    return Number(split[2]) * 2 + Number(split[1]);
  } else if (
    typeof id === "bigint" &&
    id.toString().startsWith("765") &&
    id.toString().length > 15
  ) {
    return Number(id - 76561197960265728n);
  } else {
    return id; // We have no idea what this is, so just return it.
  }
}
