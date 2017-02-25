/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Aster = __webpack_require__(1);
	__webpack_require__(4);
	const GameView = __webpack_require__(5);
	const Game = __webpack_require__(6);
	const MovingObjects = __webpack_require__(2);
	__webpack_require__(7);
	__webpack_require__(3);
	__webpack_require__(8);

	window.MovingObjects = MovingObjects;
	window.Game = Game;
	window.Asteroid = Aster;
	window.GameView = GameView;


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	const MovingObject = __webpack_require__(2);
	const Util = __webpack_require__(3);


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


/***/ },
/* 2 */
/***/ function(module, exports) {

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


/***/ },
/* 3 */
/***/ function(module, exports) {

	const Util = {
	  inherits(childClass, parentClass) {
	    function Surrogate (){}
	    Surrogate.prototype = parentClass.prototype;
	    childClass.prototype = new Surrogate();
	    childClass.prototype.constructor = childClass;
	  },

	   randomVec (length) {
	    const deg = 2 * Math.PI * Math.random();
	    return Util.scale([Math.sin(deg), Math.cos(deg)], length);
	  },

	   scale (vec, m) {
	    return [vec[0] * m, vec[1] * m];
	  }
	};


	module.exports = Util;


/***/ },
/* 4 */
/***/ function(module, exports) {

	// module.exports = Bullet;


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	const Game = __webpack_require__(6);

	function GameView(ctx){
	  //TODO something about ship and bindings ???
	  this.ctx = ctx;
	  this.game = new Game();
	  this.game.addAsteroids();

	}

	GameView.prototype.start = function () {
	  setInterval(()=>{
	    this.game.moveObjects();
	    this.game.draw(this.ctx);
	  },20);

	};
	module.exports = GameView;


/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	const Asteroid = __webpack_require__(1);

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


/***/ },
/* 7 */
/***/ function(module, exports) {

	// module.exports = Ship;


/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	const GameView = __webpack_require__(5);

	document.addEventListener("DOMContentLoaded", function(event) {
	  let canvasElement = document.getElementById("game-canvas");
	  console.log(canvasElement)
	  let ctx = canvasElement.getContext("2d");
	  let view = new GameView(ctx);
	  // console.log(view);
	  view.start();
	});


/***/ }
/******/ ]);