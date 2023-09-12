const btnEasy = document.querySelector('.easy');
const btnMid = document.querySelector('.medium');
const btnHard = document.querySelector('.hard');
const lvlMng = document.querySelector('.level-mng');
let game = document.querySelector('.game');


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


btnEasy.addEventListener('click', function () {
    lvlMng.style.display = 'none';
    selectRandomCards(6);
});

btnMid.addEventListener('click', function () {
    lvlMng.style.display = 'none';
    selectRandomCards(8);
});

btnHard.addEventListener('click', function () {
    lvlMng.style.display = 'none';
    selectRandomCards(10);
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
    runeArr.forEach(function(el) {
        const div = document.createElement('div');
        div.classList.add('card');
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


function startGame(){
    let cards = document.querySelectorAll('.card');
    cards.forEach(card => card.addEventListener('click', function (e) {
        console.log("click"); 
        this.classList.toggle('flipped');
    })); 
}