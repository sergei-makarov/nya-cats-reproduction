const snake_head = 4
const snake_body = 0
const obstacle = 1
const none = 2
const food = 3
const size = 12
const LEFT_ARROW = 37
const UP_ARROW = 38
const RIGHT_ARROW = 39
const DOWN_ARROW = 40

let currentDirection = DIRECTION_DOWN;

const container = document.getElementById("container")

let initmatrix = []

function initMatrix() {
    init(size);
}

function renderItem(elem, value) {
    if (value == snake_head) {
        elem.className = "snake_head"
    }
    if (value == snake_body) {
        elem.className = "snake_body"
    }
    if (value == obstacle) {
        elem.className = "obstacle"
    }
    if (value == none) {
        elem.className = "none"
    }
    if (value == food) {
        elem.className = "food"
    }
}

function renderMatrix(matrix) {
    let play_area = document.createElement('div')
    play_area.className = "play_area"
    container.appendChild(play_area)

    for (let y = 0; y < matrix.length; y++) {
        let row = matrix[y];
        let rowElem = document.createElement("div")
        rowElem.className = "row"
        play_area.appendChild(rowElem)
        for (let x = 0; x < row.length; x++) {
            let elem = document.createElement ("div")
            rowElem.appendChild(elem)
            row[x].link = elem

            renderItem(elem, row[x].value)
        }
    }
}

function renderDiff(matrix, diff) {
    for (let i = 0; i < diff.length; i++) {
        let x = diff[i].x
        let y = diff[i].y
        let value = diff[i].value
        let row = matrix[y]
        row[x].value = value
        renderItem(row[x].link, value)
    }
}


let currentX = 0
let currentY = 0


function nextStep() {
    let diff = getDiff();
    if (!diff) {
        clearInterval(mainInterval)
        alert("Game over")
    } else {
        renderDiff(currentMatrix, diff)
    }
}

initMatrix();
renderMatrix(currentMatrix)
//currentMatrix()
//renderDiff(initmatrix)

let mainInterval = setInterval(() => {
    nextStep() 
    document.getElementById("myau").play()
}, 700
)
 
setInterval(() => {
    addFood()
}, 10
)

document.addEventListener('keydown', function (event) {

     switch (event.keyCode) {
        case LEFT_ARROW: currentDirection = DIRECTION_LEFT; break;
        case RIGHT_ARROW: currentDirection = DIRECTION_RIGHT; break;
        case UP_ARROW: currentDirection = DIRECTION_UP; break;
        case DOWN_ARROW: currentDirection = DIRECTION_DOWN; break;
     }
    
})
