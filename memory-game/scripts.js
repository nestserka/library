let time = document.getElementById('timer');
const board = document.getElementById("board");
let initialTime = 60;
let popUpTime = 1500;
let closeTime = 2500;
let interval, speed, showTimer, enemyPopUp, luckyInterval, halfGame;
let userScore = 0;
let records = [];
let luckyTime = 3500;
console.log(userScore);



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
    } else {
        clearInterval(interval);
        time.textContent = "Time's up!";
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


function startGame(){
    createContainers();
    interval = setInterval(updateTimer, 1000);
    showTimer = setInterval(popUp,  popUpTime);
    speed = setInterval(updateSpeed, 15000);
    enemyPopUp = setInterval(updatePop, 10000);
    halfGame = setInterval(addLucky, 30000);
}

function updateSpeed(){
    closeTime = closeTime - 250;
}

function updatePop(){
    popUpTime = popUpTime- 350;
}

function addLucky(){
    luckyInterval = setInterval(popUpLucky, 4500);
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

startGame();

