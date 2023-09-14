let time = document.getElementById('timer');
const board = document.getElementById("board");
let initialTime = 60;
let popUpTime = 2000;
let closeTime = 3000;
let interval, speed, showTimer, enemyPopUp;
let userScore = 0;
let records = [];



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
        divEnemy.appendChild(imgEnemy);
        divItem.appendChild(divHedge);
        divItem.appendChild(divEnemy);
        board.appendChild(divItem);
    }
}

function popUp(){
    let enimies = document.querySelectorAll('.item');
    let enemy = enimies[selectRandom([...enimies])].querySelector('.enemy');
    enemy.classList.add('mole-appear');
    hide(enemy);
}

function updateTimer() {
    let remainingTime = parseInt(time.textContent);
    if (remainingTime > 0) {
        remainingTime -= 1;
        time.textContent = remainingTime;
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
    enemyPopUp = setInterval(updatePop, 10000)
    
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
        userScore++;
        const itemElement = clickedElement.closest('.enemy');

        if (itemElement) {
            itemElement.classList.remove('mole-appear');
        }
    }
});

startGame();

