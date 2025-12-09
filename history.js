

let winnersList = document.getElementById("winnersList")

let gameHistory = JSON.parse(localStorage.getItem("gameHistory")) || []

if (gameHistory.length === 0) {
    winnersList.innerHTML = "<h2 style='text-align:center;'>No Games played yet</h2>";
}
function winnigRecords() {
    gameHistory.forEach((record) => {
        let p = document.createElement("p")
        p.textContent = record
        winnersList.appendChild(p)
    })
}
winnigRecords()


let linkBTn = document.getElementById("linkBTn")
let history = document.getElementById("history")

let currentThemeSrc = document.getElementById("themeChanger");
if (localStorage.getItem("theme") === "dark") {
    winnersList.classList.add("winnerListDark")
    document.body.classList.add("bodyDark");
    linkBTn.classList.add("linkBTnDark")
    history.classList.add("historyDark")
    currentThemeSrc.src = "./assets/sun-bright-svgrepo-com.png";
} else {
    document.body.classList.remove("bodyDark");
    winnersList.classList.remove("winnerListDark")
    linkBTn.classList.remove("linkBTnDark")
    history.classList.remove("historyDark")
}

function changeTheme() {

    let currentTheme = localStorage.getItem("theme");  // "light" or "dark"

    if (currentTheme === "dark") {
        currentThemeSrc.src = "./assets/half-moon-shape-svgrepo-com.png";
        linkBTn.classList.remove("linkBTnDark")
        history.classList.remove("historyDark")
        document.body.classList.remove("bodyDark");
        winnersList.classList.remove("winnerListDark")
        localStorage.setItem("theme", "light");
    } else {
        currentThemeSrc.src = "./assets/sun-bright-svgrepo-com.png";
        document.body.classList.add("bodyDark");
        winnersList.classList.add("winnerListDark")
        linkBTn.classList.add("linkBTnDark")
        history.classList.add("historyDark")
        localStorage.setItem("theme", "dark");
    }
}


