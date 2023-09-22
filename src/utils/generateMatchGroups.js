export default function generateMatchGroups(matches) {
  const groups = [];
  for (let i = 0; i <= matches.length - 5; i++) {
    const group = matches.slice(i, i + 5);
    groups.push(group);
  }
  return groups;
}
