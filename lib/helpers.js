const chalk = require('chalk');

// STYLE HELPERS
const myobBrandColours = {
  primaryRegal: "#5f1c92",
  primaryDusk: "#8241AA",
  primaryRouge: "#b82494",
  primaryCandy: "#ed0477",
  secondaryVista: "#4a88cd",
  secondaryZest: "#17b66d",
  secondaryPopcorn: "#feda33",
  secondaryCabana: "#69d1df",
  secondaryStorm: "#203a52",
  secondaryRaven: "#000000"
}

const border = `=========================================================================`;

const logo =
`
                                                      %%%             
                                                      %%%%            
                                                      %%%%            
      &&&&&&&@ &&&&&&&& &&&&       %%%%  %%%%%%%%    %%%%########     
    &&&&&&&&&&&&&&&&&&&& &&&&     %%%% %%%%%%#%%%%%  %%%%#########&   
    %&&&     &&&&     &&&& &&&&   &%%%  %%%      %%%% %%%%       ###  
    &&&&     &&&&     &&&&  &&&&  %%%% %%%%       %%% %%%%       ###% 
    &&&&     &&&&     &&&&   &&&&%%%%   %%%      %%%% %%%%&     %###  
    &&&&     &&&&     &&&&   &&&&%%%    %%%%%%%%%%%%  %%%%#########   
    &&&      &&&      &&&     &&&%%       %%%%%%%%    %%%%########    
                              &&&%                                          
                          @&&&&&                                           
                            &&&&                                            

`

const welcomeMessage = () => {
  console.log(`
                Tic Tac Toe, Tic Tac Toe!
                Gimme an X, gimme an O!
                Who'll be first to get three in a row?
                Ready to start? Off we go...
  `)
}

const gameRules = () => {
  console.log(`
  GAME PLAY:

  Player 1 is X, Player 2 is O.
  Three tiles in a row wins.
  
  Each player will input (x,y) coordinates to place tile onto board.
  Enter q at any time to quit.
  
  The x-axis coordinate is entered first and increments left to right:

  1  2  3
  *  *  *
  *  *  *
  
  The y-axis coordinate is entered next and increments top to bottom:

  1  *  *
  2  *  *
  3  *  *

  So the coordinates (1,2) would be placed on the board as follows:

  *  *  *
  X  *  *
  *  *  *

  `)
}

const farewellMessage = () => {
  console.log(`${border}\n${border}`)
  console.log(chalk.hex(myobBrandColours.primaryCandy)(`
    It were a grief so brief to part with thee.
    Farewell!
  `))
  console.log(`${border}\n${border}\n`);
}

// UTILITY HELPERS
const wordWrap = (text, limit) => {
  if (text.length > limit) {
    const lineBreakIndex = text.slice(0, limit).lastIndexOf(" ");
    if (lineBreakIndex > 0) {
      const line = text.slice(0, lineBreakIndex);
      const remainder = text.slice(lineBreakIndex + 1);
      return line + "\n" + wordWrap(remainder, limit);
    }
  }
  return text;
};

// TESTING OUTPUTS
// console.log(chalk.hex(myobBrandColours.primaryRegal)('primaryRegal'));
// console.log(chalk.hex(myobBrandColours.primaryDusk)('primaryDusk'));
// console.log(chalk.hex(myobBrandColours.primaryRouge)('primaryRouge'));
// console.log(chalk.hex(myobBrandColours.primaryCandy)('primaryCandy'));
// console.log(chalk.hex(myobBrandColours.secondaryVista)('secondaryVista'));
// console.log(chalk.hex(myobBrandColours.secondaryZest)('secondaryZest'));
// console.log(chalk.hex(myobBrandColours.secondaryPopcorn)('secondaryPopcorn'));
// console.log(chalk.hex(myobBrandColours.secondaryCabana)('secondaryCabana'));
// console.log(chalk.hex(myobBrandColours.secondaryStorm)('secondaryStorm'));
// console.log(chalk.hex(myobBrandColours.secondaryRaven)('secondaryRaven'));

// console.log(border);
// console.log(logo);
// console.log(border);

// welcomeMessage();
// gameRules();
// farewellMessage();

module.exports = {
  myobBrandColours,
  border,
  logo,
  welcomeMessage,
  gameRules,
  farewellMessage,
  wordWrap
}