let stopwatchInterval;
let elapsedTime = 0; 

function startStopwatch() {
  if (!stopwatchInterval) {
    let startTime = Date.now() - elapsedTime;
    stopwatchInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 50);
  }
}

function pauseStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
}

function resetStopwatch() {
  clearInterval(stopwatchInterval);
  stopwatchInterval = null;
  elapsedTime = 0;
  updateDisplay();
}

function updateDisplay() {
  let ms = elapsedTime % 1000;
  let s = Math.floor((elapsedTime / 1000) % 60);
  let m = Math.floor((elapsedTime / (1000 * 60)) % 60);
  let h = Math.floor((elapsedTime / (1000 * 60 * 60)));

  document.getElementById("stopwatch").textContent =
    `${pad(h)}:${pad(m)}:${pad(s)}.${padMs(ms)}`;
}

function pad(number) {
  return number.toString().padStart(2, '0');
}

function padMs(number) {
  return number.toString().padStart(3, '0');
}

// ====== TIMER ======

let timerInterval;
let timerTime = 0;

function startTimer() {
  clearInterval(timerInterval);

  let minutes = parseInt(document.getElementById("timer-minutes").value) || 0;
  let seconds = parseInt(document.getElementById("timer-seconds").value) || 0;
  timerTime = (minutes * 60 + seconds) * 1000;

  if (timerTime <= 0) {
    alert("Please set a valid time.");
    return;
  }

  let startTime = Date.now();
  let endTime = startTime + timerTime;

  timerInterval = setInterval(() => {
    let remaining = endTime - Date.now();

    if (remaining <= 0) {
      clearInterval(timerInterval);
      document.getElementById("timer").textContent = "00:00";
      alert("⏰ Time's up!");
    } else {
      let s = Math.floor((remaining / 1000) % 60);
      let m = Math.floor((remaining / (1000 * 60)));
      document.getElementById("timer").textContent =
        `${pad(m)}:${pad(s)}`;
    }
  }, 200);
}

function resetTimer() {
  clearInterval(timerInterval);
  document.getElementById("timer").textContent = "00:00";
  document.getElementById("timer-minutes").value = "";
  document.getElementById("timer-seconds").value = "";
}
