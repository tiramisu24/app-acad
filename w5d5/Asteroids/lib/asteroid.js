const MovingObject = require("./moving_object.js");
const Util = require("./utils.js");


function Asteroid(options, color = "orange", radius = 20) {
  options["color"] = color;
  options["radius"] = radius;
  options["vel"] = [Math.floor(Math.random() * 3 * sign()), Math.floor(Math.random() * 3 * sign())];
  // options["vel"] = [1,1];
  MovingObject.call(this,options);
}

const sign = function () {
  let s = [1, -1];
  return s[Math.floor(Math.random() * 2)];
};

Util.inherits (Asteroid, MovingObject);


module.exports = Asteroid;
