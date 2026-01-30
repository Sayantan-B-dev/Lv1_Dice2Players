let player1Roll = null;
let player2Roll = null;

let p1Wins = 0;
let p2Wins = 0;
let draws = 0;

let currentStreak = 0;
let streakHolder = null;

const img1 = document.querySelector(".img1");
const img2 = document.querySelector(".img2");
const result = document.getElementById("result");

const p1Btn = document.getElementById("p1Btn");
const p2Btn = document.getElementById("p2Btn");
const nextRoundBtn = document.getElementById("nextRoundBtn");
const resetGameBtn = document.getElementById("resetGameBtn");

p1Btn.addEventListener("click", () => rollPlayer(1));
p2Btn.addEventListener("click", () => rollPlayer(2));
nextRoundBtn.addEventListener("click", resetRound);
resetGameBtn.addEventListener("click", resetGame);

function rollPlayer(player) {
  if (player === 1 && player1Roll !== null) return;
  if (player === 2 && player2Roll !== null) return;

  const roll = Math.floor(Math.random() * 6) + 1;
  const img = player === 1 ? img1 : img2;
  const btn = player === 1 ? p1Btn : p2Btn;

  btn.disabled = true;

  img.classList.remove("spinning");
  void img.offsetWidth;
  img.classList.add("spinning");

  setTimeout(() => {
    img.src = `./images/dice${roll}.png`;

    if (player === 1) player1Roll = roll;
    if (player === 2) player2Roll = roll;

    btn.disabled = false;

    if (player1Roll !== null && player2Roll !== null) {
      decideWinner();
    }
  }, 450);
}

function decideWinner() {
  result.style.opacity = 0;

  setTimeout(() => {
    if (player1Roll === player2Roll) {
      result.textContent = "Match Draw 😑";
      draws++;
      currentStreak = 0;
      streakHolder = null;
    } else if (player1Roll > player2Roll) {
      result.textContent = "Player 1 wins 😏";
      p1Wins++;
      updateStreak(1);
    } else {
      result.textContent = "Player 2 wins 😎";
      p2Wins++;
      updateStreak(2);
    }

    updateScoreboard();
    result.style.opacity = 1;
  }, 150);
}

function updateStreak(winner) {
  if (streakHolder === winner) {
    currentStreak++;
  } else {
    streakHolder = winner;
    currentStreak = 1;
  }
}

function updateScoreboard() {
  document.getElementById("p1Wins").textContent = p1Wins;
  document.getElementById("p2Wins").textContent = p2Wins;
  document.getElementById("draws").textContent = draws;

  document.getElementById("streak").textContent =
    streakHolder === null
      ? "None"
      : `Player ${streakHolder} × ${currentStreak}`;
}

function resetRound() {
  player1Roll = null;
  player2Roll = null;

  img1.src = "./images/dice1.png";
  img2.src = "./images/dice1.png";

  result.textContent = "Next round – roll again";
}

function resetGame() {
  player1Roll = null;
  player2Roll = null;

  p1Wins = 0;
  p2Wins = 0;
  draws = 0;
  currentStreak = 0;
  streakHolder = null;

  updateScoreboard();

  img1.src = "./images/dice1.png";
  img2.src = "./images/dice1.png";

  result.textContent = "Game reset – roll to start";
}
