function Cell(i, j , w) {
  this.i = i;
  this.j = j + 20;

  this.bee = false;
  this.revealed = false;
  this.x = this.i*w;
  this.y = this.j*w;
  console.log(this.y);
  this.w = w;
  this.neighborCount =0;

  this.show = function() {
    stroke(0);
    noFill();
    rect(this.x, this.y, this.w, this.w);
    if(this.revealed) {
      if(this.bee) {
        fill(127);
        ellipse(this.x +this.w /2, this.y +this.w /2, this.w /2 )

      }
      else {
        fill(200);
        rect(this.x , this.y  , this.w, this.w );
        if(this.neighborCount > 0) {
          textAlign(CENTER);
          fill(0);
          text(this.neighborCount, this.x + this.w/2, this.y + this.w - 6);
        }
      }
    }
  }

  this.contains = function(x, y) {
    let xWithin = ( x > this.x && x < this.x + this.w);
    let yWithin = ( y > this.y && y < this.y + this.w);
    return xWithin && yWithin;
  }

  this.reveal = function() {
    this.revealed = true;
    if (this.neighborCount == 0 ) {
      this.floodFill();
    }
  }

  this.countBees = function() {
     if(this.bee) {
       this.neighborCount = -1;
     }

     let total =0;
     for(let xOff = -1; xOff <= 1; xOff++) {
       for (let yOff = -1; yOff <= 1; yOff++) {
         var i = this.i + xOff;
         var j = this.j + yOff;

         if(i>-1 && i< rows && j > -1 && j < cols) {
           var neighbor = grid[i][j];
           if (neighbor.bee) {
             total ++;
           }
         }
       }
     }
     this.neighborCount = total;
  }

  this. floodFill = function() {
    for(let xOff = -1; xOff <= 1; xOff++) {
      for (let yOff = -1; yOff <= 1; yOff++) {
        var i = this.i + xOff;
        var j = this.j + yOff;
        if(i>-1 && i< rows && j > -1 && j < cols) {
          var neighbor = grid[i][j];
          if (!neighbor.bee && !neighbor.revealed) {
            neighbor.reveal();
            revealedCells += 1;

          }
        }
      }
    }
  }
}
