const btnStart = document.getElementById('btn-start');
const btnContinue = document.getElementById('btn-continue');
const letterBox = document.getElementById('letter-box');
const letter = document.getElementById('letter');
const progressBar = document.getElementById('progress-bar');
const completed = document.getElementById('completed');
const btnNext = document.getElementById('btn-next');
const statusBar = document.getElementById('status-bar');
const gameInfo = document.getElementById('game-info');
const timerSettings = document.getElementById('timer-settings');
const timerInput = document.getElementById('timer-input');
const minutes = document.getElementById('min');
const seconds = document.getElementById('sec');
const ok = document.getElementById('ok');
const alarm = document.getElementById('alarm');

let timer = 120000;
let letters =  ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'z'];

let previousLetters = window.localStorage.getItem('letters');

if (previousLetters) {
    previousLetters = Array.from(previousLetters).filter(letter => letter !== ',');
    if (previousLetters.length) btnContinue.style.display = 'inline-block';
}

function startGame(e) {
    if (e.target.id === 'btn-start') {
        window.localStorage.setItem('letters', letters);
        window.localStorage.setItem('timer', 120000);
        window.localStorage.setItem('minutes', 2);
        window.localStorage.setItem('seconds', 0);
        previousLetters = letters;
    }
    
    const lettersPlayed = previousLetters ? (23 - previousLetters.length) : 0;
    const lettersLeftToPlay = 23 - lettersPlayed;

    btnStart.style.display = 'none';
    btnContinue.style.display = 'none';
    letterBox.style.display = 'flex';
    progressBar.style.display = 'block';
    timerSettings.style.display = 'block';
    btnNext.style.display = 'inline-block';
    statusBar.style.display = 'flex';
    gameInfo.textContent = `Foram jogadas ${lettersPlayed} letras. Restam ${lettersLeftToPlay} letras.`;

    timer = window.localStorage.getItem('timer');
    minutes.value = window.localStorage.getItem('minutes');
    seconds.value = window.localStorage.getItem('seconds');
}

function getLetter() {
    const currentLetters = Array.from(window.localStorage.getItem('letters')).filter(letter => letter !== ',');
    const randomIndex = Math.round(Math.random() * (currentLetters.length - 1));
    const lettersPlayed = (23 - currentLetters.length) + 1;
    const lettersLeftToPlay = 23 - lettersPlayed;

    btnNext.style.display = 'none';
    letter.textContent = currentLetters[randomIndex];
    completed.classList.add('loading');
    completed.style.animationDuration = `${timer}ms`;
    gameInfo.textContent = `Foram jogadas ${lettersPlayed} letras. Restam ${lettersLeftToPlay} letras.`;
    
    setTimeout(() => {
        if (lettersPlayed !== 23) btnNext.style.display = 'inline-block';
        letter.textContent = '?';
        completed.style.width = '0px';
        completed.classList.remove('loading');
        alarm.play();
    }, timer)

    currentLetters.splice(randomIndex, 1);
    window.localStorage.setItem('letters', currentLetters);
}

btnStart.addEventListener('click', startGame);
btnContinue.addEventListener('click', startGame);
btnNext.addEventListener('click', getLetter);


function adjustTimer() {
    timer = ((minutes.value * 60) + (seconds.value * 1)) * 1000;
    window.localStorage.setItem('minutes', minutes.value);
    window.localStorage.setItem('seconds', seconds.value);
    window.localStorage.setItem('timer', timer);
    timerInput.style.display = 'none';
}

function showTimerSettings() {
    timerInput.style.display = 'grid';
    ok.addEventListener('click', adjustTimer)
}

timerSettings.addEventListener('click', showTimerSettings)