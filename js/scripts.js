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
    $("#" + this.cells[array[i]].id).addClass("winning");
  }
  this.complete = true;
}

Game.prototype.roboMove = function () {
  var moved = false;
  while (!moved) {
    var index = Math.floor(Math.random() * 9);
    if (!this.cells[index].state) {
      moved = true;
      return this.cells[index];
    }
  }
};
//NOTE: Alternate method of adding Cells to Board:
// for (var i = 1; i < 4; i++) {
//   for (var ii = 1; ii < 4; ii++) {
//     ourBoard.cells.push(new Cell(i.toString() + ii.toString()))
//   }
// }

Game.prototype.freeCells = function () {
  for (var i = 0; i < this.cells.length; i++) {
    if (!this.cells[i].state) {
      return true;
    }
  }
  return false;
};

function Cell(id) {
  this.id     = id;
  this.x      = id[0];
  this.y      = id[1];
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

  $("td").click(function() {
    if (!ourGame.complete && ourGame.players.length === 2) {
      var currentCell = ourGame.findCell($(this)[0].id);
      if (!currentCell.state) {
        currentCell.update(ourGame.currentPlayer.symbol);
        $(this).text(ourGame.currentPlayer.symbol);
      }
      ourGame.checkForWin(ourGame.currentPlayer.symbol);
      ourGame.changeTurn();
      if (ourGame.ai && !ourGame.complete && ourGame.freeCells()) {
        var roboCell = ourGame.roboMove();
        roboCell.update(ourGame.currentPlayer.symbol);
        $("#" + roboCell.id).text(ourGame.currentPlayer.symbol);
        ourGame.checkForWin(ourGame.currentPlayer.symbol);
        ourGame.changeTurn();
      }
    } else {
      console.log("Game Over or Too Few Players.");
    }
  });
});
