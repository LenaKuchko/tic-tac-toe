/////////Business logic
function Player(name, symbol) {
  this.name      = name;
  this.symbol    = symbol;
}

function Game() {
  this.cells         = [];
  this.players       = [];
  this.currentPlayer = {};
  this.complete      = false;
  this.ai            = false;
  //NOTE: Could this initial value mess us up if the computer moves first?
  this.lastMove      = 0;
}


Game.prototype.checkForWin = function (symbol) {
  //Checks for horizontal win:
  for (var i = 0; i <= 6; i+= 3) {
    if (this.cells[i].symbol === symbol
      && this.cells[i + 1].symbol === symbol
      && this.cells[i + 2].symbol === symbol) {
        this.emphasizeWinners([i, i + 1, i + 2]);
    }
  }
  //Checks for vertical win:
  for (var i = 0; i < 3; i++) {
    console.log();
    if (this.cells[i].symbol === symbol
      && this.cells[i + 3].symbol === symbol
      && this.cells[i + 6].symbol === symbol) {
    this.emphasizeWinners([i, i + 3, i + 6]);
    }
  }
  //checks for diagonal win:
  if (this.cells[4].symbol === symbol && this.cells[4].symbol === this.cells[0].symbol && this.cells[4].symbol === this.cells[8].symbol) {
    this.emphasizeWinners([0,4,8]);
  }
  if ((this.cells[4].symbol === symbol && this.cells[4].symbol === this.cells[2].symbol && this.cells[4].symbol === this.cells[6].symbol)) {
    this.emphasizeWinners([2,4,6]);
  }
};

Game.prototype.generate = function() {
  var board = this;
  $("td").each(function(idx, ele) {
    var newCell = new Cell(ele.id);
    board.cells.push(newCell);
  });
};

Game.prototype.changeTurn = function() {
  if (this.currentPlayer === this.players[1]) {
    this.currentPlayer = this.players[0];
  } else if (this.currentPlayer === this.players[0]) {
    this.currentPlayer = this.players[1];
  } else {
    console.log("Whoops. This shouldn't ever run.");
  }
}

Game.prototype.findCell = function(id) {
  return this.cells.find(function(element) {
    return element.id === id;
  });
};

Game.prototype.emphasizeWinners = function(array) {
  for (var i = 0; i < array.length; i++) {
    $("#" + array[i]).addClass("winning");
  }
  this.complete = true;
}

Game.prototype.roboMove = function () {
  var index = Math.floor(Math.random() * (this.freeCells().freeCellArray.length - 1));
  console.log(this.freeCells().freeCellArray[index]);
  return this.freeCells().freeCellArray[index];
};
//NOTE: Alternate method of adding Cells to Board:
// for (var i = 1; i < 4; i++) {
//   for (var ii = 1; ii < 4; ii++) {
//     ourBoard.cells.push(new Cell(i.toString() + ii.toString()))
//   }
// }

Game.prototype.roboMoveSmarter = function () {
  var possibleMoves = [];
  var frees = this.freeCells().freeCellArray;
// Win: If the player has two in a row, they can place a third to get three in a row.

// Block: If the opponent has two in a row, the player must play the third themselves to block the opponent.

// Fork: Create an opportunity where the player has two threats to win (two non-blocked lines of 2).

// Blocking an opponent's fork:
// Option 1: The player should create two in a row to force the opponent into defending, as long as it doesn't result in them creating a fork. For example, if "X" has a corner, "O" has the center, and "X" has the opposite corner as well, "O" must not play a corner in order to win. (Playing a corner in this scenario creates a fork for "X" to win.)

// Option 2: If there is a configuration where the opponent can fork, the player should block that fork.

// Center: A player marks the center. (If it is the first move of the game, playing on a corner gives "O" more opportunities to make a mistake and may therefore be the better choice; however, it makes no difference between perfect players.)
  if (!this.cells[4].state) {
    possibleMoves = [4];
// Opposite corner: If the opponent is in the corner, the player plays the opposite corner.
  } else if (this.lastMove === "0" || this.lastMove === "8") {
    possibleMoves = this.intersection([0, 8]);
  } else if (this.lastMove === "2" || this.lastMove === "6") {
    possibleMoves = this.intersection([2, 6]);
// Empty corner: The player plays in a corner square. [0,2,4,8]
  } else if (frees.includes(0)
          || frees.includes(2)
          || frees.includes(4)
          || frees.includes(8)) {
    possibleMoves = this.intersection([0,2,6,8]);
    // Empty side: The player plays in a middle square on any of the 4 sides. [1,3,5,7]
  } else {
    possibleMoves = this.intersection([1,3,5,7]);
  }

  //Robot randomizes among possibleMoves and chooses a valid id to move into;
  console.log(possibleMoves);
  var moveIndex = Math.floor(Math.random() * (possibleMoves.length - 1));
  return possibleMoves[moveIndex];
}

