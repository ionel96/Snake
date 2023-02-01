onload = (createGameBoard);
let idUp = false, idDown = false, idLeft = false, idRight = false;
let gameState = true, fruitEaten = 0;
let currentPos = [], linePos = 8, columnPos = 8;
const gameBoard = Array.from(Array(16), () => new Array(16).fill(0));

function createGameBoard() {
    let count = 0;
    const box = document.getElementById('box');
    for (let i = 0; i < 16; ++i) {
        for (let j = 0; j < 16; ++j) {
            const block = document.createElement('div');
            block.id = i + " " + j;
            block.style.width = '30px';
            block.style.height = '30px';
            block.classList.add('cell');
            box.appendChild(block);
            box.style.width = '30px';
            if (++count % 2) {
                block.style.background = "rgba(77, 140, 45, 0.761)";
            } else {
                block.style.background = "rgba(77, 149, 45, 0.761)";
            }
        }
        ++count;
    }
    box.style.width = `${(30 * 16) + 2 * (16)}px`;
    document.getElementById(linePos + " " + columnPos).innerHTML = "🟦";
    currentPos.unshift(8, 8);
    gameBoard[linePos][columnPos] = 1;
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
    if (!idRight && !idLeft) {
        idLeft = setInterval(function() {
            currentPos.unshift(linePos, --columnPos);
            checkPosition(linePos, columnPos);
        },200);
        deleteRange(idUp, idDown);
        idUp = false;
        idDown = false;
    }
}
function moveUp() {
    if (!idDown && !idUp) {
        idUp = setInterval(function() {
            currentPos.unshift(--linePos, columnPos);
            checkPosition(linePos, columnPos);
        },200);
        deleteRange(idRight, idLeft);
        idLeft = false;
        idRight = false;
    }
}
function moveRight() {
    if (!idLeft && !idRight) {
        idRight = setInterval(function() {
            currentPos.unshift(linePos, ++columnPos);
            checkPosition(linePos, columnPos);
        },200);
        deleteRange(idUp, idDown);
        idUp = false;
        idDown = false;
    }
}
function moveDown() {
    if (!idUp && !idDown) {
        idDown = setInterval(function() {
            currentPos.unshift(++linePos, columnPos);
            checkPosition(linePos, columnPos);
        },200);
        deleteRange(idLeft, idRight);
        idRight = false;
        idLeft = false;
    }
}

function checkPosition(posX, posY) {
    if (posX < 0 || posX > 15 || posY < 0 || posY > 15 || gameBoard[linePos][columnPos]) {
        gameState = false;
        deleteRange(idUp, idDown);
        deleteRange(idLeft, idRight);
        document.getElementById('output').innerHTML = "Game Over";
        return;
    } else {
        document.getElementById(currentPos[0] + " " + currentPos[1]).innerHTML = "🟦";
        gameBoard[currentPos[0]][currentPos[1]] = 1;
    }

    if (posX == parseInt(window.x) && posY == parseInt(window.y)) {
        document.getElementById('counter').innerHTML = ++fruitEaten;
        moveFood();
    } else {
        deleteItems();
    }
}

function moveFood() {
    for (let j = 0; j < 5; ++j) {
        let line = Math.floor(Math.random() * 15);
        let colum = Math.floor(Math.random() * 15);
        if (gameBoard[line][colum] == 1) {
            continue;
        }
        document.getElementById(line + " " + colum).innerHTML = "🍎";
        window.x = line;
        window.y = colum;
        break;
    }
}

function deleteItems() {
    document.getElementById(currentPos[currentPos.length - 2] + " " + currentPos[currentPos.length - 1]).innerHTML = "";
    gameBoard[currentPos[currentPos.length - 2]][currentPos[currentPos.length - 1]] = 0;
    currentPos.pop();
    currentPos.pop();
}

function deleteRange(firstInterval, secInterval) {
    clearInterval(firstInterval);
    clearInterval(secInterval);
}
