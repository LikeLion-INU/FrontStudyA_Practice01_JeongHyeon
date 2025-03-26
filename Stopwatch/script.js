const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const timeDisplay = document.querySelector('.time')
let isRunning = false; // 타이머 실행 여부
let startTime; // 타이머 시작 시간
let elapsedTime = 0; // 경과 시간
let interval; // setInterval 저장 변수

function formatTime(ms) { // 시간을 00:00:00.0 형태로 포맷하여 반환
    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((ms % (1000 * 60)) / 1000);
    const milliseconds =  Math.floor(ms % 1000 / 100);

    const formattedTime = // 두자리로 맞춤
        (hours < 10 ? "0" + hours : hours) + ":" +
        (minutes < 10 ? "0" + minutes : minutes) + ":" +
        (seconds < 10 ? "0" + seconds : seconds) + "." +
        milliseconds;

    return formattedTime;
}

function updateTimer() { // 시간 화면에 표시
    const now = Date.now();
    elapsedTime = now - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

function startTimer() { // 타이머 시작
    if (!isRunning) {
        startTime = Date.now() - elapsedTime; // !! 이전 경과 시간 유지 !!
        interval = setInterval(updateTimer, 10); // 10ms마다 updateTimer 실행
        isRunning = true;
    }
}

function stopTimer() { // 타이머 정지
    if (isRunning) {
        clearInterval(interval); // 타이머 정지
        isRunning = false;
    }
}

function resetTimer() { // 타이머 초기화
    if (isRunning) { // 타이머 정지
        clearInterval(interval);
        isRunning = false;
    }
    isRunning = false;
    elapsedTime = 0;
    timeDisplay.textContent = "00:00:00.0";
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);