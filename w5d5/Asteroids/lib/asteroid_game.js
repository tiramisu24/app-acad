const GameView = require("./game_view.js");

document.addEventListener("DOMContentLoaded", function(event) {
  let canvasElement = document.getElementById("game-canvas");
  console.log(canvasElement)
  let ctx = canvasElement.getContext("2d");
  let view = new GameView(ctx);
  // console.log(view);
  view.start();
});
