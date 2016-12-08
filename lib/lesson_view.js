const BaseLesson = require('./base_lesson.js');
const LessonOne = require('./lesson_one.js');

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
