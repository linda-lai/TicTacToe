const inquirer = require('inquirer');
const chalk = require('chalk');

// const { gameScore } = require('./game');
// const { displayBoard } = require('./board');
const {
  myobBrandColours,
  border,
  logo,
  // welcomeMessage,
  gameRules,
  // farewellMessage,
  // wordWrap
} = require('./helpers');

const header = () => {
  console.log(chalk.bgHex(myobBrandColours.primaryRouge)(`${border}\n${border}`));
  console.log(chalk.hex(myobBrandColours.primaryDusk)(`${logo}`));
  const secondaryBorder = chalk.hex(myobBrandColours.primaryCandy)(`------------------------------`);
  // console.log(`${secondaryBorder} ${chalk.hex(myobBrandColours.primaryCandy)(`TIC TAC TOE`)} ${secondaryBorder}` + '\n');
  console.log(`${secondaryBorder} TIC TAC TOE ${secondaryBorder}` + '\n');
  console.log(chalk.bgHex(myobBrandColours.primaryRouge)(`${border}\n${border}`));
}

const menuOption = {
  startGame: 1,
  exitGame: 2
}

const handleMainMenu = () => {
  const mainMenuQuestion = [
    {
      type: 'list',
      name: 'mainMenuSelection',
      message: 'READY TO GO?',
      choices: [
        `[${menuOption.startGame}]: START GAME`,
        `[${menuOption.exitGame}]: EXIT GAME`
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
    // console.log('\033c');
    // header();
    const { mainMenuSelection } = await handleMainMenu();
    if (mainMenuSelection === `${menuOption.startGame}`) {
      console.log(`Let's play the game!`)
      gameRules();
    } else if (mainMenuSelection === `${menuOption.exitGame}`) {
      exitProgram = true;
    }
  }
  // const { mainMenuSelection } = await handleMainMenu();
  // console.log(mainMenuSelection);
};

runTicTacToe();