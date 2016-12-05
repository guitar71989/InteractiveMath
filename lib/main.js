const LessonView = require('./lesson_view.js');
const Lesson = require('./lesson.js');

document.addEventListener('DOMContentLoaded', function(){
  //Setup instructions
  const instructions = document.getElementById("instructions-text");

  //Setup graph
  let score = 0;
  const canvas = document.getElementById("graph-canvas");
  const ctx = canvas.getContext("2d");
  ctx.canvas.width  = 500;
  ctx.canvas.height = 500;
  ctx.canvas.style.width  = '500px';
  ctx.canvas.style.height = '500px';


  const lessonView = new LessonView(ctx, instructions, score);
  lessonView.start();

  window.pointsArray = lessonView.lesson.pointsArray;
});
