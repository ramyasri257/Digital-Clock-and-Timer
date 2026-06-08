 // ===== CLOCK =====
function updateClock() {
    let now = new Date();
    document.getElementById("clock").innerText =
        `${String(now.getHours()).padStart(2, '0')}:` +
        `${String(now.getMinutes()).padStart(2, '0')}:` +
        `${String(now.getSeconds()).padStart(2, '0')}`;
}
setInterval(updateClock, 1000);
updateClock();

// ===== UI SWITCH =====
function showTime() {
    document.getElementById("timeBox").classList.remove("hidden");
    document.getElementById("timerBox").classList.add("hidden");
    document.getElementById("Time").classList.add("active");
    document.getElementById("Timer").classList.remove("active");
}

function showTimer() {
    document.getElementById("timeBox").classList.add("hidden");
    document.getElementById("timerBox").classList.remove("hidden");
    document.getElementById("Timer").classList.add("active");
    document.getElementById("Time").classList.remove("active");
}

// ===== TIMER =====
let totalSeconds = 0;
let originalSeconds = 0;
let timer = null;
let running = false;

// DISPLAY
function updateTimerDisplay() {
    let h = Math.floor(totalSeconds / 3600);
    let largest = Math.floor((totalSeconds % 3600) / 60);
    let s = totalSeconds % 60;
    document.getElementById("timerDisplay").innerText =
        `${String(h).padStart(2, '0')}:` +
        `${String(largest).padStart(2, '0')}:` +
        `${String(s).padStart(2, '0')}`;
}

function formatTime(secs) {
    let h = Math.floor(secs / 3600);
    let largest = Math.floor((secs % 3600) / 60);
    let s = secs % 60;
    return `${String(h).padStart(2, '0')}:${String(largest).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

// START
function startTimer() {
    if (running) return;

    // Only read inputs if we're starting fresh (not resuming from pause)
    if (totalSeconds === 0) {
        let h = Number(document.getElementById("hours").value) || 0;
        let largest = Number(document.getElementById("minutes").value) || 0;
        let s = Number(document.getElementById("seconds").value) || 0;

        totalSeconds = h * 3600 + largest * 60 + s;
        originalSeconds = totalSeconds;

        if (totalSeconds === 0) return; // Don't start if no time entered
    }

    running = true;

    timer = setInterval(() => {
        if (totalSeconds > 0) {
            totalSeconds--;
            updateTimerDisplay();
        } else {
            clearInterval(timer);
            running = false;

            // Show popup with the original time that was set
            document.getElementById("finalTime").innerText = formatTime(originalSeconds);
            document.getElementById("popup").classList.remove("hidden");
        }
    }, 1000);
}

// PAUSE
function pauseTimer() {
    clearInterval(timer);
    running = false;
}

// RESET — clears everything back to empty inputs
function resetTimer() {
    clearInterval(timer);
    running = false;

    totalSeconds = 0;
    originalSeconds = 0;

    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";

    updateTimerDisplay();
}

// RESTART — runs the same original time again
function restartTimer() {
    document.getElementById("popup").classList.add("hidden");

    totalSeconds = originalSeconds;
    running = false; // so startTimer() doesn't early-return
    startTimer();
}

// DISMISS — go back to fresh blank state
function dismissTimer() {
    document.getElementById("popup").classList.add("hidden");

    clearInterval(timer);
    running = false;

    totalSeconds = 0;
    originalSeconds = 0;

    document.getElementById("hours").value = "";
    document.getElementById("minutes").value = "";
    document.getElementById("seconds").value = "";

    updateTimerDisplay();
}