var gamePattern = [];
var userClickedPattern = [];
var buttonColors = ["red", "blue", "green", "yellow"];

var startedToToggle = false;
var level = 0;

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("#level-title").text("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4); //random number 0-3
  var randomChosenColour = buttonColors[randomNumber]; // random color - red, blue, yellow, green
  gamePattern.push(randomChosenColour); // game pattern:['red', 'green','yellow'....]
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); // animation for color that was chosen
  playSound(randomChosenColour);
}
//animation section for the buttons
function animatePress(currentColour) {
  var activeButten = document.querySelector("." + currentColour);
  activeButten.classList.add("pressed");

  setTimeout(function() {
    activeButten.classList.remove("pressed");
  }, 100);
}
// sound section ,according to color
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

// detecting keypress

$(document).keypress(function() {
  if (!startedToToggle) {
    $("#level-title").text("Level " + level);
    nextSequence();
    startedToToggle = true;
  }
});

//detecting button press
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id"); // #red , #green , #yellow
  userClickedPattern.push(userChosenColour); // 0 , 2 , 3
  playSound(userChosenColour); // #red , #green ...
  animatePress(userChosenColour); // for 100 miliseconds
  checkAnswer(userClickedPattern.length - 1); // [0, 2, 3], check 2
});

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    playSound("wrong");
    $("body").addClass("game-over");
    $("#level-title").text("Game over, Press any key to Restart");

    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 200);


    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  startedToToggle = false;
}
