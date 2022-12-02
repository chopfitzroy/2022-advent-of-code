type PlayerOneInput = 'A' | 'B' | 'C';
type PlayerTwoInput = 'X' | 'Y' | 'Z';

const input = await Deno.readTextFile("./input.txt");

const choices = ["Rock", "Paper", "Scissors"];

const pointsMatrix = {
  Rock: 1,
  Paper: 2,
  Scissors: 3
}

const enemyMatrix = {
  A: {
    name: 'Rock',
    X: 'Scissors',
    Y: 'Rock',
    Z: 'Paper'
  },
  B: {
    name: 'Paper',
    X: 'Rock',
    Y: 'Paper',
    Z: 'Scissors'
  },
  C: {
    name: 'Scissors',
    X: 'Paper',
    Y: 'Scissors',
    Z: 'Rock'
  }
}

const determineGamePoints = (playerOne: number, playerTwo: number) => {
  
  const losePoints = 0;
  const drawPoints = 3;
  const winPoints = 6;
  
  if (playerOne === playerTwo) {
    return drawPoints;
  }
  if (playerOne === choices.length - 1 && playerTwo === 0) {
    return winPoints;
  }
  if (playerTwo === choices.length - 1 && playerOne == 0) {
    return losePoints;
  }
  if (playerOne > playerTwo) {
    return losePoints;
  } 

  return winPoints;
}

const determineTotalPoints = (playerOne: PlayerOneInput, playerTwo: PlayerTwoInput) => {

  const enemyValue = enemyMatrix[playerOne];

  const yourValue = enemyValue[playerTwo];
  
  // console.log(yourValue);
  
  const playerOneIndex = choices.indexOf(enemyValue.name);
  const playerTwoIndex = choices.indexOf(yourValue);
    
  const gamePoints = determineGamePoints(playerOneIndex, playerTwoIndex);  
  
  return gamePoints + pointsMatrix[yourValue];
}

const rounds = input.split('\n');

const points = rounds
  .map(item => item.split(' '))
  .map(([playerOneChoice, playerTwoChoice]) => determineTotalPoints(playerOneChoice, playerTwoChoice))
  .reduce((total, score) => total + score, 0);

console.log(points);


