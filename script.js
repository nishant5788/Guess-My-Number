'use strict';

let body, displayMsg, winningNumber, game, submitBtn, playAgain, score, guess, bodyColor, successColor, failureColor;
body = document.querySelector('body');
displayMsg = (msg) => {
    return document.querySelector('.message').textContent = msg;
}
submitBtn = document.querySelector('.check');
playAgain = document.querySelector('.again');
score = document.querySelector('.score');
guess = document.querySelector('.guess');
bodyColor = "#222222";
successColor = "#60b347";
failureColor = "#c10808";
game = {
    gameStatus: true,
    score: 20,
    highScore: 0
};

winningNumber = parseInt(Math.random() * 20 + 1);

console.log("Winning Guess is " + winningNumber);

submitBtn.addEventListener("click", function () {

    const guessVal = Number(guess.value);

    if (game.gameStatus && guessVal > 0) {
        guessVal < 1 ? displayMsg("No Number!") : displayMsg(guessStatus(guessVal));
    }


});


playAgain.addEventListener("click", function () {
    winningNumber = parseInt(Math.random() * 20 + 1);
    console.log("Winning Guess is " + winningNumber);
    body.style.backgroundColor = bodyColor;
    displayMsg("Start Guessing!")
    document.querySelector('.number').textContent = "?";
    score.textContent = 20;
    document.querySelector('.guess').value = "";
    game.gameStatus = true;
    game.score = 20;

});

document.addEventListener("keyup", function (e) {

    if (e.keyCode === 27 || e.which === 27) {
        playAgain.click();
    }

    if (e.keyCode === 13 || e.which === 13) {
        submitBtn.click();
    }

});



function guessStatus(val) {
    if (val !== winningNumber) {
        let currentScore = scoreCalc();

        if (currentScore === 0) {
            body.style.backgroundColor = failureColor;
            return displayMsg("You have Lost the Game!");
        }

        if (val > winningNumber) {
            return displayMsg("Too High!");
        } else {
            return displayMsg("Too Low!");
        }
    } 
    else {
        body.style.backgroundColor = successColor;
        document.querySelector('.number').textContent = val;
        game.gameStatus = false;

        if (game.score > game.highScore) {
            game.highScore = game.score;
        }

        document.querySelector('.highscore').textContent = game.highScore;

        return displayMsg("Correct Answer!");
    }


}

function scoreCalc() {
    if(Number(guess.value)) {
    game.score = game.score - 1;
    if (game.score < 1) {
        game.score = 0;
        game.gameStatus = false;
    }
    score.textContent = game.score;
}
    return game.score;
}