/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const LessonView = __webpack_require__(1);
	const Lesson = __webpack_require__(2);

	document.addEventListener('DOMContentLoaded', function(){


	  const $overlay = $('div#overlay');
	  const $modal = $('div.modal');


	  //Capture instruction area
	  const instructions = document.getElementById("instructions-text");

	  //Capture graph area
	  const canvas = document.getElementById("graph-canvas");
	  const ctx = canvas.getContext("2d");
	  ctx.canvas.width  = 500;
	  ctx.canvas.height = 500;
	  ctx.canvas.style.width  = '500px';
	  ctx.canvas.style.height = '500px';

	  document.getElementById('play').addEventListener('click', () => {
	    $overlay.hide();
	    $modal.hide();
	  });


	  //Setup lesson view
	  const lessonView = new LessonView(ctx, instructions);
	  window.lessonView = lessonView;
	  lessonView.start();

	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const BaseLesson = __webpack_require__(2);
	const LessonOne = __webpack_require__(4);

	const LessonView = function(ctx, instructions){
	    this.lesson = new BaseLesson(instructions);
	    this.instructions = instructions;
	    this.ctx = ctx;
	    this.mousePos = null;
	    this.level = 1;
	    this.myHover = this.myHover.bind(this);
	    this.myClick = this.myClick.bind(this);
	  };

	  LessonView.prototype.start = function(){
	    const func = this;
	    this.lesson.setInstructions(this.instructions);
	    this.lesson.populatePoints(this.ctx);
	    this.handleHover();
	    this.handleClick();


	    setInterval(function(){
	      func.lesson.draw(func.ctx);

	      if(func.lesson.score === 3){
	        func.level += 1;
	        func.lesson = new LessonOne(func.instructions);
	        func.lesson.populatePoints(func.ctx);
	        func.lesson.setInstructions(func.instructions);
	        func.handleHover();
	        func.handleClick();
	      }
	    }, 20);
	  };

	  LessonView.prototype.handleHover = function(){
	    if (this.level === 1){
	      this.ctx.canvas.addEventListener('mousemove', this.myHover, false);
	    } else {
	      this.ctx.canvas.removeEventListener('mousemove', this.myHover);
	    }

	  };

	  LessonView.prototype.myHover = function(e){
	    const mouseX = Math.floor((e.clientX - this.ctx.canvas.getBoundingClientRect().left - 250) / 20);
	    const mouseY = Math.floor(13 - (e.clientY - this.ctx.canvas.getBoundingClientRect().top - 10)/ 20);
	    this.mousePos = [mouseX, mouseY];
	    this.lesson.checkHover(this.mousePos);
	  };

	  LessonView.prototype.handleClick = function(mousePos){
	    if (this.level === 1){
	      this.ctx.canvas.addEventListener('click', this.myClick, false);
	    } else {
	      this.ctx.canvas.removeEventListener('click', this.myClick);
	    }
	  };

	  LessonView.prototype.myClick = function(e){
	      const mouseX = Math.floor((e.clientX - this.ctx.canvas.getBoundingClientRect().left - 250) / 20);
	      const mouseY = Math.floor(13 - (e.clientY - this.ctx.canvas.getBoundingClientRect().top - 10)/ 20);
	      this.mousePos = [mouseX, mouseY];
	      this.lesson.handleClick(this.mousePos);
	  };

	  module.exports = LessonView;


/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	const Point = __webpack_require__(3);

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Point = function(options) {
	    this.canvasPos = options.canvasPos;
	    this.graphPos = options.graphPos;
	    this.radius = options.radius;
	    this.isHovering = false;
	    this.isSelected = false;
	  };

	  Point.prototype.draw = function(ctx) {
	    if (this.isSelected){
	      ctx.fillStyle = "green";
	    } else if (this.isHovering){
	      ctx.fillStyle = "blue";
	    } else {
	      ctx.fillStyle = "#fff";
	    }

	    ctx.beginPath();

	    ctx.arc(
	      this.canvasPos[0],
	      this.canvasPos[1],
	      this.radius,
	      0,
	      2 * Math.PI,
	      false
	    );

	    ctx.fill();
	  };

	  Point.prototype.isHovered = function(mousePos){
	    return (mousePos[0] === this.graphPos[0]) && (mousePos[1] === this.graphPos[1]);
	  };

	  Point.prototype.isClicked = function(mousePos){
	    return (mousePos[0] === this.graphPos[0]) && (mousePos[1] === this.graphPos[1]);
	  };

	  Point.prototype.labelPoint = function(ctx, label){
	    ctx.strokeStyle = "blue";
	    ctx.lineWidth = 1;
	    ctx.strokeText(`${label}`, this.canvasPos[0] + 5, this.canvasPos[1] + 5);
	  };


	module.exports = Point;


/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	const Point = __webpack_require__(3);
	const Util = __webpack_require__(5);
	const BaseLesson = __webpack_require__(2);

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
	        <a href="#" onclick="return false" onmousedown="answer('num1', '11')">11</a>
	        <a href="#" onclick="return false" onmousedown="answer('num1', '12')">12</a>
	        <a href="#" onclick="return false" onmousedown="answer('num1', '13')">13</a>
	        <a href="#" onclick="return false" onmousedown="answer('num1', '14')">14</a>
	        <a href="#" onclick="return false" onmousedown="answer('num1', '15')">15</a>
	        <a href="#" onclick="return false" onmousedown="answer('num1', '16')">16</a>
	        <a href="#" onclick="return false" onmousedown="answer('num1', '17')">17</a>
	        <a href="#" onclick="return false" onmousedown="answer('num1', '18')">18</a>
	        <a href="#" onclick="return false" onmousedown="answer('num1', '19')">19</a>
	        <a href="#" onclick="return false" onmousedown="answer('num1', '20')">20</a>
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


/***/ },
/* 5 */
/***/ function(module, exports) {

	const Util = {

	  inherits (ChildClass, BaseClass) {
	    function Surrogate () { this.constructor = ChildClass; }
	    Surrogate.prototype = BaseClass.prototype;
	    ChildClass.prototype = new Surrogate();
	  },

	  randomVec (length) {
	    const deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },

	  scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  }
	};

	module.exports = Util;


/***/ }
/******/ ]);