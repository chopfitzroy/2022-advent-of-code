// Each letter has a number representation
// Each rucksack should be split down the middle (varried lengths)
// Each half of the rucksack will have a commin letter
// Find all of the common letters
// Convert all of the common letters to their number variant
// Sum all of the number variants

const input = await Deno.readTextFile("./input.txt");

const letterToNumber = {
  a: 1,
  b: 2,
  c: 3,
  d: 4,
  e: 5,
  f: 6,
  g: 7,
  h: 8,
  i: 9,
  j: 10,
  k: 11,
  l: 12,
  m: 13,
  n: 14,
  o: 15,
  p: 16,
  q: 17,
  r: 18,
  s: 19,
  t: 20,
  u: 21,
  v: 22,
  w: 23,
  x: 24,
  y: 25,
  z: 26,
  A: 27,
  B: 28,
  C: 29,
  D: 30,
  E: 31,
  F: 32,
  G: 33,
  H: 34,
  I: 35,
  J: 36,
  K: 37,
  L: 38,
  M: 39,
  N: 40,
  O: 41,
  P: 42,
  Q: 43,
  R: 44,
  S: 45,
  T: 46,
  U: 47,
  V: 48,
  W: 49,
  X: 50,
  Y: 51,
  Z: 52,
}

const split = (str: string, index?: number) => {
  const location = index ?? str.length / 2;
  const result = [str.slice(0, location), str.slice(location)];

  return result;
}

const findMatches = (left: string, right: string) => {
  const leftAsChars = left.split('');
  const found = leftAsChars.find(char => right.includes(char));
  
  return found;  
}

const lines = input.split('\n');
const sacks = lines.map(line => split(line));
const matches = sacks.map(([left, right]) => findMatches(left, right));
const numbers = matches.map(match => letterToNumber[match]);
const total = numbers.reduce((sum, next) => sum + next, 0);

console.log(total);
