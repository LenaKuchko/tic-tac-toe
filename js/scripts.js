/////////Business logic
function Player(name, symbol) {
  this.name      = name;
  this.winStatus = false;
  this.symbol    = symbol;
}

function Game() {
  this.cells         = [];
  this.players       = [];
  this.currentPlayer = {};
}

Game.prototype.checkForWin = function () {
  this.cells;
};

Game.prototype.generate = function () {
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

Game.prototype.findCell = function (id) {
  for (var i = 0; i < this.cells.length; i++) {
    if (this.cells[i].id === id) {
      return this.cells[i];
    }
  }
};

//NOTE: Alternate method of adding Cells to Board:
// for (var i = 1; i < 4; i++) {
//   for (var ii = 1; ii < 4; ii++) {
//     ourBoard.cells.push(new Cell(i.toString() + ii.toString()))
//   }
// }

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

    var playerOne = new Player($("input[name=player1]").val(), $("input[name=player1-symbol]").val());
    var playerTwo = new Player($("input[name=player2]").val(), $("input[name=player2-symbol]").val());
    ourGame.players.push(playerOne);
    ourGame.players.push(playerTwo);

    $("form").hide();
    alert(playerOne.name + ", you're going first!");
    ourGame.currentPlayer = playerOne;
  });

  $("td").click(function() {
    var currentCell = ourGame.findCell($(this)[0].id);
    console.log(currentCell);
    // if (!currentCell.state) {
    //   //currentCell.update();
    // }
    $(this).text(ourGame.currentPlayer.symbol);

    ourGame.changeTurn();
  });
});
