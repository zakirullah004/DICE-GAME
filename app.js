

let playerTurn = true;

let player1CurrentScore = document.getElementById("player1CurrentScore")
let player2CurrentScore = document.getElementById("player2CurrentScore")

let player1TotalScoreDom = document.getElementById("player1TotalScore")
let player2TotalScoreDom = document.getElementById("player2TotalScore")


let diceImage = document.querySelector("#diceImage")
let mobileDiceImg = document.getElementById("mobileDiceImg")

let player1 = document.getElementById("player1")
let player2 = document.getElementById("player2")

let player1Dom = document.getElementById("player1Name")
let player2Dom = document.getElementById("player2Name")

let savedP1 = localStorage.getItem("player1Name");
let savedP2 = localStorage.getItem("player2Name");
let savedScore = localStorage.getItem("winningScore");

console.log(savedP1);
console.log(savedP2);

let winnigScore = document.getElementById("winnigScore")


let showWinScore = document.querySelector("#winScore");

function loadData() {

    let savedP1 = localStorage.getItem("player1Name");
    let savedP2 = localStorage.getItem("player2Name");
    let savedScore = localStorage.getItem("winningScore");
    if (savedP1 && savedP2 && savedScore) {
        player1Dom.textContent = savedP1;
        player2Dom.textContent = savedP2;
        player1.value = savedP1
        player2.value = savedP2
        winnigScore.value = savedScore;
        showWinScore.textContent = savedScore;
    }
}
loadData()

let player1TempScore = 0
let player2TempScore = 0

let player1TotalScore = 0
let player2TotalScore = 0

let gameoptionsmobilePlayer1 = document.querySelector(".game-options-mobilePlayer1")
let gameoptionsmobilePlayer2 = document.querySelector(".game-options-mobilePlayer2")

let playersWinnigList = JSON.parse(localStorage.getItem("gameHistory")) || [];

showWinScore.textContent = `${Number(winnigScore.value) || 30}`

function rollDiceFun() {

    let diceNumber = Math.ceil(Math.random() * 6)
    diceImage.src = `/assets/${diceNumber}.webp`;
    mobileDiceImg.src = `/assets/${diceNumber}.webp`
    // console.log(diceNumber);
    if (playerTurn) {
        if (diceNumber != 1) {
            player1CurrentScore.textContent = diceNumber;
            player1TempScore += diceNumber
        } else {
            player1TempScore = 0;
            player1CurrentScore.textContent = diceNumber;
            playerTurn = !playerTurn
            currentPlayer()
            mobilePlayerBtnActivation()
        }
    } else {
        if (diceNumber != 1) {
            player2CurrentScore.textContent = diceNumber;
            player2TempScore += diceNumber

        } else {
            player2TempScore = 0;
            player2CurrentScore.textContent = diceNumber;
            playerTurn = !playerTurn
            currentPlayer()
            mobilePlayerBtnActivation()
        }
    }
}

function holdDiceFun() {
    let savedP1 = localStorage.getItem("player1Name");
    let savedP2 = localStorage.getItem("player2Name");
    if (playerTurn) {
        player1TotalScore += player1TempScore;
        player1TempScore = 0;
        player1TotalScoreDom.textContent = player1TotalScore

        if (player1TotalScore >= Number(winnigScore.value || 30)) {
            Swal.fire(`${player1.value ? `${savedP1} Wins` : `player ${playerTurn + 0} Wins`}`);
            playersWinnigList.push(`${player1.value ? `${savedP1} Win from ${savedP2}` : `player ${1} Wins form ${0}`}`)
            localStorage.setItem("gameHistory", JSON.stringify(playersWinnigList))
            disableGameBtns()
            disabledMobileBtns()
            return
        }

    } else {
        player2TotalScore += player2TempScore;
        player2TempScore = 0;
        player2TotalScoreDom.textContent = player2TotalScore

        if (player2TotalScore >= Number(winnigScore.value || 30)) {
            Swal.fire(`${player2.value ? `${savedP2} Wins` : `player ${0} Wins`}`);
            playersWinnigList.push(`${player2.value ? `${savedP2} Win from ${savedP1}` : `player ${0} Wins form ${1}`}`)
            localStorage.setItem("gameHistory", JSON.stringify(playersWinnigList))
            disableGameBtns()
            disabledMobileBtns()
            return
        }
    }
    playerTurn = !playerTurn;
    currentPlayer();
    mobilePlayerBtnActivation();
}


