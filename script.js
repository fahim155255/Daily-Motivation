function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${days} days ${hours}:${minutes}:${seconds}`;
}

const quotes = [
  `"The only way to do great work is to love what you do." – Steve Jobs`,
  `"Believe you can and you're halfway there." – Theodore Roosevelt`,
  `"Success is not final, failure is not fatal: It is the courage to continue that counts." – Winston Churchill`,
  `"Don't watch the clock; do what it does. Keep going." – Sam Levenson`,
  `"You are never too old to set another goal or to dream a new dream." – C.S. Lewis`,
  `"Hard work beats talent when talent doesn't work hard." – Tim Notke`,
  `"Dream big and dare to fail." – Norman Vaughan`,
  `"Your limitation—it's only your imagination." – Unknown`,
  `"Push yourself, because no one else is going to do it for you." – Unknown`,
  `"Great things never come from comfort zones." – Unknown`,
  `"Success doesn’t just find you. You have to go out and get it." – Unknown`,
  `"The harder you work for something, the greater you’ll feel when you achieve it." – Unknown`,
  `"Don’t stop when you’re tired. Stop when you’re done." – Unknown`,
  `"Wake up with determination. Go to bed with satisfaction." – Unknown`,
  `"Do something today that your future self will thank you for." – Unknown`
];

let quoteIndex = 0;
const quoteEl = document.getElementById("quote");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");

let startTime = localStorage.getItem("startTime") || null;
let intervalId = null;
let quoteIntervalId = null;

function updateQuote() {
  quoteEl.classList.remove("fade-in");
  void quoteEl.offsetWidth; // restart animation
  quoteEl.innerText = quotes[quoteIndex];
  quoteEl.classList.add("fade-in");

  quoteIndex = (quoteIndex + 1) % quotes.length;
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
  quoteEl.classList.remove("fade-in");
void quoteEl.offsetWidth; // forces reflow so animation restarts
quoteEl.classList.add("fade-in");
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
