import { loadRandomBoard, loadSolvedBoard } from "./load_board.js"
import { resetTimer, displayTimer } from "./timer.js"

/* global variable declarations */
var digitSelected = null
var squareSelected = null
var solution = null
var errors = 0
var tally = new Array(10) // keeps track of number of times a digit correctly appears on the board

const error = document.querySelector("#error-count")

/* error functions */
function updateErrors(value) {
    errors = value
    error.innerText = "Mistakes: " + errors
}

/* tally functions */
function resetTally() {
    tally = new Array(10).fill(0) // real index actually start from 1
}

/* function to hide digit */
function hideDigitSelected() {
    digitSelected.classList.add("hide")
    digitSelected = null
}

/* function to unhide hidden digits */
function resetDigits() {
    const digits = document.querySelector("#digits")
    for (const digit of digits.childNodes) {
        digit.classList.remove("hide")
        digit.classList.remove("digit-selected")
    }
    digitSelected = null
}

/* function to return a tally of digits in the board */
function calculateTally(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (board[i][j] != 0) {
                tally[board[i][j]]++
            }
        }
    }
}

/* function to draw empty board */
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

/* function to input a value in the board */
function selectSquare() {
    if (squareSelected != null) {
        squareSelected.classList.remove("square-selected")
    }
    squareSelected = this
    squareSelected.classList.add("square-selected")
    
    selectSquareMaybeFillSquare(this)
}

/* function to input value if it's correct or input and highlight as incorrect */
function selectSquareMaybeFillSquare(square) {
    if (digitSelected) {
        if (square.innerText == "" || square.classList.contains("error")) {
            // pos: ["0","0"], ["0","1"], ... ["9","9"]
            const pos = square.id.split("-")
            const row = parseInt(pos[0])
            const col = parseInt(pos[1])
            const input = parseInt(digitSelected.id)
            
            if (solution[row][col] == input) { // correct
                square.innerText = digitSelected.id
                square.classList.remove("error")
                squareSelected.classList.remove("square-selected") // unselect any squares
                tally[parseInt(digitSelected.id)]++ // update tally
                if (tally[parseInt(digitSelected.id)] == 9) { // all occurrences of the digit has been correctly placed
                    hideDigitSelected()
                }
            } else { // incorrect
                square.innerText = digitSelected.id
                square.classList.add("error")
                updateErrors(errors + 1)
            }
        }
    }
}

/* function to draw available values to input */
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

/* function to select an available value to input */
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
    selectDigitMaybeFillSquare()
}

function selectDigitMaybeFillSquare() {
    if (squareSelected) {
        selectSquareMaybeFillSquare(squareSelected)
    }
}

/* function to fill the Sudoku board with values of a puzzle */
export function fillBoard(puzzle) {
    const squares = document.querySelectorAll("#sudoku-board .square")
    const flattenedPuzzle = puzzle.flat(1)
    for (let i = 0; i < squares.length; i++) {
        squares[i].classList.remove("error") // remove error property
        if (flattenedPuzzle[i] != 0) {
            squares[i].innerText = flattenedPuzzle[i]
            squares[i].classList.add("prefilled")
        } else {
            squares[i].innerText = ""
            squares[i].classList.remove("prefilled")
        }
    }
}

/* main game functions */
export function drawGame() {
    updateErrors(0)
    drawBoard()
    drawDigits()
}

export function setGame() {
    /* reset functions */
    updateErrors(0)
    resetTally()
    resetDigits()
    resetTimer()

    displayTimer()

    let puzzle = loadRandomBoard()
    fillBoard(puzzle)
    const copy = puzzle.map((item) => item.slice()); // create copy of puzzle to solve
    calculateTally(copy) // current tally
    solution = loadSolvedBoard(copy) // current solution
}

export function solveGame() {
    resetTimer(true)
    fillBoard(solution)
}