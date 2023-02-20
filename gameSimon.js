//arrays
var buttonColors = ["red", "blue", "green", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

const player1 = {name: 'Kegan Allen', score: '10'};
const player2 = {name: 'Guest', score: '0'};

//game facts
var started = false;
var level = 0;
//game start
$("#level-title").on('click', function() {
  startGame();
});

function startGame() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }};

//user button input
$(".btn1").click(function() {
  var userChosenColor = $(this).attr("id");
  userClickedPattern.push(userChosenColor);
  //console.log(userClickedPattern);
  playSound(userChosenColor);
  animatePress(userChosenColor);
  checkAnswer(userClickedPattern.length-1);
});
//check answer and restart game
function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    console.log("success");
    if (userClickedPattern.length === gamePattern.length){
      setTimeout(function() {
        nextSequence();
      }, 1000)
    }
  }else {
    console.log("wrong");
    playSound("wrong");
    $("body").addClass("game-over");
    setTimeout(function() {
      $("body").removeClass("game-over");
    },200);

    $("#level-title").text("Game Over, Click Here to Restart");

    if (player2.score<level) {
      player2.score = level;
    if(player1.score>=player2.score) {
      $(".1name").text(player1.name);
      $(".1score").text(player1.score);
      $(".2name").text(player2.name);
      $(".2score").text(player2.score);
    }else{
      $(".2name").text(player1.name);
      $(".2score").text(player1.score);
      $(".1name").text(player2.name);
      $(".1score").text(player2.score);
    }}

    $("#level-title").on('click', function() {

      startOver();

      startGame();
    })

  }
}
//game picked sequence
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var newRandom = Math.floor(Math.random() * 4);
  var randomChosenColor = buttonColors[newRandom];
  gamePattern.push(randomChosenColor);
  //light up colors
  $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColor);
}
//add audio
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
//add animation
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}
//start over game
function startOver() {
  $("#level-title").off('click');
  level = 0;
  gamePattern = [];
  started = false;

}