function currentPlayer() {


    if (localStorage.getItem("theme") === "dark") {
        if (playerTurn) {
            document.querySelector(".left-container").classList.add("active-player-dark")
            document.querySelector(".right-container").classList.remove("active-player-dark")
        } else {
            document.querySelector(".left-container").classList.remove("active-player-dark")
            document.querySelector(".right-container").classList.add("active-player-dark")
        }

    }

    if (playerTurn) {
        document.querySelector(".left-container").classList.add("active-player")
        document.querySelector(".right-container").classList.remove("active-player")
    } else {
        document.querySelector(".left-container").classList.remove("active-player")
        document.querySelector(".right-container").classList.add("active-player")
    }

    mobilePlayerBtnActivation()
}

function disableGameBtns() {
    document.querySelectorAll(".gameBtns button").forEach((btn) => {
        btn.disabled = true;
    })
}


function newGameFunc() {
    document.querySelectorAll(".gameBtns button").forEach((btn) => {
        btn.disabled = false;
    })
    playerTurn = true;
    currentPlayer()
    enabledMobileBtns()
    player1TempScore = 0
    player1TotalScore = 0

    player2TempScore = 0;
    player2TotalScore = 0

    player1CurrentScore.textContent = "0"
    player2CurrentScore.textContent = "0"

    player1TotalScoreDom.textContent = "0"
    player2TotalScoreDom.textContent = "0"

    diceImage.src = `./assets/${1}.webp`
    mobileDiceImg.src = `/assets/${1}.webp`
}


function settingBtn() {
    document.querySelector(".infoandNames").style.right = "0px"
}

function closeSideBar() {
    document.querySelector(".infoandNames").style.right = "-800px"
}

function savePlayersName() {
    if (player1.value != "" && player2.value != "" && winnigScore.value != "") {
        document.querySelector(".infoandNames").style.right = "-800px"
        localStorage.setItem("player1Name", player1.value);
        localStorage.setItem("player2Name", player2.value);
        localStorage.setItem("winningScore", winnigScore.value);
        loadData()

    } else {
        alert("please fill all feilds")
    }
    // showWinScore.textContent = `${Number(winnigScore.value) || 30}


}

function enabledMobileBtns() {
    gameoptionsmobilePlayer1.querySelectorAll("button").forEach((btn) => {
        btn.disabled = false
    })
    gameoptionsmobilePlayer2.querySelectorAll("button").forEach((btn) => {
        btn.disabled = false
    })
}


function disabledMobileBtns() {
    gameoptionsmobilePlayer1.querySelectorAll("button").forEach((btn) => {
        btn.disabled = true
    })
    gameoptionsmobilePlayer2.querySelectorAll("button").forEach((btn) => {
        btn.disabled = true
    })
}

function mobilePlayerBtnActivation() {
    if (playerTurn) {
        document.querySelector('.game-options-mobilePlayer1').style.display = "flex"
        document.querySelector('.game-options-mobilePlayer2').style.display = "none"
    } else {
        document.querySelector('.game-options-mobilePlayer1').style.display = "none"
        document.querySelector('.game-options-mobilePlayer2').style.display = "flex"
    }
}
mobilePlayerBtnActivation()

let gameWrapper = document.querySelector("#main-game-wrapper")
let leftContainer = document.querySelector(".left-container")
let righttContainer = document.querySelector(".right-container")
let linkBTn = document.getElementById("linkBTn")
let history = document.getElementById("history")

let currentThemeSrc = document.getElementById("themeChanger");
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("bodyDark");
    gameWrapper.classList.add("game-dark")
    leftContainer.classList.add("active-player-dark")
    linkBTn.classList.add("linkBTnDark")
    history.classList.add("historyDark")
    currentThemeSrc.src = "./assets/sun-bright-svgrepo-com.png";
} else {
    document.body.classList.remove("bodyDark");
    currentThemeSrc.src = "./assets/half-moon-shape-svgrepo-com.png";
    gameWrapper.classList.remove("game-dark")
    linkBTn.classList.remove("linkBTnDark")
    history.classList.remove("historyDark")
    leftContainer.classList.remove("active-player-dark")
}

function changeTheme() {

    let currentTheme = localStorage.getItem("theme");  // "light" or "dark"

    if (currentTheme === "dark") {
        currentThemeSrc.src = "./assets/half-moon-shape-svgrepo-com.png";
        document.body.classList.remove("bodyDark");
        gameWrapper.classList.remove("game-dark")
        leftContainer.classList.remove("active-player-dark")
        linkBTn.classList.remove("linkBTnDark")
        history.classList.remove("historyDark")
        localStorage.setItem("theme", "light");
    } else {
        currentThemeSrc.src = "./assets/sun-bright-svgrepo-com.png";
        document.body.classList.add("bodyDark");
        gameWrapper.classList.add("game-dark")
        leftContainer.classList.add("active-player-dark")
        linkBTn.classList.add("linkBTnDark")
        history.classList.add("historyDark")
        localStorage.setItem("theme", "dark");
    }
}


