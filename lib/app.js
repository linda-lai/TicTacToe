const inquirer = require('inquirer');
const { header, farewellMessage } = require('./helpers');
const { startGame } = require('./game');

const menuOption = { startGame: 1, exitGame: 2 }

const handleMainMenu = () => {
  const mainMenuQuestion = [
    {
      type: 'list',
      name: 'mainMenuSelection',
      message: 'READY TO GO?',
      choices: [
        `[${menuOption.startGame}]: START GAME`,
        `[${menuOption.exitGame}]: EXIT GAME\n\n`
      ],
      filter: mainMenuSelection => {
        return mainMenuSelection.slice(1, 2);
      }
    }
  ];
  return inquirer.prompt(mainMenuQuestion);
}

const runTicTacToe = async () => {
  console.log('\033c');
  header();
  let exitProgram = false;
  while (exitProgram === false) {
    const { mainMenuSelection } = await handleMainMenu();
    if (mainMenuSelection === `${menuOption.startGame}`) {
      await startGame();
    } else if (mainMenuSelection === `${menuOption.exitGame}`) {
      farewellMessage();
      exitProgram = true;
    }
  }
};

runTicTacToe();

module.export = { runTicTacToe }