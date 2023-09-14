function createContainers() {
    const board = document.getElementById("board");
    
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
        divEnemy.appendChild(imgEnemy);
        divItem.appendChild(divHedge);
        divItem.appendChild(divEnemy);
        board.appendChild(divItem);
    }
}

window.onload = createContainers;