/////////Business logic
function Player(name, symbol) {
  this.name      = name;
  this.winStatus = false;
  this.symbol    = symbol;
}

function Game() {
  this.cells   = [];
  this.players = [];
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

//NOTE: Alternate method of adding Cells to Board:
// for (var i = 1; i < 4; i++) {
//   for (var ii = 1; ii < 4; ii++) {
//     ourBoard.cells.push(new Cell(i.toString() + ii.toString()))
//   }
// }

function Cell(id) {
  this.id    = id;
  this.x     = id[0];
  this.y     = id[1];
  this.state = "";

}
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
    console.log(ourGame);
  })

  $("td").click(function() {
    console.log($(this)[0].id);
  });
});
