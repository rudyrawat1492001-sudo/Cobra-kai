let players = [];
let matches = [];

const playerNameInput = document.getElementById("playerName");
const addPlayerBtn = document.getElementById("addPlayer");
const savePlayersBtn = document.getElementById("savePlayers");
const clearDataBtn = document.getElementById("clearData");
const playerListDiv = document.getElementById("playerList");
const startTournamentBtn = document.getElementById("startTournament");
const tournamentDiv = document.getElementById("tournament");
const matchesDiv = document.getElementById("matches");

// Load saved players and matches
window.onload = function () {
  const savedPlayers = JSON.parse(localStorage.getItem("players"));
  const savedMatches = JSON.parse(localStorage.getItem("matches"));

  if (savedPlayers && savedPlayers.length > 0) {
    players = savedPlayers;
    updatePlayerList();
  }
  if (savedMatches && savedMatches.length > 0) {
    matches = savedMatches;
    document.getElementById("player-setup").classList.add("hidden");
    tournamentDiv.classList.remove("hidden");
    renderMatches();
  }
};

// Add player
addPlayerBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim();
  if (name && !players.includes(name)) {
    players.push(name);
    updatePlayerList();
    playerNameInput.value = "";
  } else if (players.includes(name)) {
    alert("Player already added!");
  } else {
    alert("Please enter a valid name!");
  }
});

// Save player list
savePlayersBtn.addEventListener("click", () => {
  localStorage.setItem("players", JSON.stringify(players));
  alert("✅ Player list saved successfully!");
});

// Clear all data
clearDataBtn.addEventListener("click", () => {
  if (confirm("⚠️ Are you sure you want to clear all saved data?")) {
    localStorage.clear();
    players = [];
    matches = [];
    playerListDiv.innerHTML = "";
    matchesDiv.innerHTML = "";
    document.getElementById("player-setup").classList.remove("hidden");
    tournamentDiv.classList.add("hidden");
    alert("🗑️ All data cleared!");
  }
});

function updatePlayerList() {
  playerListDiv.innerHTML = `
    <h3>Players Added (${players.length}):</h3>
    <ul>${players.map(p => `<li>${p}</li>`).join("")}</ul>
  `;
}

// Start the tournament
startTournamentBtn.addEventListener("click", () => {
  if (players.length < 4) {
    alert("Add at least 4 players to start the tournament!");
    return;
  }
  document.getElementById("player-setup").classList.add("hidden");
  tournamentDiv.classList.remove("hidden");
  generateMatches();
});

// Generate 3 random matches per player
function generateMatches() {
  matches = [];
  players.forEach(player => {
    const opponents = players.filter(p => p !== player);
    const selectedOpponents = opponents.sort(() => 0.5 - Math.random()).slice(0, 3);
    selectedOpponents.forEach(opp => {
      matches.push({ p1: player, p2: opp, result: null });
    });
  });
  localStorage.setItem("matches", JSON.stringify(matches));
  renderMatches();
}

function renderMatches() {
  matchesDiv.innerHTML = "";
  matches.forEach((m, i) => {
    const div = document.createElement("div");
    div.className = "match";
    div.innerHTML = `
      <h3>🔥 ${m.p1} vs ${m.p2}</h3>
      <button class="win" onclick="setResult(${i}, '${m.p1}')">Win</button>
      <button class="lose" onclick="setResult(${i}, '${m.p2}')">Lose</button>
    `;
    matchesDiv.appendChild(div);
  });
}

function setResult(index, winner) {
  matches[index].result = winner;
  localStorage.setItem("matches", JSON.stringify(matches));
  renderMatches();
}
