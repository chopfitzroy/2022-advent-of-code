// Find all groups 6-10 (6,7,8,9,10)
// That fully contain smaller grounds 7-9 (7,8,9)

const input = await Deno.readTextFile("./input.txt");

const lines = input.split('\n');
const ranges = lines.map(line => line.split(','));

const formatted = ranges.map(([left, right]) => {
  const [leftLow, leftHigh] = left.split('-');
  const [rightLow, rightHigh] = right.split('-');
  
  return {
    leftLow: parseInt(leftLow),
    leftHigh: parseInt(leftHigh),
    rightLow: parseInt(rightLow),
    rightHigh: parseInt(rightHigh),
  }
});

const encapsulated = formatted.filter(item => {
    
  const leftIn = item.leftLow >= item.rightLow && item.leftHigh <= item.rightHigh;
  const rightIn = item.rightLow >= item.leftLow && item.rightHigh <= item.leftHigh;
  
  
  return leftIn || rightIn;
});

console.log(ranges.length, encapsulated.length);

// console.log(encapsulated);
