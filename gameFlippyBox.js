var block = document.getElementById("block");
var blockTop = document.getElementById("blockTop");
var blockBottom = document.getElementById("blockBottom");
var hole = document.getElementById("hole");
var character = document.getElementById("character");
var backgroundBottom = document.getElementById("backgroundBottom");
var game = document.getElementById("game");
var jumping = 0;
var gameOver = 1;
var counter = 0;
var bestScore = 0;
const rotated = document.getElementById('character');
// Variable to hold the current angle of rotation
let rotation = 0;
// How much to rotate the image at a time
const angle = 30;

//start of game
document.getElementById('gameOver').innerHTML = "START GAME";
document.getElementById('restartText').innerHTML = "(Click the screen to play!)";
document.querySelector("#character").style.animation = 'spin 2s infinite linear';
$("#game").on('click', function() {
   start()});

function start() {
  character.style.left = "2%";
  restart();
//random hole generator, with scoring
hole.addEventListener('animationiteration', () => {
  var random = Math.random() * 3;
  var top = (random * 100) + 150;
  hole.style.top = -(top) + "px";
  blockTop.style.bottom = (top + 655) + "px";
  blockBottom.style.top = -(top + 505) + "px";
  counter++;
  document.getElementById('currentScore').innerHTML = `Current : ${counter}`;
  var randomColor = Math.floor(Math.random()*4);
  if(randomColor == 0) {
    $("#blockTop").css("border-color", "#9DF1DF");
    $("#blockBottom").css("border-color", "#9DF1DF");
  }else if(randomColor == 1) {
    $("#blockTop").css("border-color", "#FF78F0");
    $("#blockBottom").css("border-color", "#FF78F0");
  }else if(randomColor == 2) {
    $("#blockTop").css("border-color", "#FF1E1E");
    $("#blockBottom").css("border-color", "#FF1E1E");
  }else if(randomColor == 3) {
    $("#blockTop").css("border-color", "#FF6D28");
    $("#blockBottom").css("border-color", "#FF6D28");
  }

});
//game paramaters
setInterval(function() {
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  if ((jumping == 0) && (gameOver==0)) {
    character.style.top = (characterTop + 3) + "px";
  }
  var blockLeft = parseInt(window.getComputedStyle(blockTop).getPropertyValue("left"));
  var holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
  var characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
  var cTop = -(500 - characterTop);
  if ((characterTop > 480) || ((blockLeft<20) && (blockLeft > -50) && ((cTop < holeTop) || (cTop > holeTop + 130)))) {
    gameOver = 1;
    bestScore = Math.max(bestScore, counter);
    document.getElementById('bestScore').innerHTML = `Best : ${bestScore}`;
    document.querySelector("#blockTop").style.animationPlayState = 'paused';
    document.querySelector("#blockBottom").style.animationPlayState = 'paused';
    document.querySelector("#hole").style.animationPlayState = 'paused';
    document.getElementById('gameOver').innerHTML = "GAME OVER";
    document.getElementById('restartText').innerHTML = "(Click the screen to play again!)";
    document.getElementById('restartText').style.left = "18%";
    // document.getElementById("button").style.zIndex = "4";
    // character.style.top = 150 + "px";
    $("#game").on('click', function() {
      restart()});
    // button.addEventListener('click',()=>{ restart()});
  };
}, 10);
};
//jump action
function jump() {
    // Ensure angle range of 0 to 359 with "%" operator,
    // e.g., 450 -> 90, 360 -> 0, 540 -> 180, etc.
    rotation = (rotation + angle) % 360;
    rotated.style.transform = `rotate(${rotation}deg)`;
  // rotated.style.transform = 'rotate(20deg)';
  jumping = 1;
  let jumpCount = 0;
  var jumpInterval = setInterval(function() {
    var characterTop =
      parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if ((characterTop > 6) && (jumpCount < 15)) {
      character.style.top = (characterTop - 5) + "px";
    }
    if (jumpCount > 20) {
      clearInterval(jumpInterval);
      jumping = 0;
      jumpCount = 0;
    }
    jumpCount++;
  }, 10);
};

function restart() {
$("#game").off('click');
// document.getElementById("button").style.zIndex = "-4";
character.style.top = 150 + "px";

counter = 0;
document.getElementById('gameOver').innerHTML = "";
document.getElementById('restartText').innerHTML = "";
document.querySelector("#character").style.animation = 'none';
document.querySelector("#blockTop").style.animation = 'none';
document.querySelector("#blockTop").offsetWidth;
document.querySelector("#blockTop").style.animation = 'block 2s infinite linear';
document.querySelector("#blockBottom").style.animation = 'none';
document.querySelector("#blockBottom").offsetWidth;
document.querySelector("#blockBottom").style.animation = 'block 2s infinite linear';
document.querySelector("#hole").style.animation = 'none';
document.querySelector("#hole").offsetWidth;
document.querySelector("#hole").style.animation = 'block 2s infinite linear';
gameOver = 0;
$("#game").on('click', function() {
  jump()});
};
