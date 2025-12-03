let players = [];
let matches = [];

const playerNameInput = document.getElementById("playerName");
const addPlayerBtn = document.getElementById("addPlayer");
const playerListDiv = document.getElementById("playerList");
const startTournamentBtn = document.getElementById("startTournament");
const tournamentDiv = document.getElementById("tournament");
const matchesDiv = document.getElementById("matches");

// Add player to the list
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

// Update player list on screen
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

// Generate 3 random matches for each player
function generateMatches() {
  matches = [];
  players.forEach(player => {
    const opponents = players.filter(p => p !== player);
    const selectedOpponents = opponents.sort(() => 0.5 - Math.random()).slice(0, 3);
    selectedOpponents.forEach(opp => {
      matches.push({ p1: player, p2: opp, result: null });
    });
  });
  renderMatches();
}

// Display matches on the screen
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

// Set match result
function setResult(index, winner) {
  matches[index].result = winner;
  renderMatches();
}
