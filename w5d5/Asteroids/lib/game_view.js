const Game = require("./game.js");

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
