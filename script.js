onload = (createGameBoard);
let idUp = false, idDown = false, idLeft = false, idRight = false;
let gameState = true, fruitEaten = 0, setMove = false;
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
    currentPos.unshift(linePos, columnPos);
    gameBoard[linePos][columnPos] = 1;
}

function getKeyAndMove(e) {
    if (gameState) {
        let key_code = e.which || e.keyCode;
        if (key_code == 37 && !idRight && !idLeft) {
            move(key_code);
            idLeft = true;
        } else if (key_code == 38 && !idDown && !idUp) {
            move(key_code);
            idUp = true;
        } else if (key_code == 39 && !idLeft && !idRight) {
            move(key_code);
            idRight = true;
        } else if (key_code == 40 && !idUp && !idDown) {
            move(key_code);
            idDown = true;
        }
    }
}

function move(idKey) {
    clearInterval(setMove);
    setMove = setInterval(function() {
        if (idKey == 37) {
            --columnPos;
        } else if (idKey == 38) {
            --linePos;
        } else if (idKey == 39) {
            ++columnPos;
        } else {
            ++linePos;
        }
        currentPos.unshift(linePos, columnPos);
        checkPosition(linePos, columnPos);
    }, 200);
    if (idKey == 37 || idKey == 39) {
        idUp = false;
        idDown = false;
    } else {
        idLeft = false;
        idRight = false;
    }
}

function checkPosition(posX, posY) {
    if (posX < 0 || posX > 15 || posY < 0 || posY > 15 || gameBoard[linePos][columnPos]) {
        gameState = false;
        clearInterval(setMove);
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
    let line = Math.floor(Math.random() * 15);
    let colum = Math.floor(Math.random() * 15);
    while (gameBoard[line][colum] == 1) {
        line = Math.floor(Math.random() * 15);
        colum = Math.floor(Math.random() * 15);
    }
    document.getElementById(line + " " + colum).innerHTML = "🍎";
    window.x = line;
    window.y = colum;
}

function deleteItems() {
    document.getElementById(currentPos[currentPos.length - 2] + " " + currentPos[currentPos.length - 1]).innerHTML = "";
    gameBoard[currentPos[currentPos.length - 2]][currentPos[currentPos.length - 1]] = 0;
    currentPos.pop();
    currentPos.pop();
}
