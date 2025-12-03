const players = [
  "Naruto", "Sasuke", "Sakura", "Kakashi", "Hinata", "Neji", "Rock Lee",
  "Gaara", "Temari", "Shikamaru", "Choji", "Ino", "Kiba", "Shino",
  "Sai", "Tenten", "Killer Bee", "Minato", "Itachi", "Madara", "Obito",
  "Pain", "Konan", "Kabuto", "Jiraiya", "Tsunade", "Orochimaru", "Kurenai",
  "Asuma", "Might Guy", "Kisame", "Hidan", "Deidara", "Sasori", "Tobirama",
  "Hashirama", "Boruto", "Sarada", "Mitsuki", "Hanabi", "Kawaki", "Jugo",
  "Suigetsu", "Karin"
];

let playerData = {};
players.forEach(p => playerData[p] = { wins: 0, matches: 0, points: 0 });

function getRandomOpponent(currentPlayer, excludeList) {
  let available = players.filter(p => p !== currentPlayer && !excludeList.includes(p));
  return available[Math.floor(Math.random() * available.length)];
}

function generateMatches() {
  const matchContainer = document.getElementById("matches");
  matchContainer.innerHTML = "";

  players.forEach(player => {
    let opponents = [];
    for (let i = 0; i < 3; i++) {
      const opponent = getRandomOpponent(player, opponents);
      opponents.push(opponent);

      const div = document.createElement("div");
      div.classList.add("match");
      div.innerHTML = `
        <p>🔥 <b>${player}</b> vs <b>${opponent}</b></p>
        <button class="win-btn" onclick="recordResult('${player}', true)">Win</button>
        <button class="lose-btn" onclick="recordResult('${player}', false)">Lose</button>
      `;
      matchContainer.appendChild(div);
    }
  });
}

function recordResult(player, isWin) {
  playerData[player].matches++;
  if (isWin) {
    playerData[player].wins++;
    playerData[player].points += 3;
  }
  updateLeaderboard();
}

function updateLeaderboard() {
  const tbody = document.querySelector("#leaderboard tbody");
  tbody.innerHTML = "";

  const sorted = Object.entries(playerData)
    .sort((a, b) => b[1].points - a[1].points || b[1].wins - a[1].wins);

  sorted.forEach(([name, data]) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${name}</td>
      <td>${data.wins}</td>
      <td>${data.matches}</td>
      <td>${data.points}</td>
    `;
    tbody.appendChild(row);
  });
}

document.getElementById("qualifyButton").addEventListener("click", () => {
  const qualified = Object.entries(playerData)
    .filter(([_, data]) => data.wins >= 2)
    .sort((a, b) => b[1].points - a[1].points)
    .slice(0, 16)
    .map(([name]) => name);

  const qDiv = document.getElementById("qualifiers");
  qDiv.innerHTML = `
    <h3>🔥 Top 16 Qualifiers 🔥</h3>
    <p>${qualified.join(", ")}</p>
  `;
});

generateMatches();
updateLeaderboard();
