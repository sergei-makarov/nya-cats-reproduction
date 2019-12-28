const SNAKE = 0;
const OBSTAСLE = 1;
const NONE = 2;
const FOOD = 3;
const SNAKE_HEAD = 4;


const DIRECTION_UP = 1;
const DIRECTION_DOWN = 2;
const DIRECTION_LEFT = 3;
const DIRECTION_RIGHT = 4;

const RESULT_FAIL = 1;
const RESULT_NONE = 2;
const RESULT_INCREASE = 3;


var snakeArray = [];
var currentMatrix = [];
var newMatrix;


function init(dimension) {
    var result = [];
    for (var i = 0; i < dimension; i++) {
        var row = [];
        for (j = 0; j < dimension; j++) {

            row.push({
                x: j,
                y: i,
                link: null,
                value: NONE
            });
        }
        result.push(row);
    }
    result[0][0].value = SNAKE_HEAD;
    result[0][1].value = FOOD;
    snakeArray[0] = result[0][0];
    currentMatrix = result;
    return result;
}

function updateSnake() {
    for (var i = snakeArray.length - 1; i > 0; i--) {
        snakeArray[i] = snakeArray[i - 1];
    }
}

function setNewMatrix() {
    newMatrix = [];
    for (var i = 0; i < currentMatrix.length; i++) {
        newMatrix[i] = [];
        for (var j = 0; j < currentMatrix.length; j++) {
            var copy = {};
            for (prop in currentMatrix[i][j]) {
                copy[prop] = currentMatrix[i][j][prop];
            }
            newMatrix[i].push(copy);
        }
    }
}

function command(direction) {

    if (!newMatrix)
        setNewMatrix();

    var newHeadCoordinates = {
        x: snakeArray[0].x,
        y: snakeArray[0].y,

    };
    switch (direction) {
        case DIRECTION_DOWN:
            newHeadCoordinates.y = newHeadCoordinates.y + 1;
            break;
        case DIRECTION_UP:
            newHeadCoordinates.y = newHeadCoordinates.y - 1;
            break;
        case DIRECTION_RIGHT:
            newHeadCoordinates.x = newHeadCoordinates.x + 1;
            break;
        case DIRECTION_LEFT:
            newHeadCoordinates.x = newHeadCoordinates.x - 1;
            break;
    }

    return check(newHeadCoordinates);
}



function check(newHeadCoordinates) {
    var tailPoint = snakeArray.length - 1;
    var newPoint = currentMatrix[newHeadCoordinates.y][newHeadCoordinates.x];
    if (newHeadCoordinates.x < 0 || newHeadCoordinates.x >= 12 || newHeadCoordinates.y < 0 || newHeadCoordinates >= 12)
        return RESULT_FAIL;
    if (newPoint.value === NONE) {
        newMatrix[newHeadCoordinates.y][newHeadCoordinates.x].value = SNAKE_HEAD;
        newMatrix[snakeArray[tailPoint].y][snakeArray[tailPoint].x].value = NONE;

        updateSnake();
        snakeArray[0].x = newHeadCoordinates.x;
        snakeArray[0].y = newHeadCoordinates.y;
        return RESULT_NONE;
    }

    if (newPoint.value === FOOD) {
        newMatrix[newHeadCoordinates.y][newHeadCoordinates.x].value = SNAKE_HEAD;
        newMatrix[snakeArray[0].y][snakeArray[0].x].value = SNAKE;
        snakeArray.unshift(newHeadCoordinates);
        return RESULT_INCREASE;
    }


    return RESULT_FAIL;
}

function getDiff() {

    if (command(currentDirection) === RESULT_FAIL)
        return null;
    if (!newMatrix)
        return [];

    var diff = [];
    for (var i = 0; i < currentMatrix.length; i++) {
        for (var j = 0; j < currentMatrix.length; j++) {
            if (newMatrix[i][j].value !== currentMatrix[i][j].value) {
                diff.push(newMatrix[i][j]);
            }

        }
    }
    currentMatrix = newMatrix;
    newMatrix = null;
    return diff;
}

function addFood() {
    if (!newMatrix)
        setNewMatrix();

    var possiblePosition = [];
    for (var i = 0; i < newMatrix.length; i++) {
        for (var j = 0; j < newMatrix.length; j++) {
            if (newMatrix[i][j].value === NONE) {
                possiblePosition.push(newMatrix[i][j]);
            }
        }
    }

    var index = Math.floor(Math.random() * possiblePosition.length);

    possiblePosition[index].value = FOOD;

}