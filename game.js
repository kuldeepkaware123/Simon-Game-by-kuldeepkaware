const buttonColor = ["red", "blue", "green", "yellow"];
const gamePattern = [];
const userClickedPattern = [];
var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {
    var userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);
    var audio = new Audio(`sounds/${userChosenColour}.mp3`);
    audio.play();
    animatepress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1)
});

const nextSequence = () => {
    level++;
    $("#level-title").text("Level " + level);
    const randomNumber = Math.floor(Math.random() * 4);
    const randomChosenColor = buttonColor[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#" + randomChosenColor).fadeOut().fadeIn();
    playSound(randomChosenColor);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
function animatepress(currentcolor) {
    $("#" + currentcolor).addClass("pressed");
    setTimeout(removeclass, 100);
    function removeclass() {
        $("#" + currentcolor).removeClass("pressed");

    }

}
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] == gamePattern[currentLevel]) {
        console.log("ok");
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 1000);
        }

    } else {
        console.log("Not ok");
        var audio = new Audio("sounds\\wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over, Press Any Key to Restart");
        started = false;
        level = 0;
        gamePattern = [];
    }

}