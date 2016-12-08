const LessonView = require('./lesson_view.js');
const Lesson = require('./base_lesson.js');

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
