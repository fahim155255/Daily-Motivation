
function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${days} days ${hours}:${minutes}:${seconds}`;
}

const quoteEl = document.getElementById("quote");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let startTime = localStorage.getItem("startTime") || null;
let intervalId = null;
let quoteIntervalId = null;

function updateQuote() {
  fetch("https://api.quotable.io/random")
    .then(res => res.json())
    .then(data => {
      const fullQuote = `"${data.content}" – ${data.author}`;
      quoteEl.innerText = fullQuote;
    })
    .catch(err => {
      quoteEl.innerText = "Stay motivated. You're doing great!";
    });
}

function updateTimer() {
  if (startTime) {
    const now = Date.now();
    const duration = now - parseInt(startTime);
    timerEl.innerText = formatDuration(duration);
  }
}

function updateProgressLevel() {
  if (!startTime) return;

  const now = Date.now();
  const duration = now - parseInt(startTime);
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));

  let label = "Beginner";
  let percent = 10;

  if (days >= 3 && days < 7) {
    label = "Rising";
    percent = 40;
  } else if (days >= 7 && days < 15) {
    label = "Dedicated";
    percent = 75;
  } else if (days >= 15) {
    label = "Iron Will";
    percent = 100;
  }

  document.getElementById("level-label").innerText = `Level: ${label}`;
  document.getElementById("progress-bar").style.width = percent + "%";
}

function startTimer() {
  if (!startTime) {
    startTime = Date.now();
    localStorage.setItem("startTime", startTime);
  }
  updateQuote();
  updateProgressLevel();
  intervalId = setInterval(updateTimer, 1000);
  quoteIntervalId = setInterval(updateQuote, 20000);
}

function resetTimer() {
  localStorage.removeItem("startTime");
  startTime = null;
  clearInterval(intervalId);
  clearInterval(quoteIntervalId);
  timerEl.innerText = "0 days 00:00:00";
  document.getElementById("progress-bar").style.width = "0%";
  document.getElementById("level-label").innerText = "Level: Beginner";
}

if (startTime) {
  startTimer();
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
