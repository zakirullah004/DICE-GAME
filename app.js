

let playerTurn = true;

let player1CurrentScore = document.getElementById("player1CurrentScore")
let player2CurrentScore = document.getElementById("player2CurrentScore")

let player1TotalScoreDom = document.getElementById("player1TotalScore")
let player2TotalScoreDom = document.getElementById("player2TotalScore")


let diceImage = document.querySelector("#diceImage")

let player1TempScore = 0
let player2TempScore = 0

let player1TotalScore = 0
let player2TotalScore = 0


function rollDiceFun() {

    let diceNumber = Math.ceil(Math.random() * 6)
    // console.log(diceNumber);
    if (playerTurn) {
        if (diceNumber != 1) {
            player1CurrentScore.textContent = diceNumber;
            player1TempScore += diceNumber
            diceImage.src = `/assets/${diceNumber}.webp`
        } else {
            player1TempScore = 0;
            player1CurrentScore.textContent = 1;
            playerTurn = !playerTurn
             diceImage.src = `./assets/${1}.webp`
            currentPlayer()
        }
    } else {
        if (diceNumber != 1) {
            player2CurrentScore.textContent = diceNumber;
            player2TempScore += diceNumber
            diceImage.src = `./assets/${diceNumber}.webp`

        } else {
            player2TempScore = 0;
            player2CurrentScore.textContent = 1;
            playerTurn = !playerTurn
            diceImage.src = `./assets/${1}.webp`
            currentPlayer()
        }
    }
}

function holdDiceFun() {
    if (playerTurn) {
        player1TotalScore = player1TempScore;
        player1TotalScoreDom.textContent = player1TotalScore

        if (player1TotalScore >= 20) {
            alert("player 1 win")
            disableGameBtns()
        }

    } else {
        player2TotalScore = player2TempScore;
        player2TotalScoreDom.textContent = player2TotalScore

        if (player2TotalScore >= 20) {
            alert("player 2 win")
            disableGameBtns()
        }
    }
    playerTurn = !playerTurn;
    currentPlayer();
}


function currentPlayer() {
    if (playerTurn) {
        document.querySelector(".left-container").classList.add("active-player")
        document.querySelector(".right-container").classList.remove("active-player")
    } else {
        document.querySelector(".left-container").classList.remove("active-player")
        document.querySelector(".right-container").classList.add("active-player")
    }
}

function disableGameBtns() {
    document.querySelectorAll(".game-options button").forEach((btn) => {
        btn.disabled = true;
    })
}