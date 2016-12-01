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
