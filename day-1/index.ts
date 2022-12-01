const input = await Deno.readTextFile("./input.txt");

const splitByElf = input.split('\n\n');

console.log(splitByElf);

const mealsTotaled = splitByElf
  .map(item => item.split('\n')
    .map(value => parseInt(value))
    .filter(value => !isNaN(value)))
  .map(meals => meals.reduce((sum, meal) => sum + meal, 0));

const lowToHigh = mealsTotaled.sort((next, prev) => {
  return next - prev;
});

const highToLow = lowToHigh.reverse();

const [first, second, third] = highToLow;

console.log('The total value of the top 3 elves is', first + second + third);