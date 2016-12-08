const Point = require('./point.js');

const BaseLesson = function(instructionsEl){
  this.instructions = instructionsEl;
  this.pointsArray = [];
  this.level = 1;
  this.randomPos = null;
  this.score = 0;
  this.answer = null;
};

BaseLesson.prototype.draw = function(ctx){
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  this.drawGrid(ctx);
  this.placePoints(ctx);
  this.plotPoints(ctx);
  this.setScore();
};


BaseLesson.prototype.placePoints = function(ctx){
};

BaseLesson.prototype.randomPoint = function(){
  const plusOrMinus1 = Math.random() < 0.5 ? -1 : 1;
  const plusOrMinus2 = Math.random() < 0.5 ? -1 : 1;
  return [Math.floor(Math.random()*12*plusOrMinus1), Math.floor(Math.random()*12*plusOrMinus2)];
};


BaseLesson.prototype.drawGrid = function(ctx){
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

BaseLesson.prototype.plotPoints = function(ctx){
  this.pointsArray.forEach( (point) => {
    point.draw(ctx);
  });
};

BaseLesson.prototype.setScore = function(){
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

BaseLesson.prototype.setInstructions = function(instructions){
  const plusOrMinus1 = Math.random() < 0.5 ? -1 : 1;
  const plusOrMinus2 = Math.random() < 0.5 ? -1 : 1;
  this.randomPos = [Math.floor(Math.random()*12*plusOrMinus1), Math.floor(Math.random()*12*plusOrMinus2)];
  if(this.level === 1){
    this.instructions.innerHTML = `<p id="instructions">Graph the point (${this.randomPos[0]}, ${this.randomPos[1]}) on the coordinate plane.</p>`;
  }
};

BaseLesson.prototype.checkAnswer = function(){
  return (this.randomPos[0] === this.answer.graphPos[0] && this.randomPos[1] === this.answer.graphPos[1]);
};

BaseLesson.prototype.populatePoints = function(ctx){
  let idx1 = 20;
  while (idx1 <= ctx.canvas.width - 20){
    let idx2 = 20;
    while (idx2 <= ctx.canvas.height - 20){
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

BaseLesson.prototype.checkHover = function(mousePos){
  this.pointsArray.forEach( (point) => {
    if (point.isHovered(mousePos)){
      point.isHovering = true;
    }
    else {
      point.isHovering = false;
    }
  });
};

BaseLesson.prototype.handleClick = function(mousePos){
  this.pointsArray.filter( (point) => {
    if(point.isClicked(mousePos)) {
      point.isSelected = true;
      this.answer = point;
    } else {
      point.isSelected = false;
    }
  });
};

module.exports = BaseLesson;
