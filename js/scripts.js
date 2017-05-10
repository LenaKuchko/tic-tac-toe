/////////Business logic
function Player(name) {
  this.name      = name;
  this.winStatus = false;
}

function Board() {
  this.cells = [];
}

Board.prototype.checkForWin = function () {
  this.cells;
};


function Cell(id) {
  this.id    = id;
  this.x     = id[0];
  this.y     = id[1];
  this.state = "";

}
///////// User interface
$(function () {
  Board.prototype.generate = function () {
    $("td").each(function(idx, ele) {
      var newCell = new Cell(ele.id);
      this.cells.push(newCell);
    });
  };
  var ourBoard = new Board();
  ourBoard.generate();

  //NOTE: Alternate method of adding Cells to Board:
  // for (var i = 1; i < 4; i++) {
  //   for (var ii = 1; ii < 4; ii++) {
  //     ourBoard.cells.push(new Cell(i.toString() + ii.toString()))
  //   }
  // }



  console.log(ourBoard);

  $("td").click(function() {
    console.log($(this)[0].id);
  });
});
