const input = await Deno.readTextFile("./input.txt");

const chars = input.split('');

const offset = chars.reduce((result, char, index) => {
  if (result.complete) {
    return result;
  }

  const exists = result.startOfPacket.includes(char);

  if (exists) {
    return {
      ...result,
      startOfPacket: [char]
    }
  }

  const nextStartOfPacket = [...result.startOfPacket, char];  

  return {
    ...result,
    value: index + 1,
    complete: nextStartOfPacket.length === 4,
    startOfPacket: nextStartOfPacket
  }
}, {
  value: null,
  complete: false,
  startOfPacket: []
});

console.log(chars.length)
console.log(offset);

