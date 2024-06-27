let timerInterval;
let startTime;
let elapsedTime = 0;
let running = false;
let lapCounter = 1;

const timerElement = document.querySelector('.timer');
const startButton = document.querySelector('#start-timer');
const pauseButton = document.querySelector('#pause-timer');
const stopButton = document.querySelector('#stop-timer');
const lapButton = document.querySelector('#lap-timer');
const lapListElement = document.querySelector('.lap-list');

function formatTime(time) {
  const hours = String(Math.floor(time / (60 * 60 * 1000))).padStart(2, '0');
  const minutes = String(Math.floor((time % (60 * 60 * 1000)) / (60 * 1000))).padStart(2, '0');
  const seconds = String(Math.floor((time % (60 * 1000)) / 1000)).padStart(2, '0');
  const milliseconds = String(time % 1000).padStart(3, '0');
  return ${hours}:${minutes}:${seconds}:${milliseconds};
}

function updateTimer() {
  const currentTime = Date.now();
  elapsedTime = currentTime - startTime;
  timerElement.textContent = formatTime(elapsedTime);
}

function startTimer() {
  if (!running) {
    running = true;
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(updateTimer, 10);
  }
}

function pauseTimer() {
  if (running) {
    running = false;
    clearInterval(timerInterval);
  }
}

function stopTimer() {
  running = false;
  clearInterval(timerInterval);
  elapsedTime = 0;
  lapCounter = 1; // Reset lap counter when the timer stops
  timerElement.textContent = '00:00:00:00';
  lapListElement.innerHTML = '<h2 style="font-family: monospace; margin-bottom: 20px; color: white;">Lap List</h2>'; // Clear lap list
}

function recordLap() {
  if (running) {
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement('div');
    lapElement.className = 'lap';
    lapElement.innerHTML = `
      <p class="lap-time">${lapCounter++}</p>
      <p class="lap-time">${lapTime}</p>
    `;
    lapListElement.appendChild(lapElement);
  }
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
stopButton.addEventListener('click', stopTimer);
lapButton.addEventListener('click', recordLap);