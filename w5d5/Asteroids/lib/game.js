const Asteroid = require("./asteroid.js");

function Game() {
  this.DIM_X = 800;
  this.DIM_Y = 800;
  this.NUM_ASTEROIDS = 6;
  this.asteroids = [];
}


Game.prototype.addAsteroids = function() {
  while (this.asteroids.length < this.NUM_ASTEROIDS) {
    let temp = {"pos" : this.randomPosition()};
    this.asteroids.push(new Asteroid(temp));
  }
};

Game.prototype.randomPosition = function () {
  return [Math.floor(Math.random() * this.DIM_X), Math.floor(Math.random() * this.DIM_Y)];
};

Game.prototype.draw = function (ctx) {
  ctx.clearRect(0, 0, this.DIM_X, this.DIM_Y);
  this.asteroids.forEach(el => el.draw(ctx));
};

Game.prototype.moveObjects = function () {
  let new_arr = [];
  for (let i = 0; i < this.asteroids.length; i++) {
    this.asteroids[i].move(this.DIM_X, this.DIM_Y);
    for (let j = 0; j < this.asteroids.length; j++) {
      if ( i !== j && this.asteroids[i].isCollidedWith(this.asteroids[j])){
        new_arr.push(i);
        new_arr.push(j);
      }
    }
  }
  new_arr.forEach( idx => this.asteroids.splice(idx,1));
};
module.exports = Game;
