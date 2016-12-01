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

	const LessonView = __webpack_require__(9);
	const Lesson = __webpack_require__(7);

	document.addEventListener('DOMContentLoaded', function(){
	  //Setup instructions
	  const instructions = document.getElementById("instructions");

	  //Setup graph
	  const canvas = document.getElementById("graph-canvas");
	  const ctx = canvas.getContext("2d");
	  ctx.canvas.width  = 500;
	  ctx.canvas.height = 500;
	  ctx.canvas.style.width  = '500px';
	  ctx.canvas.style.height = '500px';
	  const lessonView = new LessonView(ctx, instructions);
	  lessonView.start();

	  window.pointsArray = lessonView.lesson.pointsArray;
	});


/***/ },
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */,
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	const Point = __webpack_require__(10);

	const Lesson = function(){
	  this.pointsArray = [];
	  this.level = 1;
	  this.randomPos = null;
	};

	Lesson.prototype.draw = function(ctx){
	  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
	  this.drawGrid(ctx);
	  this.plotPoints(ctx);
	};


	Lesson.prototype.setInstructions = function(instructions){
	  this.randomPos = [Math.floor(Math.random()*12), Math.floor(Math.random()*12)];

	  if(this.level === 1){
	    instructions.innerHTML = `<h1>Graph points on the coordinate plane</h1><p>Find (${this.randomPos[0]}, ${this.randomPos[1]})</p>`;
	  }
	};

	Lesson.prototype.checkAnswer = function(mousePos){
	  if(this.randomPos[0] === mousePos[0] && this.randomPos[1] === mousePos[1]){
	    alert("Correct!");
	  } else {
	    alert("Try again!");
	  }
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
	        console.log(point.graphPos);
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


/***/ },
/* 8 */,
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	const Lesson = __webpack_require__(7);

	const LessonView = function(ctx, instructions){
	    this.lesson = new Lesson;
	    this.instructions = instructions;
	    this.ctx = ctx;

	  };

	  LessonView.prototype.start = function(){

	    const func = this;

	    this.lesson.populatePoints(this.ctx);

	    this.lesson.setInstructions(this.instructions);

	    document.addEventListener('mousemove', function(e){
	      const mouseX = Math.floor((e.clientX - (window.innerWidth - 500)/2 - 250) / 20);
	      const mouseY = Math.floor(13 - (e.clientY - 85)/ 20);
	      const mousePos = [mouseX, mouseY];
	      func.lesson.checkHover(mousePos);
	    }, false);


	    document.addEventListener('click', function(e){
	      const mouseX = Math.floor((e.clientX - (window.innerWidth - 500)/2 - 250) / 20);
	      const mouseY = Math.floor(13 - (e.clientY - 85)/ 20);
	      const mousePos = [mouseX, mouseY];
	      func.lesson.checkAnswer(mousePos);
	    }, false);


	    setInterval(function(){
	      func.lesson.draw(func.ctx);
	    }, 20);

	  };

	  module.exports = LessonView;


/***/ },
/* 10 */
/***/ function(module, exports) {

	const Point = function(options) {
	    this.canvasPos = options.canvasPos;
	    this.graphPos = options.graphPos;
	    this.radius = options.radius;
	    this.isHovering = false;
	  };

	  Point.prototype.draw = function(ctx) {
	    ctx.fillStyle = (this.isHovering) ? "blue" : "#fff";
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

	module.exports = Point;


/***/ }
/******/ ]);