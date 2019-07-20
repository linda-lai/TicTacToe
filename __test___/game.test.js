const {
  generateGameBoardDisplay,
  handlePlayerCoordinates,
  checkPlayer,
  displayGameBoard,
  updateGameBoard,
  checkWin,
  resetBoard,
  startGame
} = require('../lib/game');

describe('generateGameBoardDisplay should format the game board to display', () => {
  const mockGameBoard = ['X', null, null, null, 'O', null, null, null, null];
  test('will take the gameBoard array and format the player markers', async () => {
    const board = await generateGameBoardDisplay(mockGameBoard);
    expect(board).toMatch(` X  *  * \n *  O  * \n *  *  * `);
  })
  test('will take the gameBoard array and format the display into a string', async () => {
    const board = await generateGameBoardDisplay(mockGameBoard);
    expect(typeof board).toBe('string');
  })
})

describe('mocked functionality of handlePlayerCoordinates() should format player coordinate selections', () => {
  const mockPlayerAnswers = { xCoordinate: '1', yCoordinate: '2'}
  const mockInquirerConcatenation = jest.fn().mockReturnValue(mockPlayerAnswers.xCoordinate + mockPlayerAnswers.yCoordinate)
  test('will create an answers object', () => {
    const mockInquirerPrompt = jest.fn().mockReturnValue(mockPlayerAnswers)
    expect(typeof mockInquirerPrompt()).toBe('object')
  })
  test('will concatenate the x-coordinate and y-coordinate', () => {
    expect(mockInquirerConcatenation()).toEqual('12');
  })
  test('will return a concatenated coordinate string', () => {
    expect(typeof mockInquirerConcatenation()).toBe('string');
  })
})

describe('checkPlayer() should calculate current player based on round and return the correct marker', () => {
  const player1Round = 1;
  const player2Round = 2;
  test('should return an X if it is an odd round for player 1', () => {
    expect(checkPlayer(player1Round)).toEqual('X');
  })
  test('should return an O if it is an even round for player 2', () => {
    expect(checkPlayer(player2Round)).toEqual('O');
  })
})

describe('displayGameBoard() should return the result of generateGameBoard display by creating an array from the gameBoard object', () => {
  const gameBoard = {
    '11': 'X', '12': null, '13': null,
    '21': null, '22': 'O', '23': null,
    '31': null, '32': null, '33': null
  }
  test('should take the gameBoard object as the argument', () => {
    expect(typeof gameBoard).toBe('object')
  })
  test('should create an array from the gameBoard object and return a string matching the state of the board', async () => {
    expect(await displayGameBoard(gameBoard)).toMatch(` X  *  * \n *  O  * \n *  *  * `)
  })
})

describe('mocked functionality of updateGameBoard() should evaluate the player marker against the coordinate and update the gameBoard', () => {
  let gameBoard = {
    '11': 'X', '12': null, '13': null,
    '21': null, '22': 'O', '23': null,
    '31': null, '32': null, '33': null
  }
  test('should match playerCoordinates to a key in the gameBoard object', () => {
    const playerCoordinates = '11';
    expect(gameBoard[`${playerCoordinates}`]).toMatch('X');
  })
  test('should check if gameBoard tile has been taken and return falsy if null', () => {
    const playerCoordinates = '12';
    expect(gameBoard[`${playerCoordinates}`]).toBeFalsy();
    expect(gameBoard[`${playerCoordinates}`]).toBeNull();
  })
  test('should check if gameBoard tile has been taken and return true if X or O', () => {
    const playerCoordinates = '11';
    expect(gameBoard[`${playerCoordinates}`]).toBeTruthy();
    expect(typeof gameBoard[`${playerCoordinates}`]).toBe('string');
  })
})

describe('it should check all combinations for a win', () => {
  const playerMarker = 'X';
  test('should check and return true for a horizontal win', () => {
    const horizontalWin1 = {
      '11': 'X', '12': 'X', '13': 'X',
      '21': null, '22': null, '23': null,
      '31': null, '32': null, '33': null
    }
    const horizontalWin2 = {
      '11': null, '12': null, '13': null,
      '21': 'X', '22': 'X', '23': 'X',
      '31': null, '32': null, '33': null
    }
    const horizontalWin3 = {
      '11': null, '12': null, '13': null,
      '21': null, '22': null, '23': null,
      '31': 'X', '32': 'X', '33': 'X'
    }
    expect(checkWin(playerMarker, horizontalWin1)).toEqual(true);
    expect(checkWin(playerMarker, horizontalWin2)).toEqual(true);
    expect(checkWin(playerMarker, horizontalWin3)).toEqual(true);
  })
  test('should check and return true for a vertical win', () => {
    const verticalWin1 = {
      '11': 'X', '12': null, '13': null,
      '21': 'X', '22': null, '23': null,
      '31': 'X', '32': null, '33': null
    }
    const verticalWin2 = {
      '11': null, '12': 'X', '13': null,
      '21': null, '22': 'X', '23': null,
      '31': null, '32': 'X', '33': null
    }
    const verticalWin3 = {
      '11': null, '12': null, '13': 'X',
      '21': null, '22': null, '23': 'X',
      '31': null, '32': null, '33': 'X'
    }
    expect(checkWin(playerMarker, verticalWin1)).toEqual(true);
    expect(checkWin(playerMarker, verticalWin2)).toEqual(true);
    expect(checkWin(playerMarker, verticalWin3)).toEqual(true);
  })
  test('should check and return true for a diagonal win', () => {
    const diagonalWin1 = {
      '11': 'X', '12': null, '13': null,
      '21': null, '22': 'X', '23': null,
      '31': null, '32': null, '33': 'X'
    }
    const diagonalWin2 = {
      '11': null, '12': null, '13': 'X',
      '21': null, '22': 'X', '23': null,
      '31': 'X', '32': null, '33': null
    }
    expect(checkWin(playerMarker, diagonalWin1)).toEqual(true);
    expect(checkWin(playerMarker, diagonalWin2)).toEqual(true);
  })
  test('should check for a win and return false if a draw', () => {
    const draw1 = {
      '11': 'X', '12': 'O', '13': 'X',
      '21': 'O', '22': 'O', '23': 'X',
      '31': 'X', '32': 'X', '33': 'O'
    }
    const draw2 = {
      '11': 'O', '12': 'X', '13': 'O',
      '21': 'X', '22': 'X', '23': 'O',
      '31': 'O', '32': 'O', '33': 'X'
    }
    expect(checkWin(playerMarker, draw1)).toEqual(false);
    expect(checkWin(playerMarker, draw2)).toEqual(false);
  })
})

describe('resetBoard() should iterate through the gameBoard object and reset all values to null', () => {
  const fullBoard = {
    '11': 'O', '12': 'X', '13': 'O',
    '21': 'X', '22': 'X', '23': 'O',
    '31': 'O', '32': 'O', '33': 'X'
  }
  const emptyBoard = {
    '11': null, '12': null, '13': null,
    '21': null, '22': null, '23': null,
    '31': null, '32': null, '33': null
  }
  test('any value in the reset gameBoard object should equal null', () => {
    const result = resetBoard(fullBoard);
    expect(result['23']).toEqual(null);
  })
  test('should reset all values in gameBoard object back to null', () => {
    expect(resetBoard(fullBoard)).toEqual(emptyBoard);
  })
  test('should take the gameBoard object as an argument', () => {
    expect(typeof resetBoard(fullBoard)).toBe('object');
  })
})