//NOTE: http://stackoverflow.com/questions/1885557/simplest-code-for-array-intersection-in-javascript
Game.prototype.intersection = function(array) {
  var result = [];
  var b = this.freeCells().freeCellArray;
  while( array.length > 0 && b.length > 0 ) {
     if      (array[0] < b[0] ){ array.shift(); }
     else if (array[0] > b[0] ){ b.shift(); }
     else /* they're equal */
     {
       result.push(array.shift());
       b.shift();
     }
  }
  return result;
}

Game.prototype.freeCells = function () {
  var result = {"state": false, "freeCellArray": []};
  for (var i = 0; i < this.cells.length; i++) {
    if (!this.cells[i].state) {
      result.state = true;
      result.freeCellArray.push(i)
    }
  }
  return result;
};

function Cell(id) {
  this.id     = id;
  // this.x      = id[0];
  // this.y      = id[1];
  this.state  = false;
  this.symbol = "";
}

Cell.prototype.update = function (symbol) {
  this.state  = true;
  this.symbol = symbol;
};

///////// User interface
$(function () {
  var ourGame = new Game();
  ourGame.generate();

  $("form").submit(function(event) {
    event.preventDefault();

    //NOTE: I think the next seven lines should probably become part of a gameInit function.
    var playerOne = new Player($("input[name=player1]").val(), $("input[name=player1-symbol]").val());
    var playerTwo = new Player($("input[name=player2]").val(), $("input[name=player2-symbol]").val());
    ourGame.players.push(playerOne);
    ourGame.players.push(playerTwo);

    $("form").hide();
    //TODO: Randomize which player goes first
    alert(playerOne.name + ", you're going first!");
    ourGame.currentPlayer = playerOne;
  });

  $("button[name=vs-computer]").click(function() {
    var playerOne = new Player($("input[name=player1]").val(), $("input[name=player1-symbol]").val());
    var playerTwo = new Player("WALL-E", "[0_0]");
    ourGame.players.push(playerOne);
    ourGame.players.push(playerTwo);
    ourGame.ai = true;

    $("form").hide();
    //TODO: Randomize which player goes first
    alert(playerOne.name + ", you're going first!");
    ourGame.currentPlayer = playerOne;
  });

  $("button[name=vs-better-computer]").click(function() {
    var playerOne = new Player($("input[name=player1]").val(), $("input[name=player1-symbol]").val());
    var playerTwo = new Player("HAL 9000", "(O)");
    ourGame.players.push(playerOne);
    ourGame.players.push(playerTwo);
    ourGame.ai = true;

    $("form").hide();
    //TODO: Randomize which player goes first
    alert(playerOne.name + ", you're going first!");
    ourGame.currentPlayer = playerOne;
  });

  $("td").click(function() {
    if (!ourGame.complete && ourGame.players.length === 2) {
      var currentCell = ourGame.findCell($(this)[0].id);
      if (!currentCell.state) {
        currentCell.update(ourGame.currentPlayer.symbol);
        ourGame.lastMove = currentCell.id;
        $(this).text(ourGame.currentPlayer.symbol);
      }
      ourGame.checkForWin(ourGame.currentPlayer.symbol);
      ourGame.changeTurn();
      //TODO: DRY this, maybe?
      if (ourGame.ai && !ourGame.complete && ourGame.freeCells().state) {
        if (ourGame.players[1].name === "WALL-E") {
          var roboCell = ourGame.cells[ourGame.roboMove()];
        } else if (ourGame.players[1].name === "HAL 9000") {
          var roboCell = ourGame.cells[ourGame.roboMoveSmarter()];
        }
        roboCell.update(ourGame.currentPlayer.symbol);
        ourGame.lastMove = roboCell.id;
        $("#" + roboCell.id).text(ourGame.currentPlayer.symbol);
        ourGame.checkForWin(ourGame.currentPlayer.symbol);
        ourGame.changeTurn();
      }
    } else {
      console.log("Game Over or Too Few Players.");
    }
  });
});
