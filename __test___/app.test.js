describe('mocked functionality of handleMainMenu() should format main menu selection from player', () => {
  const menuOption = { startGame: 1, exitGame: 2 }
  const mockMenuSelection = { mainMenuSelection: `[${menuOption.startGame}]: START GAME`}
  const mockMainMenuFilter = jest.fn().mockReturnValue(mockMenuSelection.mainMenuSelection.slice(1, 2));
  test('will create an answers object from the user selection', () => {
    const mockMainMenuPrompt = jest.fn().mockReturnValue(mockMenuSelection)
    expect(typeof mockMainMenuPrompt()).toBe('object')
  })
  test('will filter the menu selection to get the input', () => {
    expect(mockMainMenuFilter()).toEqual('1');
  })
  test('will return a string', () => {
    expect(typeof mockMainMenuFilter()).toBe('string');
  })
})