# Tic Tac Toe
## Created by Olena Kuchko & Charles Emrich

### Description
An app which allows two users to play the quintessential board game. Alternately, a single player may play against a computer which selects spaces at random or a computer which plays the game using basic strategic decision-making.

### Installation
1. Download or clone the repository from [here](https://github.com/CharlesEmrich/tic-tac-toe.git)
2. Run index.html using the browser of your choice to play the game. To examine the source, open the project directory in the IDE or text editor you prefer.
3. If you want to play with two human players, fill in both names and click "Let's Play." Alternately, the program will use the information in Player One's fields and supply a computer opponent.
4. Play the game.
5. After the game, the "Play Again?" button will reset the app to its initial state.

### Known Bugs
It is possible to bamboozle the game.currentPlayer somehow and end up playing as the opposing side.

### Specifications

| Behavior | Input | Output |
|----------|-------|--------|
| User starts app | *page load* | Display board and forms |
| User enters login inform and begins play | *clicks "Let's Play"* | Hide forms |
| User clicks on a cell | Click event on a cell | Their symbol appears in the correct cell |
| As users take turns, the app alternates between their symbols correctly | X, O, X, O | Program reproduces same pattern of symbols |
| Second user clicks on a cell | Click event on a cell | Second user's symbol appears in the correct cell |
| If a win state is achieved, we notify the players that a win has occurred and who achieved it. | *third X or O in a row is placed* | "Congratulations! You've won!" |
| At the conclusion of the game, users have the option to reset the game. |  |  |
| If the game ends in a draw, note that and display option to reset | *drawn game* | "Looks like winning has become impossible! Try again?" |

#### License
This project is licensed under the MIT License.
Copyright (c) 2017 Charles Emrich & Olena Kuchko
