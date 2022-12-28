import { loadRandomBoard, loadSolvedBoard } from "./load_board.js"

var digitSelected = null
var solution = null
var errors = 0

const error = document.querySelector("#error-count")

function updateErrors() {
    error.innerText = errors
}

function resetAndUpdateErrors() {
    errors = 0
    updateErrors()
}

function drawBoard() {
    const board = document.querySelector("#sudoku-board")

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const square = document.createElement("div")
            square.id = i.toString() + "-" + j.toString()
            square.addEventListener("click", selectSquare)
            square.classList.add("square")
            if (i == 2 || i == 5) {
                square.classList.add("thicker-border-below")
            }
            if (j == 2 || j == 5) {
                square.classList.add("thicker-border-right")
            }
            board.append(square)
        }
    }
}

function selectSquare() {
    if (digitSelected && this.innerText == "") {
        // pos: ["0","0"], ["0","1"], ... ["9","9"]
        const pos = this.id.split("-")
        const row = parseInt(pos[0])
        const col = parseInt(pos[1])
        const input = parseInt(digitSelected.id)
        
        if (solution[row][col] == input) {
            this.innerText = digitSelected.id
        } else {
            errors = errors + 1
            updateErrors()
        }
    }
}

function drawDigits() {
    const digits = document.querySelector("#digits")

    for (let i = 1; i <= 9; i++) {
        const digit = document.createElement("div")
        digit.id = i
        digit.innerText = i
        digit.addEventListener("click", selectDigit)
        digit.classList.add("digit")
        digits.append(digit)
    }
}

function selectDigit() {
    if (digitSelected == this) { // digit already selected so toggle on or off
        if (digitSelected.classList.contains("digit-selected")) {
            digitSelected.classList.remove("digit-selected")
            digitSelected = null // digit unselected so shouldn't draw any values
        } else {
            digitSelected.classList.add("digit-selected")
        }
    } else {
        if (digitSelected != null) {
            digitSelected.classList.remove("digit-selected")
        }
        digitSelected = this
        digitSelected.classList.add("digit-selected")
    }
}

export function fillBoard(puzzle) {
    const squares = document.querySelectorAll("#sudoku-board .square")
    const flattenedPuzzle = puzzle.flat(1)
    for (let i = 0; i < squares.length; i++) {
        if (flattenedPuzzle[i] != 0) {
            squares[i].innerText = flattenedPuzzle[i]
            squares[i].classList.add("prefilled")
        } else {
            squares[i].innerText = ""
            squares[i].classList.remove("prefilled")
        }
    }
}

export function drawGame() {
    resetAndUpdateErrors()
    drawBoard()
    drawDigits()
}

export function setGame() {
    resetAndUpdateErrors()
    let puzzle = loadRandomBoard()
    fillBoard(puzzle)
    const copy = puzzle.map((item) => item.slice()); // create copy of puzzle to solve
    solution = loadSolvedBoard(copy) // current solution
}