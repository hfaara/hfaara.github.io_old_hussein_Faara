let grid;
let canvas;
let x,y;
let rows = 15;
let cols = 15;
let w = 20;
let totalBees = 20;

let button;
let time;
let startTime, currentTime;
let play = true;
let revealedCells;
let _gameOver = false;
let _text;

function make2DArray( rows, cols) {
  let arr = new Array(rows);
  for (let i=0; i< arr.length; i++) {
    arr[i] = new Array(cols);
  }
  return arr;
}


function setup() {
  canvas = createCanvas(401, 401);
  centerCanvas();

  rows = floor(width/ w);
  cols = floor(height/ w);
  newGame();

  button = createButton("Reset");
  button.mousePressed(newGame);
  button.addClass("btn btn-success");

   time = createElement("h2", " ");
   time.addClass("time");

   revealedCells = 0;

}

function centerCanvas() {
  x = (windowWidth - width) / 2;
  y = (windowHeight - height) / 2;
  canvas.position(x, y);

}

function positionDOM() {
  button.position(x + width/2 -150, y - 55);
  time.position(x + width - 150, y - 80);

}

function draw() {
  background(255);
  centerCanvas();
  positionDOM();

  updateTime();

  for (let i=0; i < rows; i++) {
    for (let j=0; j< cols; j++) {
      grid[i][j].show();
    }
  }

  if (revealedCells == (rows * cols) - totalBees) {
    levelUp();
  }

}

function mousePressed() {
    for (let i=0; i < rows; i++) {
    for (let j=0; j< cols; j++) {
      if ( grid[i][j].contains(mouseX, mouseY)) {
        grid[i][j].reveal();

        if(!_gameOver) {
          revealedCells += 1;
        }

        if (grid[i][j].bee) {
          gameOver();
          play = false;
        }
      }
    }
  }
}

function levelUp() {
  totalBees += 5;
  newGame();
}

function gameOver() {
  for (let i=0; i < rows; i++) {
    for (let j=0; j< cols; j++) {
      _gameOver = true;
      grid[i][j].revealed = true;
    }
  }
}

function updateTime() {
  if (play) {
    currentTime = 60 * 60 * hour() + 60 * minute() + second();
    let _time = currentTime - startTime;
    time.html("Time: " + _time);
  }


}

function newGame() {
  _gameOver = false;
  play = true;
  revealedCells = 0;
  startTime = 60 * 60 * hour() + 60 * minute() + second();

  grid = make2DArray(rows, cols);

  for (let i=0; i < rows; i++) {
    for (let j=0; j< cols; j++) {
      grid[i][j] = new Cell(i , j, w);
    }
  }

  var options = [];
  for (let i=0; i< rows; i++) {
    for (let j=0; j< cols; j++) {
      options.push([i, j]);
    }
  }

  for (let n = 0; n< totalBees; n++) {

    //print(n);

    let index = floor(random(options.length));
    let choice = options[index];
    let i = choice[0];
    let j = choice[1];
    //deletes chosen spot
    options.splice(index, 1)
    grid[i][j].bee = true;
  }

  for (let i=0; i < rows; i++) {
    for (let j=0; j< cols; j++) {
      grid[i][j].countBees();
    }
  }
}
