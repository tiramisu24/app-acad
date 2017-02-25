

Function.prototype.inherits = function (superClass) {
  function Surrogate (){}
  Surrogate.prototype = superClass.prototype;
  this.prototype = new Surrogate();
  this.prototype.constructor = this;
};

function MovingObject () {}

MovingObject.prototype.func = () => {console.log("moving obj");};

function Ship () {
  this.sh = "red";
  this.ship = () => {console.log("ship");};
}
Ship.inherits(MovingObject);



Ship.prototype.othership = function () {console.log("othership");};


function Asteroid () {
  const ast = () => {console.log("ast");};

}
Asteroid.inherits(MovingObject);

const objShip = new Ship();
console.log(objShip.sh);
objShip.ship();
objShip.othership();
