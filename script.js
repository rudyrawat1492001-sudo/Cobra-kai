let players = [];
let matches = [];
let points = {}; // Track player points, wins, losses

const playerNameInput = document.getElementById("playerName");
const addPlayerBtn = document.getElementById("addPlayer");
const savePlayersBtn = document.getElementById("savePlayers");
const clearDataBtn = document.getElementById("clearData");
const playerListDiv = document.getElementById("playerList");
const startTournamentBtn = document.getElementById("startTournament");
const tournamentDiv = document.getElementById("tournament");
const matchesDiv = document.getElementById("matches");
const pointsTableDiv = document.getElementById("pointsTable");
const showPointsBtn = document.getElementById("showPoints");

window.onload = function () {
  const savedPlayers = JSON.parse(localStorage.getItem("players"));
  const savedMatches = JSON.parse(localStorage.getItem("matches"));
  const savedPoints = JSON.parse(localStorage.getItem("points"));

  if (savedPlayers) players = savedPlayers;
  if (savedMatches) matches = savedMatches;
  if (savedPoints) points = savedPoints;

  if (players.length > 0) updatePlayerList();
  if (matches.length > 0) {
    document.getElementById("player-setup").classList.add("hidden");
    tournamentDiv.classList.remove("hidden");
    renderMatches();
  }
};

// Add Player
addPlayerBtn.addEventListener("click", () => {
  const name = playerNameInput.value.trim();
  if (name && !players.includes(name)) {
    players.push(name);
    points[name] = { wins: 0, losses: 0, pts: 0 };
    updatePlayerList();
    playerNameInput.value = "";
  } else alert("Enter valid or new player name!");
});

// Save Players
savePlayersBtn.addEventListener("click", () => {
  localStorage.setItem("players", JSON.stringify(players));
  localStorage.setItem("points", JSON.stringify(points));
  alert("✅ Player list saved!");
});

// Clear Data
clearDataBtn.addEventListener("click", () => {
  if (confirm("⚠️ Clear all data?")) {
    localStorage.clear();
    players = [];
    matches = [];
    points = {};
    playerListDiv.innerHTML = "";
    matchesDiv.innerHTML = "";
    pointsTableDiv.innerHTML = "";
    document.getElementById("player-setup").classList.remove("hidden");
    tournamentDiv.classList.add("hidden");
  }
});

// Update Player List
function updatePlayerList() {
  playerListDiv.innerHTML = `
    <h3>Players Added (${players.length}):</h3>
    <ul>${players.map(p => `<li>${p}</li>`).join("")}</ul>
  `;
}

// Start Tournament
startTournamentBtn.addEventListener("click", () => {
  if (players.length < 4) return alert("Add at least 4 players!");
  document.getElementById("player-setup").classList.add("hidden");
  tournamentDiv.classList.remove("hidden");
  generateMatches();
});

// Generate matches (3 random opponents per player)
function generateMatches() {
  matches = [];
  players.forEach(p => {
    const opp = players.filter(o => o !== p);
    const selected = opp.sort(() => 0.5 - Math.random()).slice(0, 3);
    selected.forEach(o => matches.push({ p1: p, p2: o, result: null }));
  });
  localStorage.setItem("matches", JSON.stringify(matches));
  renderMatches();
}

// Render Matches
function renderMatches() {
  matchesDiv.innerHTML = "";
  matches.forEach((m, i) => {
    const div = document.createElement("div");
    div.className = "match";
    div.innerHTML = `
      <h3>🔥 ${m.p1} vs ${m.p2}</h3>
      <button class="win" onclick="setResult(${i}, '${m.p1}', '${m.p2}', true)">Win</button>
      <button class="lose" onclick="setResult(${i}, '${m.p2}', '${m.p1}', false)">Lose</button>
    `;
    matchesDiv.appendChild(div);
  });
}

// Set Match Result + Update Points
function setResult(index, winner, loser, winFlag) {
  matches[index].result = winner;
  points[winner].wins++;
  points[winner].pts += 3;
  points[loser].losses++;
  localStorage.setItem("matches", JSON.stringify(matches));
  localStorage.setItem("points", JSON.stringify(points));
  renderMatches();
}

// Show Points Table
showPointsBtn.addEventListener("click", () => {
  const tableRows = Object.entries(points)
    .map(([name, data]) => `
      <tr>
        <td>${name}</td>
        <td>${data.wins}</td>
        <td>${data.losses}</td>
        <td>${data.pts}</td>
      </tr>
    `).join("");
  pointsTableDiv.innerHTML = `
    <table>
      <tr><th>Player</th><th>Wins</th><th>Losses</th><th>Points</th></tr>
      ${tableRows}
    </table>
  `;
  pointsTableDiv.classList.remove("hidden");
});
