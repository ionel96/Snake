const snk =  document.getElementById("snake");
snk.style.left = "213px";
snk.style.top = "220px";
const posFood = [];
let idUp = false, idDown = false, idLeft = false, idRight = false;
let gameState = true;

function createGameBoard() {
    const board = document.getElementById("obj");
    board.height = 15 * 25;
    board.width = 17 * 25;  
    const ctx = board.getContext('2d');
    let count = 0;
    for (let i = 0; i < 17; ++i) {
        for (let j = 0; j < 17; ++j) {
            if (++count % 2) {
                ctx.fillStyle = "rgba(77, 140, 45, 0.761)";
            } else {
                ctx.fillStyle = "rgba(77, 149, 45, 0.761)";
            }
            ctx.fillRect(j * 25, i * 25, 25, 25);
        }
    }

    for (let i = 45; i <= 395; i += 25) {
        for (let j = 13; j <= 413; j += 25) {
            posFood.push(i, j);
        }
    }
    moveFood();
}

function getKeyAndMove(e) {
    if (gameState) {
        let key_code = e.which || e.keyCode;
        switch (key_code) {
            case 37: 
                moveLeft();
                break;
            case 38: 
                moveUp();
                break;
            case 39:
                moveRight();
                break;
            case 40: 
                moveDown();
                break;
        }
    }
}

function moveLeft() {
    if (!idRight) {
        idLeft = setInterval(function() {
            checkPosition(snk.offsetTop, snk.offsetLeft);
            snk.style.left = parseInt(snk.style.left) - 25 + "px";
        },400);
        clearInterval(idUp);
        clearInterval(idDown);
        idUp = false;
        idDown = false;
    }
}
function moveUp() {
    if (!idDown) {
        idUp = setInterval(function() {
            checkPosition(snk.offsetTop, snk.offsetLeft);
            snk.style.top = parseInt(snk.style.top) - 25 + "px";
        },400);
        clearInterval(idRight);
        clearInterval(idLeft);
        idLeft = false;
        idRight = false;
    }
}
function moveRight() {
    if (!idLeft) {
        idRight = setInterval(function() {
            checkPosition(snk.offsetTop, snk.offsetLeft);
            snk.style.left = parseInt(snk.style.left) + 25 + "px";
        },400);
        clearInterval(idUp);
        clearInterval(idDown);
        idUp = false;
        idDown = false;
    }
}
function moveDown() {
    if (!idUp) {
        idDown = setInterval(function() {
            checkPosition(snk.offsetTop, snk.offsetLeft);
            snk.style.top = parseInt(snk.style.top) + 25 + "px";
        },400);
        clearInterval(idLeft);
        clearInterval(idRight);
        idRight = false;
        idLeft = false;
    }
}

function checkPosition(posX, posY) {
    if (posX == 20 || posX == 420 || posY == -12 || posY == 438) {
        gameState = false;
        document.getElementById('tx').innerHTML = "Game over";
        clearAllInterval();
    }
    if (posX == parseInt(window.x) && posY == parseInt(window.y)) {
        moveFood();
    }
}

function moveFood() {
    let food = document.getElementById("food");
    food.style.top = posFood[Math.floor(Math.random() * 510 / 2 ) * 2] + "px";
    food.style.left = posFood[Math.floor(Math.random() * 510 / 2 ) * 2 - 1] + "px";
    window.x = food.style.top;
    window.y = food.style.left;
}
