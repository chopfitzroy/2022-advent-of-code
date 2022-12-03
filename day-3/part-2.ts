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

const chunk = (input: string[], perChunk: number = 3) => input.reduce((resultArray, item, index) => { 
  const chunkIndex = Math.floor(index/perChunk)

  if(!resultArray[chunkIndex]) {
    resultArray[chunkIndex] = [] // start a new chunk
  }

  resultArray[chunkIndex].push(item)

  return resultArray
}, []);

const findMatches = (first: string, second: string, third: string) => {
  const firstAsChars = first.split('');
  const found = firstAsChars.find(char => {
    const existsInAllThree = second.includes(char) && third.includes(char);
    return existsInAllThree;
  });
  
  return found;  
}

const lines = input.split('\n');
const groups = chunk(lines);
const matches = groups.map(([first, second, third]) => findMatches(first, second, third));
const numbers = matches.map(match => letterToNumber[match]);
const total = numbers.reduce((sum, next) => sum + next, 0);

console.log(total);
