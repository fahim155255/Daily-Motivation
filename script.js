// Utility function to format time
function formatDuration(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600).toString().padStart(2, '0');
  const minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  const seconds = (totalSeconds % 60).toString().padStart(2, '0');
  return `${days} day${days !== 1 ? 's' : ''} ${hours}:${minutes}:${seconds}`;
}

// Motivational quotes
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
  `"Success doesn't just find you. You have to go out and get it." – Unknown`,
  `"The harder you work for something, the greater you'll feel when you achieve it." – Unknown`,
  `"Don't stop when you're tired. Stop when you're done." – Unknown`,
  `"Wake up with determination. Go to bed with satisfaction." – Unknown`,
  `"Do something today that your future self will thank you for." – Unknown`
];

// DOM Elements
const quoteEl = document.getElementById("quote");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const resetBtn = document.getElementById("resetBtn");
const progressBar = document.getElementById("progress-bar");
const levelLabel = document.getElementById("level-label");

// App State
let quoteIndex = 0;
let startTime = localStorage.getItem("startTime") || null;
let timerInterval = null;
let quoteInterval = null;

// Constants
const QUOTE_CHANGE_INTERVAL = 20000; // 20 seconds
const TIMER_UPDATE_INTERVAL = 1000;  // 1 second

// Show quote with fade animation
function showQuote() {
  // Reset animation
  quoteEl.classList.remove("fade-in");
  void quoteEl.offsetWidth; // Trigger reflow
  
  // Update content
  quoteEl.textContent = quotes[quoteIndex];
  
  // Start animation
  quoteEl.classList.add("fade-in");
  
  // Move to next quote
  quoteIndex = (quoteIndex + 1) % quotes.length;
}

// Update timer display
function updateTimer() {
  if (!startTime) return;
  
  const duration = Date.now() - parseInt(startTime);
  timerEl.textContent = formatDuration(duration);
}

// Calculate progress level
function getProgressLevel(duration) {
  const days = Math.floor(duration / (1000 * 60 * 60 * 24));
  
  if (days >= 15) return { label: "Iron Will", percent: 100 };
  if (days >= 7) return { label: "Dedicated", percent: 75 };
  if (days >= 3) return { label: "Rising", percent: 40 };
  return { label: "Beginner", percent: 10 };
}

// Update progress display
function updateProgress() {
  if (!startTime) return;
  
  const duration = Date.now() - parseInt(startTime);
  const { label, percent } = getProgressLevel(duration);
  
  levelLabel.textContent = `Level: ${label}`;
  progressBar.style.width = `${percent}%`;
}

// Start the timer
function startTimer() {
  if (!startTime) {
    startTime = Date.now();
    localStorage.setItem("startTime", startTime);
  }
  
  // Initial updates
  showQuote();
  updateProgress();
  updateTimer();
  
  // Set intervals
  timerInterval = setInterval(updateTimer, TIMER_UPDATE_INTERVAL);
  quoteInterval = setInterval(() => {
    showQuote();
    updateProgress();
  }, QUOTE_CHANGE_INTERVAL);
}

// Reset the timer
function resetTimer() {
  localStorage.removeItem("startTime");
  startTime = null;
  clearInterval(timerInterval);
  clearInterval(quoteInterval);
  
  // Reset displays
  timerEl.textContent = "0 days 00:00:00";
  progressBar.style.width = "0%";
  levelLabel.textContent = "Level: Beginner";
  
  // Show first quote again
  showQuote();
}

// Initialize app
if (startTime) {
  startTimer();
} else {
  showQuote(); // Show first quote immediately
}

// Event listeners
startBtn.addEventListener("click", startTimer);
resetBtn.addEventListener("click", resetTimer);