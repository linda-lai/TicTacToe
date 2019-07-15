# Yay, Tic Tac Toe!  

We are going old school. 

You need to implement a console based version of Tic Tac Toe that allows two human players to play the game on a 3 x 3 board.

It's really simple...  The first player will be the X, the second player will be the O. You keep playing the game until there is a winner, a draw, or someone gives up.

### Submission guidelines

* Make a github repo with your submission
* Write your solution in one of the following programming languages: C#, Java, Python, Ruby or JavaScript (pick the language you are most comfortable with)        
* Do not do a front end / UI for the application, it should be console based
* Take your time and write the best code possible  
* Include a readme.md on how to execute your solution and any assumptions you made  
* If you are unsure of anything, feel free to ask additional clarifying questions - we're here to help!  

### Game Play

* Two players are required for a game.  
* Each player will assume either an “X” or “O”.  
* Players take turn to play till a player wins, or the end of the game (whichever happens first).  
* Player X always starts the game.  

### Condition for a win

* A player wins when all fields in a column are taken by the player.
* A player wins when all fields in a row are taken by the player.
* A player wins when all fields in a diagonal are taken by the player.

### Conditions for a draw

The game is drawn when all fields are taken on the board.  

### Example Game

An example run through of a game console would be...

~~~
Welcome to Tic Tac Toe!

Here's the current board:

. . .
. . .
. . .

Player 1 enter a coord x,y to place your X or enter 'q' to give up: 1,1

Move accepted, here's the current board:

X . .  
. . . 
. . .

Player 2 enter a coord x,y to place your O or enter 'q' to give up: 1,1

Oh no, a piece is already at this place! Try again...

Player 2 enter a coord x,y to place your O or enter 'q' to give up: 1,3

Move accepted, here's the current board:

X . O  
. . . 
. . .

Player 1 enter a coord x,y to place your X or enter 'q' to give up: 2,1

Move accepted, here's the current board:

X . O  
X . . 
. . .

Player 2 enter a coord x,y to place your O or enter 'q' to give up: 2,2

Move accepted, here's the current board:

X . O  
X O . 
. . .

Player 1 enter a coord x,y to place your X or enter 'q' to give up: 3,1

Move accepted, well done you've won the game!  

X . O  
X O . 
X . .
~~~

The system should display appropriate messages for incorrect coordinates and a draw.