let startTime, updatedTime, difference, tInterval;
let running = false;
const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

document.getElementById('start').addEventListener('click', function() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1);
        running = true;
    }
});

document.getElementById('stop').addEventListener('click', function() {
    clearInterval(tInterval);
    running = false;
});

document.getElementById('reset').addEventListener('click', function() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.innerHTML = "00:00:00.000"; // Reset display
    lapsContainer.innerHTML = ""; // Reset laps
});

document.getElementById('lap').addEventListener('click', function() {
    if (running) {
        const lapTime = formatTime(difference);
        const lapElement = document.createElement('div');
        lapElement.className = 'lap';
        lapElement.innerText = `Lap: ${lapTime}`;
        lapsContainer.appendChild(lapElement);
    }
});

document.getElementById('reset-laps').addEventListener('click', function() {
    lapsContainer.innerHTML = ""; // Reset laps
});

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    display.innerHTML = formatTime(difference);
}

function formatTime(difference) {
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000));

    return (hours < 10 ? "0" + hours : hours) + ":" +
           (minutes < 10 ? "0" + minutes : minutes) + ":" +
           (seconds < 10 ? "0" + seconds : seconds) + "." +
           (milliseconds < 100 ? "0" + (milliseconds < 10 ? "0" + milliseconds : milliseconds) : milliseconds);
}
