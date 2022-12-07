const input = await Deno.readTextFile("./input.txt");

const hasRepeats = (str: string) => {
  return /(.).*\1/.test(str);
};

const getOffset = (str: string, offset: number) => {
  const chars = str.split("");

  return chars.reduce<number>((result, _, index, payload) => {
    if (result !== 0) {
      return result;
    }

    const segment = payload.slice(index, index + offset).join("");

    if (!hasRepeats(segment)) {
      return index + offset;
    }

    return 0;
  }, 0);
};

console.log(getOffset(input, 14));
