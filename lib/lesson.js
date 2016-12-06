const Point = require('./point.js');

const Lesson = function(){
  this.pointsArray = [];
  this.level = 1;
  this.randomPos = null;
  this.score = 0;
};

Lesson.prototype.draw = function(ctx){
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  this.drawGrid(ctx);
  this.plotPoints(ctx);
  this.setScore();
};

Lesson.prototype.setScore = function(){
  if (this.score === 0){
    $('.score-result').html("");
  } else if (this.score === 1){
    $('.attempt-one').html("&#10004");
  } else if (this.score === 2) {
    $('.attempt-one').html("&#10004");
    $('.attempt-two').html("&#10004");
  } else {
    $('.attempt-one').html("&#10004");
    $('.attempt-two').html("&#10004");
    $('.attempt-three').html("&#10004");
  }
};

Lesson.prototype.setInstructions = function(instructions){
  const plusOrMinus1 = Math.random() < 0.5 ? -1 : 1;
  const plusOrMinus2 = Math.random() < 0.5 ? -1 : 1;

  this.randomPos = [Math.floor(Math.random()*12*plusOrMinus1), Math.floor(Math.random()*12*plusOrMinus2)];

  if(this.level === 1){
    instructions.innerHTML = `<p id="instructions">Graph the point (${this.randomPos[0]}, ${this.randomPos[1]}) on the coordinate plane.</p>`;

  }
};

Lesson.prototype.checkAnswer = function(mousePos){
  return (this.randomPos[0] === mousePos[0] && this.randomPos[1] === mousePos[1]);
};

Lesson.prototype.drawGrid = function(ctx){

  //Draw vertical gridlines
  let idx = 0;
  while (idx <= ctx.canvas.height){
    ctx.beginPath();
    ctx.moveTo(idx, 0);
    ctx.lineTo(idx, ctx.canvas.height);
    ctx.font = "12px Helvetica";
    ctx.strokeStyle = "black";
    ctx.lineWidth = (idx === 260) ? 1.5 : .5;
    ctx.stroke();

    ctx.fillStyle = "black";
    ctx.fillText(`${idx/20 - 13}`, idx - 5, ctx.canvas.height/2 + 25);
    ctx.stroke();

    idx += 20;
  }

  //Draw hortizontal gridlines
  idx = 0;
  while (idx <= ctx.canvas.width){
    ctx.beginPath();
    ctx.moveTo(0, idx);
    ctx.lineTo(ctx.canvas.width, idx);
    ctx.strokeStyle = "#000";
    ctx.lineWidth = (idx === 260) ? 1.5 : .5;
    if (idx/20 - 13 !== 0){
      ctx.fillText(`${13 - idx/20}`, ctx.canvas.width/2 - 5, idx + 5);
    }
    ctx.stroke();
    idx += 20;
  }

};


Lesson.prototype.populatePoints = function(ctx){
  let idx1 = 0;

  while (idx1 <= ctx.canvas.width){
    let idx2 = 0;
    while (idx2 <= ctx.canvas.height){

      const newPoint = new Point({
        canvasPos: [idx1,idx2],
        graphPos: [idx1/20 - 13, 13 - idx2/20],
        radius: 3,
      });

      this.pointsArray.push(newPoint);

      idx2 += 20;
    }
    idx1 += 20;
  }
};

Lesson.prototype.plotPoints = function(ctx){
  this.pointsArray.forEach( (point) => {
    point.draw(ctx);
  });
};

  Lesson.prototype.checkHover = function(mousePos){
    this.pointsArray.forEach( (point) => {
      if (point.isHovered(mousePos)){
        point.isHovering = true;
      }
      else {
        point.isHovering = false;
      }
    });
  };

//
//
// Game.prototype.addAsteroids = function(){
//   const newAsteroid = new Asteroid({pos: this.randomPosition(), game: this});
//   this.asteroids.push(newAsteroid);
// };
//
//
// Game.prototype.remove = function(asteroid){
//   const index = this.asteroids.indexOf(asteroid);
//   this.asteroids.splice(index, 1);
// };
//
//
// Lesson.prototype.step = function(){
//     this.moveObjects();
//     this.checkCollisions();
// };
//
// Game.prototype.moveObjects = function(){
//   this.asteroids.forEach( (asteroid) => {
//     asteroid.move();
//   });
// };
//
// Game.prototype.randomPosition = function(){
//   return [Math.random()*500, Math.random()*500];
// };
//
// Game.prototype.wrap = function(pos){
//   let wrappedPos = pos;
//   if (pos[0] >= 525){
//     wrappedPos[0] = pos[0] % 500;
//   } else if (pos[0] <= -25){
//     wrappedPos[0] = 500 - (pos[0] % 500);
//   } else if (pos[1] >= 525){
//     wrappedPos[1] = pos[1] % 500;
//   } else if (pos[1] <= -25){
//     wrappedPos[1] = 500 - (pos[1] % 500);
//   }
//   return wrappedPos;
// };
//
// Game.prototype.checkCollisions = function(){
//   if (this.asteroids.length <= 1){
//     return;
//   }
//
//   for (var i = 0; i < this.asteroids.length; i++) {
//     const targetAsteroid = this.asteroids[i];
//     const otherAsteroids = this.asteroids.slice(0,i).concat(this.asteroids.slice(i + 1, this.asteroids.length - 1));
//     otherAsteroids.forEach( (asteroid) => {
//       if (asteroid.isCollidedWith(targetAsteroid)){
//         this.remove(asteroid);
//         this.remove(targetAsteroid);
//       }
//     });
//   }
// };

module.exports = Lesson;
