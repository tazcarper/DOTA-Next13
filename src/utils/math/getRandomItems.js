export function getRandomItems(arr, n = 3) {
  let shuffled = arr.slice(); // create a copy of the array
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // swap
  }
  return shuffled.slice(0, n);
}
