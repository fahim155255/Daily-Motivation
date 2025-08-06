
const quotes = [
  "The only way to do great work is to love what you do. – Steve Jobs",
  "Believe you can and you're halfway there. – Theodore Roosevelt",
  "Success is not final, failure is not fatal: It is the courage to continue that counts. – Winston Churchill",
  "Don't watch the clock; do what it does. Keep going. – Sam Levenson",
  "You are never too old to set another goal or to dream a new dream. – C.S. Lewis"
];

let startTime = localStorage.getItem("startTime") || null;
let intervalId = null;
let quoteIntervalId = null;
let currentQuote = 0;

const quoteEl = document.getElementById("quote");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

function updateQuote() {
  currentQuote = (currentQuote + 1) % quotes.length;
  quoteEl.innerText = quotes[currentQuote];
}

function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${days} days ${hours}:${minutes}:${seconds}`;
}

function updateTimer() {
  if (startTime) {
    const now = Date.now();
    const duration = now - parseInt(startTime);
    timerEl.innerText = formatDuration(duration);
  }
}

function startTimer() {
  if (!startTime) {
    startTime = Date.now();
    localStorage.setItem("startTime", startTime);
  }
  intervalId = setInterval(updateTimer, 1000);
  quoteIntervalId = setInterval(updateQuote, 20000);
  updateQuote();
}

function resetTimer() {
  localStorage.removeItem("startTime");
  startTime = null;
  clearInterval(intervalId);
  clearInterval(quoteIntervalId);
  timerEl.innerText = "0 days 00:00:00";
}

if (startTime) {
  startTimer();
}

startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);
