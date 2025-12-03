const startBtn = document.getElementById("startBtn");
const playerSection = document.getElementById("playerSection");
const playerInputs = document.getElementById("playerInputs");
const submitPlayers = document.getElementById("submitPlayers");
const matchesSection = document.getElementById("matchesSection");
const matchList = document.getElementById("matchList");

startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    playerSection.classList.remove("hidden");

    // Generate 8 player inputs
    for (let i = 1; i <= 8; i++) {
        let inp = document.createElement("input");
        inp.placeholder = "Player " + i;
        inp.className = "playerBox";
        playerInputs.appendChild(inp);
    }
});

submitPlayers.addEventListener("click", () => {
    let players = [];
    document.querySelectorAll(".playerBox").forEach(p => {
        if (p.value.trim() !== "") players.push(p.value.trim());
    });

    if (players.length !== 8) {
        alert("Please enter all 8 player names!");
        return;
    }

    playerSection.classList.add("hidden");
    matchesSection.classList.remove("hidden");

    generateMatches(players);
});

function generateMatches(players) {
    matchList.innerHTML = "";

    for (let i = 0; i < players.length; i += 2) {
        let match = document.createElement("div");
        match.innerHTML = `<p>🔥 Match ${i/2 + 1}: <b>${players[i]}</b> vs <b>${players[i+1]}</b></p>`;
        matchList.appendChild(match);
    }
}
