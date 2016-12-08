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
