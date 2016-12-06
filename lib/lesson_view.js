const Lesson = require('./lesson.js');

const LessonView = function(ctx, instructions){
    this.lesson = new Lesson;
    this.instructions = instructions;
    this.ctx = ctx;
  };

  LessonView.prototype.start = function(){

    const func = this;

    this.lesson.populatePoints(this.ctx);

    this.lesson.setInstructions(this.instructions);

    func.ctx.canvas.addEventListener('mousemove', function(e){
      const mouseX = Math.floor((e.clientX - func.ctx.canvas.getBoundingClientRect().left - 250) / 20);
      const mouseY = Math.floor(13 - (e.clientY - func.ctx.canvas.getBoundingClientRect().top - 10)/ 20);
      const mousePos = [mouseX, mouseY];
      func.lesson.checkHover(mousePos);
    }, false);


    func.ctx.canvas.addEventListener('click', function(e){
      const mouseX = Math.floor((e.clientX - func.ctx.canvas.getBoundingClientRect().left - 250) / 20);
      const mouseY = Math.floor(13 - (e.clientY - func.ctx.canvas.getBoundingClientRect().top - 10)/ 20);
      const mousePos = [mouseX, mouseY];
      
      if (func.lesson.score === 3) {

      } else if(func.lesson.checkAnswer(mousePos)){
        func.lesson.score += 1;
        alert("Correct!");

        func.lesson.setInstructions(func.instructions);
      } else {
        func.lesson.score = 0;
        alert("Try again!");
      }
    }.bind(this), false);


    setInterval(function(){
      func.lesson.draw(func.ctx);
    }, 20);

  };

  module.exports = LessonView;
