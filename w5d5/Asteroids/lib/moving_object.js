function MovingObjects (options = {}) {
  this.pos = options["pos"];
  this.vel = options["vel"];
  this.radius = options["radius"];
  this.color = options["color"];
}

MovingObjects.prototype.draw = function (ctx) {
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.pos[0], this.pos[1], this.radius, 0, Math.PI * 2, true);
  ctx.fill();
};

MovingObjects.prototype.move = function (x, y) {
  let tempX = (this.pos[0] + this.vel[0]) % x ;
  let tempY = (this.pos[1] + this.vel[1]) % y ;
  if (tempX < 0) { tempX += x; }
  if (tempY < 0) { tempY += y; }
  this.pos[0] = tempX;
  this.pos[1] = tempY;

};

MovingObjects.prototype.isCollidedWith = function (object) {
  let x = Math.abs(this.pos[0] - object.pos[0]);
  let y = Math.abs(this.pos[1] - object.pos[1]);
  let distance = Math.sqrt(x * x + y * y);
  if (distance <= this.radius + object.radius) {
    console.log("collisions");
    return true; }
  return false;
};



module.exports = MovingObjects;
