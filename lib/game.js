const inquirer = require('inquirer');
const chalk = require('chalk');
const { myobBrandColours, winner } = require('./helpers');

// VARIABLE: gameBoard tracks player inputs on board, changes from null to 'X' or 'O' until there's a winning combination
let gameBoard = [
  null, null, null,
  null, null, null,
  null, null, null
];

// FUNCTION: displayBoard() takes gameBoard and renders the view shown to the players: '*' (for null), 'X' for player 1, 'O' for player 2
const displayGameBoard = async (gameBoard) => {
  // const emptyTile = '*';
  // console.log(`
  // ${gameBoard[0] ? gameBoard[0] : emptyTile}  ${gameBoard[1] ? gameBoard[1] : emptyTile}  ${gameBoard[2] ? gameBoard[2] : emptyTile}
  // ${gameBoard[3] ? gameBoard[3] : emptyTile}  ${gameBoard[4] ? gameBoard[4] : emptyTile}  ${gameBoard[5] ? gameBoard[5] : emptyTile}
  // ${gameBoard[6] ? gameBoard[6] : emptyTile}  ${gameBoard[7] ? gameBoard[7] : emptyTile}  ${gameBoard[8] ? gameBoard[8] : emptyTile}
  // `)

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

// coordinateRange specifies the data type and range of x-axis and y-axis inputs/selections
// needs to be string so it can be concatenated and matched to coordinateToTiles object
const coordinateRange = ['1', '2', '3']; // const xOrYAxisRange = { axis1: 1, axis2: 2, axis3: 3}??

// FUNCTION: handlePlayerCoordinates() presents coordinates selection menu for x-axis and y-axis
// captures selection and extracts values from answers object using Inquirer, concatenates answers into a string to be returned
const handlePlayerCoordinates = () => {
  const playerCoordinateQuestions = [
    {
      type: 'list',
      name: 'xCoordinate',
      message: 'PLEASE SELECT A X-AXIS COORDINATE',
      choices: coordinateRange
      // choices: [`${xOrYAxisRange.axis1}`, `${xOrYAxisRange.axis2}`, `${xOrYAxisRange.axis3}`]
    },
    {
      type: 'list',
      name: 'yCoordinate',
      message: 'PLEASE SELECT A Y-AXIS COORDINATE',
      choices: coordinateRange
    },
  ];
  // returns a promise containing the answers to the questions
  // { xCoordinate: '1', yCoordinate: '1'}
  return inquirer.prompt(playerCoordinateQuestions)
  // .then forces wait until answers have been returned, concatenates and then returns the result
  .then(playerAnswers => playerAnswers.xCoordinate + playerAnswers.yCoordinate);
}

// FUNCTION: checkPlayer() takes the count of which round it is to calculate which player and return 'X' or 'O'
const checkPlayer = round => {
  let player = round % 2;
  if (player === 1) {
    console.log(chalk.hex(myobBrandColours.secondaryCabana)(`You are player 1 (X) - round ${round}`));
    return 'X';
  } else {
    console.log(chalk.hex(myobBrandColours.secondaryPopcorn)(`You are player 2 (O) - round ${round}`));
    return 'O';
  }
}

// VARIABLE: gameBoardIndex objects matches all possible player inputs to specific index in gameBoard array
const gameBoardIndex = {
  '11': gameBoard[0], '12': gameBoard[1], '13': gameBoard[2],
  '21': gameBoard[3], '22': gameBoard[4], '23': gameBoard[5],
  '31': gameBoard[6], '32': gameBoard[7], '33': gameBoard[8]
}

// FUNCTION: updateGameBoard: takes player coordinates, playerMarker and coordinateToTiles object
// Checks if object has property matching input
// If yes, it will reassign the value from null to 'X' or 'O'
// It should also give an error if that place has already been taken by a value other than null
const updateGameBoard = async (playerMarker, gameBoardIndex) => {
  console.log(`---------- this is the updated game board ---------- `)
  // console.log(gameBoardIndex);

  // Creates an array of all values from gameBoardIndex
  // [ 'X', null, null, null, 'O', null, null, null, null ]
  let currentBoardValues = Object.values(gameBoardIndex);
  let displayCurrentBoard = await displayGameBoard(currentBoardValues);
  // console.log('\033c');
  console.log(displayCurrentBoard);


  // Prompt current player (playerMarker) to provide a coordinate
  console.log(`-----before the loop starts, ask for coordinates ----`)
  let playerCoordinates = await handlePlayerCoordinates(); // '11'
  // Extract and store the value of the tile at a given position in the gameBoard
  let gameBoardValue = gameBoardIndex[`${playerCoordinates}`]; // null => ''

  let tileTaken = false;  
  while (!tileTaken) {

    console.log('loop started...')
    // If the tile is null - i.e. not 'X' or 'O', change the value of the array from null to the marker
    if (gameBoardValue !== 'X' && gameBoardValue !== 'O' ) {
      console.log('Coordinates valid')
      gameBoardIndex[`${playerCoordinates}`] = playerMarker;
      tileTaken = true;
    // Else if the tile has been taken with an 'X' or 'O', throw an error message, prompt for another coordinate, then assign that coordinate to a place in the array with the marker
    } else {
      console.log('Tile taken - please re-enter coordinates.');
      // prompt new coordinates
      playerCoordinates = await handlePlayerCoordinates();
      gameBoardValue = gameBoardIndex[`${playerCoordinates}`];
    }
  }

  // console.log(`----- updated board after while loop has met conditions -----`)
  // console.log(gameBoardIndex);
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

const resetBoard = (gameBoardIndex) => {
  for (let tile in gameBoardIndex) {
    console.log(tile);
    gameBoardIndex[tile] = null;
  }
}

const startGame = async () => {
    // Ask Player 1 for input
    // Ask player 2 for input
    // After round > 4
    // Check if the Player has won
    // If not switch back to the other plater
    // If yes, victory = true

  console.log(`LET'S PLAY TIC TAC TOE!`);
  // will change to true to end loop/game when there is a winner or draw
  let victory = false;
  // counter keeps track of how many turns, this is used to id if player 1 (X) or player 2 (O)
  let round = 1;
  // while round is less than the max. of 9 OR victory equalling false is TRUE
  while (round < 10 && !victory) {
    let currentPlayerMarker = checkPlayer(round); // 'X' or 'O' depending on round
    console.log(`Hi player ${currentPlayerMarker}! This is round: ${round}.`)

    await updateGameBoard(currentPlayerMarker, gameBoardIndex);
    const currentBoard = gameBoardIndex;
    // console.log(`----- this is the current board, yay -----`)
    // console.log(currentBoard);


    if (round > 4) {
      console.log('Checking...')
      victory = checkWin(currentPlayerMarker, currentBoard)
      if (victory) console.log(`WIN!`);
    }
    round += 1;
  }

  if (victory) {
    console.log('YOU WON!');
    resetBoard(gameBoardIndex);
  } else {
    console.log('Draw - play again?')
    resetBoard(gameBoardIndex);
  }
}

startGame();

module.exports = {
  startGame
}