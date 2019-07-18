const inquirer = require('inquirer');
const chalk = require('chalk');
const { myobBrandColours, winner, secondaryBorder, welcomeMessage, header } = require('./helpers');


const generateGameBoardDisplay = async (gameBoard) => {
  let board = '';
  for (let boardIndex = 0; boardIndex < gameBoard.length; boardIndex++) {
    let tile = gameBoard[boardIndex] !== null ? gameBoard[boardIndex] : '*';
    board += ` ${tile} `;
    if ((boardIndex + 1) % 3 === 0) {
      board += '\n';
    }
  }
  return board;
}

const handlePlayerCoordinates = () => {
  const xOrYAxisRange = { axis1: 1, axis2: 2, axis3: 3}
  const playerCoordinateQuestions = [
    {
      type: 'list',
      name: 'xCoordinate',
      message: 'PLEASE SELECT A X-AXIS COORDINATE',
      choices: [`${xOrYAxisRange.axis1}`, `${xOrYAxisRange.axis2}`, `${xOrYAxisRange.axis3}`]
    },
    {
      type: 'list',
      name: 'yCoordinate',
      message: 'PLEASE SELECT A Y-AXIS COORDINATE',
      choices: [`${xOrYAxisRange.axis1}`, `${xOrYAxisRange.axis2}`, `${xOrYAxisRange.axis3}`]
    },
  ];
  return inquirer.prompt(playerCoordinateQuestions)
  .then(playerAnswers => playerAnswers.xCoordinate + playerAnswers.yCoordinate);
}

const checkPlayer = round => {
  let player = round % 2;
  if (player === 1) {
    console.log(chalk.hex(myobBrandColours.primaryRegal)(`Hey Player 1 - your move for round ${round}!\n`));
    return 'X';
  } else {
    console.log(chalk.hex(myobBrandColours.primaryRouge)(`Hey Player 2 - your move for round ${round}!\n`));
    return 'O';
  }
}

const gameBoard = {
  '11': null, '12': null, '13': null,
  '21': null, '22': null, '23': null,
  '31': null, '32': null, '33': null
}

const displayGameBoard = async (gameBoard) => {
  const currentBoardValues = Object.values(gameBoard);
  return await generateGameBoardDisplay(currentBoardValues);
}

const renderRoundMessage = (playerMarker) => {
  header();
  console.log(secondaryBorder + `\n`);
  console.log(chalk.hex(myobBrandColours.primaryCandy)(`                         CURRENT PLAYER: ${playerMarker}`))
  welcomeMessage();
  console.log(secondaryBorder + `\n`);
} 

const updateGameBoard = async (playerMarker, gameBoard) => {
  // console.log(`\033c`);

  let currentGameBoard = await displayGameBoard(gameBoard);

  // console.logs header & round message //
  renderRoundMessage(playerMarker)
  
  // console.logs currentBoard value returned from the display game board function //
  console.log(currentGameBoard);

  let playerCoordinates = await handlePlayerCoordinates();
  let gameBoardValue = gameBoard[`${playerCoordinates}`]; 
  let tileTaken = false; 

  while (!tileTaken) {
    if (gameBoardValue !== 'X' && gameBoardValue !== 'O' ) {
      gameBoard[`${playerCoordinates}`] = playerMarker;
      tileTaken = true;
    } else {
      console.log(chalk.hex(myobBrandColours.primaryCandy)('\nRuh-roh! Tile taken - please select other coordinates.\n'));
      playerCoordinates = await handlePlayerCoordinates();
      gameBoardValue = gameBoard[`${playerCoordinates}`];
    }
  }
  console.log(chalk.hex(myobBrandColours.secondaryZest)(`\nFINAL BOARD!\n`));

  // like last time this function will still need to run again to redifine the board on exititing the loop //
  currentGameBoard = await displayGameBoard(gameBoard);
  console.log(currentGameBoard);
}

const checkWin = (playerMarker, currentBoard) => {
  if (currentBoard['11'] === playerMarker && currentBoard['12'] === playerMarker && currentBoard['13'] === playerMarker) {
    return true
  } else if (currentBoard['21'] === playerMarker && currentBoard['22'] === playerMarker && currentBoard['23'] === playerMarker) {
    return true
  } else if (currentBoard['31'] === playerMarker && currentBoard['32'] === playerMarker && currentBoard['33'] === playerMarker) {
    return true
  } else if (currentBoard['11'] === playerMarker && currentBoard['21'] === playerMarker && currentBoard['31'] === playerMarker) {
    return true
  } else if (currentBoard['12'] === playerMarker && currentBoard['22'] === playerMarker && currentBoard['32'] === playerMarker) {
    return true
  } else if (currentBoard['13'] === playerMarker && currentBoard['23'] === playerMarker && currentBoard['33'] === playerMarker) {
    return true
  } else if (currentBoard['11'] === playerMarker && currentBoard['22'] === playerMarker && currentBoard['33'] === playerMarker) {
    return true
  } else if (currentBoard['13'] === playerMarker && currentBoard['22'] === playerMarker && currentBoard['31'] === playerMarker) {
    return true
  } else {
    return false
  }
}

const fullBoard = {
  '11': 'O', '12': 'X', '13': 'O',
  '21': 'X', '22': 'X', '23': 'O',
  '31': 'O', '32': 'O', '33': 'X'
}

// all good!
const resetBoard = (gameBoard) => {
  for (let tile in gameBoard) {
    gameBoard[tile] = null;
  }
  return gameBoard
}

const startGame = async () => {
  console.log(`LET'S PLAY TIC TAC TOE!`);
  let victory = false;
  let round = 1;
  while (round < 10 && !victory) {
    const currentPlayerMarker = checkPlayer(round);
    await updateGameBoard(currentPlayerMarker, gameBoard);
    const currentBoard = gameBoard;

    if (round > 4) victory = checkWin(currentPlayerMarker, currentBoard)
    round += 1;
  }

  if (victory) {
    console.log(chalk.hex(myobBrandColours.secondaryZest)(`Congrats, you win!\n`));
    console.log(chalk.hex(myobBrandColours.secondaryPopcorn)(winner));
    console.log(chalk.hex(myobBrandColours.secondaryZest)(`\nPlay again?\n`));
    resetBoard(gameBoard);
  } else {
    console.log(chalk.hex(myobBrandColours.secondaryCabana)(`Draw - play again?\n`));
    resetBoard(gameBoard);
  }
}

module.exports = {
  generateGameBoardDisplay,
  handlePlayerCoordinates,
  checkPlayer,
  displayGameBoard,
  updateGameBoard,
  checkWin,
  resetBoard,
  startGame
}