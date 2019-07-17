const inquirer = require('inquirer');
const chalk = require('chalk');
const { myobBrandColours, winner, secondaryBorder, welcomeMessage, header } = require('./helpers');

// FUNCTION: displayBoard() takes array of values extracted from gameBoard and renders the view shown to the players: '*' (for null), 'X' for Player 1, 'O' for Player 2
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

// FUNCTION: handlePlayerCoordinates() presents coordinates selection menu for x-axis and y-axis
// captures selection and extracts values from answers object using Inquirer, concatenates answers into a string to be returned
const handlePlayerCoordinates = () => {
  // xOrYAxisRange specifies the data type and range of x-axis and y-axis inputs/selections
  // needs to be converted to string so it can be concatenated and matched to coordinateToTiles object
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
  // returns a promise containing the answers to the questions: { xCoordinate: '1', yCoordinate: '1'}
  return inquirer.prompt(playerCoordinateQuestions)
  // .then forces wait until answers have been returned, concatenates and then returns the result
  .then(playerAnswers => playerAnswers.xCoordinate + playerAnswers.yCoordinate);
}

// FUNCTION: checkPlayer() takes the count of which round it is to calculate which player and return 'X' or 'O'
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

// VARIABLE: gameBoard object matches all possible player coordinate selections to a key in the gameBoard
const gameBoard = {
  '11': null, '12': null, '13': null,
  '21': null, '22': null, '23': null,
  '31': null, '32': null, '33': null
}

// FUNCTION: updateGameBoard() takes playerMarker, gameBoard object and round
// It reassign the value from null to 'X' or 'O'
// It should also give an error if that place has already been taken by a value other than null
const updateGameBoard = async (playerMarker, gameBoard, round) => {
  // Creates an array from values stored in gameBoard object: e.g. [ 'X', null, null, null, 'O', null, null, null, null ]
  console.log('\033c');
  let currentBoardValues = Object.values(gameBoard);
  let displayCurrentGameBoard = await generateGameBoardDisplay(currentBoardValues);
  header();
  console.log(secondaryBorder + `\n`);
  console.log(chalk.hex(myobBrandColours.primaryCandy)(`                         CURRENT PLAYER: ${playerMarker}`))
  welcomeMessage();
  console.log(secondaryBorder + `\n`);
  checkPlayer(round);
  console.log(displayCurrentGameBoard);

  // Prompt current player (playerMarker) to provide a coordinate
  let playerCoordinates = await handlePlayerCoordinates(); // '11'
  // Extract and store the value of the tile at a given position in the gameBoard
  let gameBoardValue = gameBoard[`${playerCoordinates}`]; // null => ''

  let tileTaken = false;  
  while (!tileTaken) {

    // If the tile is null - i.e. not 'X' or 'O', change the value of the array from null to the marker
    if (gameBoardValue !== 'X' && gameBoardValue !== 'O' ) {
      gameBoard[`${playerCoordinates}`] = playerMarker;
      tileTaken = true;
    // Else if the tile has been taken with an 'X' or 'O', throw an error message, prompt for another coordinate, then assign that coordinate to a place in the array with the marker
    } else {
      console.log(chalk.hex(myobBrandColours.primaryCandy)('\nRuh-roh! Tile taken - please select other coordinates.\n'));
      // prompt new coordinates
      playerCoordinates = await handlePlayerCoordinates();
      gameBoardValue = gameBoard[`${playerCoordinates}`];
    }
  }
  currentBoardValues = Object.values(gameBoard);
  console.log(chalk.hex(myobBrandColours.secondaryZest)(`\nFINAL BOARD!\n`));
  displayCurrentGameBoard = await generateGameBoardDisplay(currentBoardValues);
  console.log(displayCurrentGameBoard);
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

const resetBoard = (gameBoard) => {
  for (let tile in gameBoard) {
    gameBoard[tile] = null;
  }
}

const startGame = async () => {
  console.log(`LET'S PLAY TIC TAC TOE!`);
  // will change to true to end loop/game when there is a winner or draw
  let victory = false;
  // counter keeps track of how many turns, this is used to id if player 1 (X) or player 2 (O)
  let round = 1;
  // while round is less than the max. of 9 OR victory equalling false is TRUE
  while (round < 10 && !victory) {
    let currentPlayerMarker = checkPlayer(round); // 'X' or 'O' depending on round

    await updateGameBoard(currentPlayerMarker, gameBoard, round);
    const currentBoard = gameBoard;

    if (round > 4) {
      victory = checkWin(currentPlayerMarker, currentBoard)
    }
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

module.exports = { startGame }