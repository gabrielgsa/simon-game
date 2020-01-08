const colors = ["green", "red", "yellow", "blue"];
let gamePattern = [];
let userPattern = [];

let gameStarted = false;

let level = 0;

$(document).keypress(() => {
    if(!gameStarted) {
        gameStarted = true;

        setTimeout(() => {
            nextSequence();
        }, 500);
    }
});

$(".button").click((event) => {
    let userChosenColor = event.target.attributes.id.value;
    
    animateButton(userChosenColor);
    playSound(userChosenColor);

    userPattern.push(userChosenColor);

    checkAnswer(userPattern.length - 1);
})

function nextSequence() {
    userPattern = [];

    level++;
    $("#main-heading").text(`Level ${level}`);

    const randomNumber = Math.floor(Math.random() * (4 - 0) + 0);
    const randomColor = colors[randomNumber];

    gamePattern.push(randomColor); 

    $(`#${randomColor}`).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomColor);
}

function animateButton(color) {
    $(`#${color}`).addClass("pressed");

    setTimeout(() => {
        $(`#${color}`).removeClass("pressed");
    }, 100);
}

function playSound(color) {
    const sound = new Audio(`public/sounds/${color}.mp3`);
    sound.play();
}

function checkAnswer(currentLevel) {
    if(userPattern[currentLevel] === gamePattern[currentLevel]) {
        if(userPattern.length === gamePattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);
        }
    }else {
        playSound("wrong");

        $("#main-heading").text("Game Over! Press any key to start again");

        $("body").addClass("game-over");

        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);

        startOver();
    }
}

function startOver() {
    gameStarted = false;
    gamePattern = [];
    level = 0;
}