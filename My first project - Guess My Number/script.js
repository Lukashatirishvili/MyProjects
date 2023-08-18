"use strict"

let secretNum = Math.trunc(Math.random() * 10) + 1;
let attempt = 10;

// Elements
const checkBtn = document.getElementById("check");
const againBtn = document.getElementById("again");
const message = document.getElementById("message");
const attemptEl = document.getElementById("attemptVal");
const highscoreEl = document.getElementById("highscoreVal");
const inputNumEl = document.getElementById("inpNum");
const body = document.querySelector("body");

// Game logic
function gameLogic() {
    const inpNumber = Number(document.getElementById("inpNum").value);
    let highscore = attempt;
    // When player win
    if (inpNumber === secretNum) {
        message.textContent = "Correct Number";
        body.style.backgroundColor = 'green';
        if (highscore > +highscoreEl.textContent) {
            highscoreEl.textContent = highscore;
        }
    }

    // When input number is low or high
    else if (inpNumber > secretNum) {
        if (attempt > 0) {
            message.textContent = "Too High";
            attempt--;
            attemptEl.textContent = attempt;
        } else {
            message.textContent = "You lost game";
            body.style.backgroundColor = "#8B0000";
        }
    }
    else if (inpNumber < secretNum) {
        if (attempt > 0) {
            message.textContent = "Too Low";
            attempt--;
            attemptEl.textContent = attempt;
        } else {
            body.style.backgroundColor = "#8B0000";
            message.textContent = "You lost game";
        }
    }
    
}

function startAgain() {
    body.style.backgroundColor = "rgb(53, 53, 56)"
    secretNum = Math.trunc(Math.random() * 10) + 1;
    attempt = 10;
    attemptEl.textContent = 10;
    message.textContent = "Let's Start";
    inputNumEl.value = '';
}

checkBtn.addEventListener('click', gameLogic);
againBtn.addEventListener("click", startAgain);
