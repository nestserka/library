let time = document.getElementById('timer');
const board = document.getElementById("board");
let initialTime = 60;
let popUpTime = 1500;
let closeTime = 2500;
let interval, speed, showTimer, enemyPopUp, luckyInterval;
let userScore = 0;
let luckyTime = 3500;
let score = document.querySelector('.user-score');
let statistics = document.querySelector('.statistics');
const result_board = document.querySelector('.result-board');
const modal =  document.querySelector('.modal');
const minimum_score = 30;
const btnScore = document.getElementById('score');
const btnPlay = document.getElementById('play-again');
const container = document.getElementById('score-board');
const closeBtn = document.querySelector('.close-window')
const timeContainer = document.querySelector('.time-design');
const btnStart = document.querySelector('start');



function initializeGame(){
    let scores = JSON.parse(localStorage.getItem('scores'));
    if (!scores) {
        scores = Array(10).fill(0);
        localStorage.setItem('scores', JSON.stringify(scores));
    }
    time.textContent = '60';
    createContainers();
    result_board.style.display = 'none';
    startGame();
}


function createContainers() {
    for (let i = 0; i < 12; i++) {
        const divItem = document.createElement("div");
        divItem.className = "item";
        const divHedge = document.createElement("div");
        divHedge.className = "hedge";
        const imgHedge = document.createElement("img");
        imgHedge.src = "img/hedge.png";
        divHedge.appendChild(imgHedge);
        const divEnemy = document.createElement("div");
        divEnemy.className = "enemy";
        const imgEnemy = document.createElement("img");
        imgEnemy.src = "img/cancer.png";
        imgEnemy.classList = "img-tapped";
        const divLucky = document.createElement("div");
        divLucky.className = "lucky";
        const imgLucky = document.createElement("img");
        imgLucky.src = "img/lucky.png";
        imgLucky.classList = "lucky-tapped";
        divEnemy.appendChild(imgEnemy);
        divLucky.appendChild(imgLucky);
        divItem.appendChild(divHedge);
        divItem.appendChild(divEnemy);
        divItem.appendChild(divLucky);
        board.appendChild(divItem);
    }
}

function popUp(){
    let items = document.querySelectorAll('.item');
    let index = items[selectRandom([...items])];
    let enemy = index.querySelector('.enemy');
    let lucky = index.querySelector('.lucky');
    if (!lucky.classList.contains('lucky-appear')) {
    enemy.classList.add('mole-appear');
    }
    hide(enemy);
}

function updateTimer() {
    let remainingTime = parseInt(time.textContent);
    if (remainingTime > 0) {
        remainingTime -= 1;
        time.textContent = remainingTime;
        console.log(userScore);
        if (remainingTime == 30) {
            addLucky();
        }
        if (remainingTime < 10) {
            time.style.color = 'red';
        }
    } else {
        clearInterval(interval);
        board.style.display = 'none';
        timeContainer.style.display = 'none';
        showResults();
    } 
}


function selectRandom(arr) {
    const randomIndex = Math.floor(Math.random() * arr.length);
    return randomIndex;
}

function hide(value){
    setTimeout(() => {
        value.classList.remove('mole-appear');
    }, closeTime);
}

function addLucky(){
    luckyInterval = setInterval(popUpLucky, 4500);
    console.log("lucky" + luckyTime);
}


function startGame(){
    interval = setInterval(updateTimer, 1000);
    showTimer = setInterval(popUp,  popUpTime);
    speed = setInterval(updateSpeed, 15000);
    enemyPopUp = setInterval(updatePop, 10000);
}

function updateSpeed(){
    closeTime = closeTime - 250;
}

function updatePop(){
    popUpTime = popUpTime- 350;
}


board.addEventListener('click', function (event) {
    const clickedElement = event.target;

    if (clickedElement.classList.contains('img-tapped')) {
        userScore = userScore + 2;
        const itemElement = clickedElement.closest('.enemy');

        if (itemElement) {
            itemElement.classList.remove('mole-appear');
        }
    }

    if (clickedElement.classList.contains('lucky-tapped')) {
        userScore = userScore - 5;
        const itemElement = clickedElement.closest('.lucky');

        if (itemElement) {
            itemElement.classList.remove('lucky-appear');
        }
    }
});


function popUpLucky(){
    let items = document.querySelectorAll('.item');
    let index = items[selectRandom([...items])];
    let enemy = index.querySelector('.enemy');
    let lucky = index.querySelector('.lucky');
    if (!enemy.classList.contains('mole-appear')) {
    lucky.classList.add('lucky-appear');
    }
    hideLucky(lucky);
}

function hideLucky(value){
    setTimeout(() => {
        value.classList.remove('lucky-appear');
    }, closeTime);
}

function showResults(){
    modal.style.display = 'block';
    clearIntervals();
    result_board.style.display = 'flex';
    score.innerHTML = `Your Score: ${userScore} `
    let scores = JSON.parse(localStorage.getItem('scores')) || [];
    scores.push(userScore);
    scores.sort((a, b) => b - a);
    scores = scores.slice(0, 10);
    localStorage.setItem('scores', JSON.stringify(scores));

    const bestScoreElement = document.querySelector('.best-score');
    if (scores.length > 0) {
        const bestScore = scores[0]; 
        bestScoreElement.textContent = `Current Best Score: ${bestScore}`;

        if(bestScore < userScore && userScore > minimum_score) {
            statistics.textContent = `You win!`;
        } else {
            statistics.textContent = `YOU LOSE!`;
        }
    } else {
        if (minimum_score < userScore) {
            statistics.textContent = `You win!`;
        } else {
            statistics.textContent = `YOU LOSE!`;
        }
    }
    getTotalScores();
}
   
 

btnPlay.addEventListener('click', function(){
      resetTimer();
      initializeGame();
      modal.style.display = 'none'
      board.style.display = 'grid';
      timeContainer.style.display = 'block'
});

btnScore.addEventListener('click', function(){
    container.style.display = 'grid';
})

closeBtn.addEventListener('click', function(){
    container.style.display = 'none';
})

document.addEventListener('click', function(event) {
    console.log("click");
    if (event.target !== container && container.style.display === 'grid' && event.target !== btnScore) {
        container.style.display = 'none';
    }
});

function resetTimer() {
    popUpTime = 1500;
    closeTime = 2500;
    userScore = 0;
    luckyTime = 3500;
    statistics.textContent = '';
    board.innerHTML = '';
    time.style.color = '#FFFF00';
}

function clearIntervals(){
    clearInterval(interval); 
    clearInterval(showTimer);
    clearInterval(speed);
    clearInterval(enemyPopUp);
    clearInterval(luckyInterval);
}

function getTotalScores() {
    let scores = JSON.parse(localStorage.getItem('scores'));
    let div = document.createElement("div");
        div.className = 'score-item';
        let p = document.createElement("p");
        p.className = 'number';
        let p2 = document.createElement("p");
        p2.className = 'score-value';
        div.appendChild(p);
        div.appendChild(p2);
        p.textContent = "Number";
        p2.textContent = "Score";
        container.appendChild(div); 

    scores.forEach(function (el, i) {
        const div = document.createElement("div");
        div.className = 'score-item';
        const p = document.createElement("p");
        p.className = 'number';
        const p2 = document.createElement("p");
        p2.className = 'score-value';
        p.textContent = el; 
        p2.textContent = i+1;
        div.appendChild(p2);
        div.appendChild(p);
        container.appendChild(div); 
    });
}

