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
const secondaryBorder = `-------------------------------------------------------------------------`

const headerLogo =
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

const footerTicTacToe =
`                          
                      @@@      @@@      @@@@@@@        
                        @@@  @@@      @@      @@  
                          @@@@       @@        @@ 
                         @@@@@@      @@        @@  
                        @@@   @@@     @@@    @@@  
                      @@@      @@@      @@@@@@@   
`

const welcomeMessage = () => {
  console.log(`
                    Tic Tac Toe, Tic Tac Toe!
                    Gimme an X, gimme an O!
                    Who'll be first to get three in a row?
                    Ready to start? Off we go...
  `)
}

const gameRules = {
  title: `
                              LET'S PLAY!
  `,
  rules: `
 Player 1 is X, Player 2 is O.
 Three tiles in a row wins.  
 Each player will select (x,y) coordinates to place tile onto board.
  `,
  instructions: `  
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
`
}

const header = () => {
  console.log(chalk.bgHex(myobBrandColours.primaryRouge)(`${border}\n${border}`));
  console.log(chalk.hex(myobBrandColours.primaryRegal)(`${headerLogo}`));
  const secondaryBorder = chalk.hex(myobBrandColours.primaryCandy)(`==============================`);
  console.log(`${secondaryBorder} TIC TAC TOE ${secondaryBorder}` + '\n');
  console.log(chalk.bgHex(myobBrandColours.primaryRouge)(`${border}\n${border}`));
  console.log(gameRules.title);
  console.log(chalk.hex(myobBrandColours.primaryDusk)(gameRules.rules));
  console.log(gameRules.instructions);
}

const winner =
`                                                           
                      ...........................                
                      ,,,,,,,,,..................                
                   .,,,,,,,,,,,,.......................            
                ,,,,,,,,,,,,,,,,..................,,,,,,,         
               ,,,     .,,,,,,,,................       ,,,        
              ,,,      ,,,,,,,,.................,      ,,,        
              ,,,      ,,,,,,,,.................,     ,,,        
              ,,,      ,,,,,,,,.................     ,,,         
                ,,,.   .,,,,,,,.................    ,,,          
                 ,,,,   ,,,,,,,,...............   ,,,,           
                   ,,,,, ,,,,,,,.............. ,,,,,             
                      ,,,,,,,,,,,...........,,,,,.               
                          ,,,,,,,,........,,,                    
                                ,,,....                          
                                ,,,,,                           
                                ,,,,,                           
                                ,,,..                         
                                ,,,,,                           
                                ,,,,,                           
                                ,,,,,                           
                             ,,,,,......                        
                             ,,,,,......                        
                           ...............                      
                        .....................                   
                        .....................                   
                        .....................                   
`

const farewellMessage = () => {
  console.log(chalk.hex(myobBrandColours.primaryCandy)(`${border}\n${border}`));
  console.log(`
                It were a grief so brief to part with thee.

    ${footerTicTacToe}

                Farewell!
  `)
  console.log(chalk.hex(myobBrandColours.primaryCandy)(`${border}\n${border}`));
}

module.exports = {
  myobBrandColours,
  border,
  secondaryBorder,
  headerLogo,
  footerTicTacToe,
  welcomeMessage,
  gameRules,
  header,
  winner,
  farewellMessage,
  wordWrap
}