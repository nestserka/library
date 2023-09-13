const btnEasy = document.querySelector('.easy');
const btnMid = document.querySelector('.medium');
const btnHard = document.querySelector('.hard');
const lvlMng = document.querySelector('.level-mng');
const modalOverLay = document.querySelector('.modal-overlay');
let totalMoves = document.querySelector('.totalMoves');
let totalTime = document.querySelector('.totalTime');
const modal = document.querySelector('.modal');
let game = document.querySelector('.game');
const btnRestart = document.querySelector('.restart');
const btnRestartGame = document.querySelector('.restart-game');
const menu = document.querySelector('.menu');
let scoreMatch = 0;
let runeCount = 0;
let countClick = 0;


// timer 

let seconds = 0; 
let tens = 0; 
let appendTens = document.getElementById("tens")
let appendSeconds = document.getElementById("seconds")
let Interval ;

const runes = [

    {
        name: "teiwaz",
        img: "img/teiwaz.png",
        id: 1
    },

    {
        name: "rerth",
        img: "img/rerth.png",
        id: 2
    },

    {
        name: "othila",
        img: "img/othila.png",
        id: 3
    },

    {
        name: "raido",
        img: "img/raido.png",
        id: 4
    },

    {
        name: "mannaz",
        img: "img/mannaz.png",
        id: 5
    },

    {
        name: "hagalaz",
        img: "img/hagalaz.png",
        id: 6
    },

    {
        name: "berkana",
        img: "img/berkana.png",
        id: 7
    },

    {
        name: "fehu",
        img: "img/fehu.png",
        id: 8
    },

    {
        name: "algiz",
        img: "img/algiz.png",
        id: 9
    },

    {
        name: "inguz",
        img: "img/inguz.png",
        id: 10
    }
]


function setGameDifficulty(cardsCount, matchCount) {
    lvlMng.style.display = 'none';
    selectRandomCards(cardsCount);
    scoreMatch = matchCount;
    startClock();
}

btnEasy.addEventListener('click', function () {
    setGameDifficulty(6, 6);
});

btnMid.addEventListener('click', function () {
    setGameDifficulty(8, 8);
});

btnHard.addEventListener('click', function () {
    setGameDifficulty(10, 10);
});

function selectRandomCards(value) {
    if (value < 9) {
        const clonedArray = [...runes];
        const randomPicks = Array.from({ length: value }, () => {
            const randomIndex = Math.floor(Math.random() * clonedArray.length);
            return clonedArray.splice(randomIndex, 1)[0];
        });
        displayCards([...randomPicks, ...randomPicks]);
    } else {
        displayCards([...runes, ...runes]);
    }
}

// Fisher–Yates Shuffle https://bost.ocks.org/mike/shuffle/
const displayCards = (runeArr) => {
    var m = runeArr.length, t, i;
    while (m) {
        i = Math.floor(Math.random() * m--);
        t = runeArr[m];
        runeArr[m] = runeArr[i];
        runeArr[i] = t;
    }
    buildBoard(runeArr);
}

function buildBoard(runeArr) {
    runeArr.forEach(function (el) {
        let div = document.createElement('div');
        div.classList.add('card');
        let id = el.id;
        div.setAttribute('data-id', id);
        const div2 = document.createElement('div');
        div2.classList.add('card-back');
        const div1 = document.createElement('div');
        div1.classList.add('card-front');
        const img = document.createElement('img');
        img.classList.add('card-img');
        img.src = el.img;
        img.alt = `image`;
        div2.appendChild(img);
        div.appendChild(div1);
        div.appendChild(div2);
        game.appendChild(div);
    })
    startGame();
}

let isProcessing = false;
let hasFlippedCard = false;
let firstCard, secondCard;
function startGame() {
    menu.style.display = 'flex';
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', function (e) {
        if (isProcessing) return;
        countClick++;
        this.classList.add('flipped');
        console.log(hasFlippedCard);

        if (!hasFlippedCard) {
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        secondCard = this;
        hasFlippedCard = false;
        isProcessing = true; 
        checkForMatch();
    }));
}

function checkForMatch() {
    if (firstCard.dataset.id === secondCard.dataset.id) {
        runeCount++;
        setTimeout(() => {
            updateMatch([firstCard, secondCard]);
            firstCard = null;
            secondCard = null;
            isProcessing = false;
        }, 500)
    } else if (firstCard.dataset.id !== secondCard.dataset.id) {
        setTimeout(() => {
            rotateElements([firstCard, secondCard]);
            firstCard = null;
            secondCard = null;
            isProcessing = false;
        }, 500)
    }
    isWinner(runeCount);
}

const rotateElements = (elements) => {
    if (typeof elements !== 'object' || !elements.length) return;
    elements.forEach(element => {
        element.classList.remove('flipped');
    });
}

const updateMatch = (elements) => {
    if (typeof elements !== 'object' || !elements.length) return;
    elements.forEach(element => {
        element.style.background = '#949494';
        element.style.boxShadow = '10px -10px 20px #7e7e7e,-10px 10px 20px #aaaaaa';
    });
}

function isWinner(runeCount) {
    if (runeCount === scoreMatch) {
        game.style.display = 'none';
        menu.style.display = 'none';
        modal.style.display = 'flex';
        totalMoves.innerHTML = `Total Moves: ${countClick} `
        clearInterval(Interval);
        const secondsValue = appendSeconds.textContent; 
        const tensValue = appendTens.textContent; 
        totalTime.innerHTML = `Time: ${secondsValue} seconds and ${tensValue} ms `;
    }
}

btnRestart.addEventListener('click', function () {
    game.innerHTML = '';
    scoreMatch = 0;
    runeCount = 0;
    lcountClick = 0;
    hasFlippedCard = false;
    [firstCard, secondCard] = [null, null];
    lvlMng.style.display = 'block';
    modal.style.display = 'none';
    restartTime();
});


function startClock() {
    clearInterval(Interval);
    Interval = setInterval(updateTimer, 10);
}

function updateTimer() {
    tens++;
    if (tens > 99) {
        seconds++;
        tens = 0;
    }
    
    const formattedTens = tens < 10 ? "0" + tens : tens;
    const formattedSeconds = seconds < 10 ? "0" + seconds : seconds;
    
    appendTens.innerHTML = formattedTens;
    appendSeconds.innerHTML = formattedSeconds;
}

function restartTime(){
    clearInterval(Interval);
    tens = 0;
  	seconds = 0;
    appendTens.innerHTML = tens;
  	appendSeconds.innerHTML = seconds;
}

btnRestartGame.addEventListener('click', function () {
    game.innerHTML = '';
    restartTime();
    setGameDifficulty(scoreMatch, scoreMatch);
});