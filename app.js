

let playerTurn = true;

let player1CurrentScore = document.getElementById("player1CurrentScore")
let player2CurrentScore = document.getElementById("player2CurrentScore")

let player1TotalScoreDom = document.getElementById("player1TotalScore")
let player2TotalScoreDom = document.getElementById("player2TotalScore")


let diceImage = document.querySelector("#diceImage")

let player1 = document.getElementById("player1")
let player2 = document.getElementById("player2")

let player1Dom = document.getElementById("player1Name")
let player2Dom = document.getElementById("player2Name")

let winnigScore = document.getElementById("winnigScore")

let player1TempScore = 0
let player2TempScore = 0

let player1TotalScore = 0
let player2TotalScore = 0


function rollDiceFun() {

    let diceNumber = Math.ceil(Math.random() * 6)
    diceImage.src = `/assets/${diceNumber}.webp`
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
        }
    }
}

function holdDiceFun() {
    if (playerTurn) {
        player1TotalScore += player1TempScore;
        player1TempScore = 0;
        player1TotalScoreDom.textContent = player1TotalScore

        if (player1TotalScore >= Number(winnigScore.value || 30)) {
            Swal.fire(`${player1.value ? `${player1Dom.textContent} Wins` : `player ${playerTurn + 0} Wins`}`);
            disableGameBtns()
            return
        }

    } else {
        player2TotalScore += player2TempScore;
        player2TempScore = 0;
        player2TotalScoreDom.textContent = player2TotalScore

        if (player2TotalScore >= Number(winnigScore.value || 30)) {
            Swal.fire(`${player2.value ? `${player2Dom.textContent} Wins` : `player ${playerTurn + 0} Wins`}`);
            disableGameBtns()
            return
        }
    }
    playerTurn = !playerTurn;
    currentPlayer();
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
    player1TempScore = 0
    player1TotalScore = 0

    player2TempScore = 0;
    player2TotalScore = 0

    player1CurrentScore.textContent = "0"
    player2CurrentScore.textContent = "0"

    player1TotalScoreDom.textContent = "0"
    player2TotalScoreDom.textContent = "0"

    diceImage.src = `./assets/${1}.webp`
}


function settingBtn() {
    document.querySelector(".infoandNames").style.right = "0px"
}

function closeSideBar() {
    document.querySelector(".infoandNames").style.right = "-800px"
}

function savePlayersName() {
    if (player1.value != "" && player2.value != "" && winnigScore.value != "") {
        player1Dom.innerText = player1.value
        player2Dom.innerText = player2.value
        document.querySelector(".infoandNames").style.right = "-800px"

    } else {
        alert("please fill all feilds")
    }

}

let gameWrapper = document.querySelector("#main-game-wrapper")
let leftContainer = document.querySelector(".left-container")
let righttContainer = document.querySelector(".right-container")


let currentThemeSrc = document.getElementById("themeChanger");
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("bodyDark");
    gameWrapper.classList.add("game-dark")
    leftContainer.classList.add("active-player-dark")
    currentThemeSrc.src = "./assets/sun-bright-svgrepo-com.png";
} else {
    document.body.classList.remove("bodyDark");
    currentThemeSrc.src = "./assets/half-moon-shape-svgrepo-com.png";
    gameWrapper.classList.remove("game-dark")
    leftContainer.classList.remove("active-player-dark")
}

function changeTheme() {

    let currentTheme = localStorage.getItem("theme");  // "light" or "dark"

    if (currentTheme === "dark") {
        currentThemeSrc.src = "./assets/half-moon-shape-svgrepo-com.png";
        document.body.classList.remove("bodyDark");
        gameWrapper.classList.remove("game-dark")
        leftContainer.classList.remove("active-player-dark")
        localStorage.setItem("theme", "light");
    } else {
        currentThemeSrc.src = "./assets/sun-bright-svgrepo-com.png";
        document.body.classList.add("bodyDark");
        gameWrapper.classList.add("game-dark")
        leftContainer.classList.add("active-player-dark")
        localStorage.setItem("theme", "dark");
    }
}


