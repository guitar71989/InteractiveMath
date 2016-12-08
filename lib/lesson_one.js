const Point = require('./point.js');
const Util = require('./util.js');
const BaseLesson = require('./base_lesson.js');

const LessonOne = function (instructions) {
  this.instructions = instructions;
  this.pointsArray = [];
  this.randomPos = null;
  this.score = 0;
  this.handleClick = this.handleClick.bind(this);
  this.answer = {};
  this.pointA = null;
  this.pointB = null;
};

Util.inherits(LessonOne, BaseLesson);


LessonOne.prototype.placePoints = function(ctx, firstPoint){
  this.pointA.labelPoint(ctx, "A");
  this.pointB.labelPoint(ctx, "B");
};


LessonOne.prototype.placePoint = function(){
  const idx = Math.floor(Math.random() * 576);
  this.pointsArray[idx].isHovering = true;
  const pointArray = this.pointsArray.slice(idx, idx + 1);
  const point = pointArray[0];
  return point;
};

LessonOne.prototype.checkAnswer = function(ctx, firstPoint){
  const ver = this.pointB.graphPos[1] - this.pointA.graphPos[1];
  const hor = this.pointB.graphPos[0] - this.pointA.graphPos[0];
  if (ver < 0 && this.answer.vertical === "Up"){
    return false;
  } else if (ver > 0 && this.answer.vertical === "Down"){
    return false;
  } else if (hor > 0 && this.answer.hortizontal === "Left"){
    return false;
  } else if (hor < 0 && this.answer.hortizontal === "Right"){
    return false;
  }

  return parseInt(this.answer.num1) === Math.abs(ver) && parseInt(this.answer.num2) === Math.abs(hor);
};


LessonOne.prototype.setInstructions = function(instructions){
  if (this.pointA) {
    this.pointA.isHovering = false;
    this.pointB.isHovering = false;
  }

  this.pointA = this.placePoint();
  this.pointB = this.placePoint();

  this.instructions.innerHTML =
  `<div id="instructions">
  <p>To get from point A to point B, you need to move</p>

    <div class="dropdown">
      <a id="vertical" href="#" onclick="return false;" onmousedown="dropMenu('myDropdown1')">
        Select
      </a>
      <div id="myDropdown1" class="dropdown-content">
        <a href="#" onclick="return false" onmousedown="answer('vertical','Up')">Up</a>
        <a href="#" onclick="return false" onmousedown="answer('vertical', 'Down')">Down</a>
          <a href="#" onclick="return false" onmousedown="answer('vertical', 'N/A')">N/A</a>
      </div>
    </div>

    <div class="dropdown">
    <a id="num1" href="#" onclick="return false;" onmousedown="dropMenu('myDropdown2')">Select</a>
      <div id="myDropdown2" class="dropdown-content">
        <a href="#" onclick="return false" onmousedown="answer('num1','0')">0</a>
        <a href="#" onclick="return false" onmousedown="answer('num1', '1')">1</a>
        <a href="#" onclick="return false" onmousedown="answer('num1', '2')">2</a>
        <a href="#" onclick="return false" onmousedown="answer('num1', '3')">3</a>
        <a href="#" onclick="return false" onmousedown="answer('num1', '4')">4</a>
        <a href="#" onclick="return false" onmousedown="answer('num1', '5')">5</a>
        <a href="#" onclick="return false" onmousedown="answer('num1', '6')">6</a>
        <a href="#" onclick="return false" onmousedown="answer('num1', '7')">7</a>
        <a href="#" onclick="return false" onmousedown="answer('num1', '8')">8</a>
        <a href="#" onclick="return false" onmousedown="answer('num1', '9')">9</a>
        <a href="#" onclick="return false" onmousedown="answer('num1', '10')">10</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '11')">11</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '12')">12</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '13')">13</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '14')">14</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '15')">15</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '16')">16</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '17')">17</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '18')">18</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '19')">19</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '20')">20</a>
      </div>
    </div>

  <p>and</p>

    <div class="dropdown">
    <a id="horizontal" href="#" onclick="return false;" onmousedown="dropMenu('myDropdown3')">Select</a>
      <div id="myDropdown3" class="dropdown-content">
        <a href="#" onclick="return false" onmousedown="answer('horizontal','Left')">Left</a>
        <a href="#" onclick="return false" onmousedown="answer('horizontal', 'Right')">Right</a>
        <a href="#" onclick="return false" onmousedown="answer('horizontal', 'N/A')">N/A</a>
      </div>
    </div>

    <div class="dropdown">
    <a id="num2" href="#" onclick="return false;" onmousedown="dropMenu('myDropdown4')">Select</a>
      <div id="myDropdown4" class="dropdown-content">
        <a href="#" onclick="return false" onmousedown="answer('num2','0')">0</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '1')">1</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '2')">2</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '3')">3</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '4')">4</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '5')">5</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '6')">6</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '7')">7</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '8')">8</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '9')">9</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '10')">10</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '11')">11</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '12')">12</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '13')">13</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '14')">14</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '15')">15</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '16')">16</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '17')">17</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '18')">18</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '19')">19</a>
        <a href="#" onclick="return false" onmousedown="answer('num2', '20')">20</a>
      </div>
    </div>

  </div>`;



};


module.exports = LessonOne;
