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

      if(func.lesson.checkAnswer(mousePos)){
        alert("Correct!");
        func.lesson.setInstructions(func.instructions);
      } else {
        alert("Try again!");
      }
    }, false);


    setInterval(function(){
      func.lesson.draw(func.ctx);
    }, 20);

  };

  module.exports = LessonView;
