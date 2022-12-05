const input = await Deno.readTextFile("./input.txt");

const ignoreList = ['[', ']', ' '];

const lastBracket = input.lastIndexOf(']');
const firstInstruction = input.indexOf('m');

const boxes = input.slice(0, lastBracket + 1);
const instructions = input.slice(firstInstruction).split('\n');

const steps = instructions.map(instruction => {
  const slices = instruction.split(' ');
  return [slices[1], slices[3], slices[5]];
});

const lines = boxes.split('\n');
const chars = lines.map(line => line.split(''));

const sorted = chars.map(charLine => {
  return charLine.reduce((result, char, index) => {
    if (ignoreList.includes(char)) {
      return result;
    }
    
    const exists = result[index] ?? [];
    const location = ((index - 1) / 4) + 1;
    
    return {
      ...result,
      [location]: [...exists, char]
    }
    
  }, {})
})

const merged = sorted.reverse().reduce((result, item) => {
  Object.entries(item).forEach(([key, value]) => { 
    const exists = result[key] ?? [];
    result[key] = [...exists, ...value]
  });
  
  return result;
}, {});



steps.forEach(([amount, from, to]) => {
  for (let i = 0; i < amount; i++) {
    const value = merged[from].pop();
    merged[to] = [...merged[to], value]
  }
})

const output = Object.values(merged).map(item => item.pop()).join('');

console.log(output);
