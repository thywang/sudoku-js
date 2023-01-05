import { solve } from "./solver.js"

/* global variables and constants */
var chosenPuzzles = []
var easyPuzzles = []
var mediumPuzzles = []
var hardPuzzles = []

// puzzle file paths
const EASY = "assets/puzzles/easy.txt"
const MEDIUM = "assets/puzzles/medium.txt"
const HARD = "assets/puzzles/hard.txt"

function convert1DArrayTo2D(arr) {
    // convert 1D array to 2D array
    const newArr = []
    while(arr.length) {
       newArr.push(arr.splice(0,9))
    }
    return newArr
}

function readPuzzleTextFile(file, callback, difficulty = "easy")
{
    var rawFile = new XMLHttpRequest()
    rawFile.open("GET", file, false)
    rawFile.onreadystatechange = function ()
    {
        if(rawFile.readyState === 4)
        {
            if(rawFile.status === 200 || rawFile.status == 0)
            {
                var allText = rawFile.responseText
                callback(allText, difficulty)
            }
        }
    }
    rawFile.send(null)
}

// function to parse a list of 9x9 Sudoku puzzles from text file and updates the board to these puzzles
// each line in the format: [0,1,2,0, ... ,9,6,3]
function parseDataIntoPuzzles(data, difficulty = "easy") {
    let puzzleList = []
    var array = data.toString().split("\n").slice(0,-1) // remove last array which is empty NaN
    for(let i = 0; i < array.length; i++) {
       // Printing the response array
       const withoutFirstAndLast = array[i].slice(1, -1)
       const arr = withoutFirstAndLast
          .split(",")
          .map(char => { return parseInt(char) })
       const puzzle = convert1DArrayTo2D(arr)
       puzzleList.push(puzzle) // modifies puzzle list
    }
    switch(difficulty) {
        case "easy":
            easyPuzzles = puzzleList
            break;
        case "medium":
            mediumPuzzles = puzzleList
            break;
        case "hard":
            hardPuzzles = puzzleList
            break;
    }
}

/* valid transformations on Sudoku board */
// function to rotate a matrix once clockwise
const rotateMatrix = (matrix) => {
    const n = matrix.length

    // create temp board of size n x n
    let temp = Array.from(Array(n), () => Array(n))

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            // [i][j] => [j][n-(i + 1)]
            // e.g. assuming 9x9 matrix, array[0][0] => array[0][8]
            temp[j][n - (i + 1)] = matrix[i][j]
        }
    }
    return temp // now rotated
}
// function to map all the numbers in a matrix to other numbers (e.g. '1's => '3's, '3's => '6's, '6's => ...)
const convertValuesInMatrix = (matrix) => {
    const arr = Array.from(Array(9), (e, i) => i + 1) // [1, 2, 3, ... , 9]
    const shuffled = shuffle(arr)
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[0].length; j++) {
            // assume values in matrix range from 1 to 9
            let idx = matrix[i][j] - 1 // and -1 because indices start from 0, not 1
            matrix[i][j] = shuffled[idx] || 0
        }
    }
    return matrix // now transformed
}

// function to shuffle an array using the Fisher-Yates method
export function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
        let swapIdx = Math.floor(Math.random() * (i + 1)) // generate random integer between 0 and i
        let temp = arr[i]
        arr[i] = arr[swapIdx]
        arr[swapIdx] = temp
    }
    return arr // now shuffled
}

// function to shuffle any 2-3 rows or cols that span the same 3 boxes
const shuffleRows = (matrix) => {
    return [
        shuffle(matrix.slice(0, 3)),
        shuffle(matrix.slice(3, 6)),
        shuffle(matrix.slice(6))
    ].flat() // flattens array by one level by default
}

const shuffleCols = (matrix) => {
    // rotate matrix once
    matrix = rotateMatrix(matrix)
    // use shuffleRows
    matrix = shuffleRows(matrix)
    // rotate 3 more times back to original orientation
    for (let i = 0; i < 3; i++) {
        matrix = rotateMatrix(matrix)
    }
    return matrix // now shuffled
}

function getSelectedDifficulty() {
    const radioButtons = document.querySelectorAll('input[name="btnradio"]');

    let selectedDifficulty
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedDifficulty = radioButton.id
            break
        }
    }
    return selectedDifficulty
}

function maybeApplyTransformation(chosenBoard) {
    const transformations = [ rotateMatrix, convertValuesInMatrix, shuffleRows, shuffleCols ]
    let idx = Math.floor(Math.random() * (transformations.length + 1)) // one more than existing index to represent no transformations
    const transform = transformations[idx] || null
    if (transform) {
        console.log(transform.name + " applied")
        return transform(chosenBoard)
    }
    console.log("no transformation applied")
    return chosenBoard
}

export function initAllPuzzles() {
    readPuzzleTextFile(EASY, parseDataIntoPuzzles, "easy")
    readPuzzleTextFile(MEDIUM, parseDataIntoPuzzles, "medium")
    readPuzzleTextFile(HARD, parseDataIntoPuzzles, "hard")
}

export function loadRandomBoard() {
    switch(getSelectedDifficulty()) {
        case "easy-level":
            console.log("easy level")
            chosenPuzzles = easyPuzzles
            break
        case "medium-level":
            console.log("medium level")
            chosenPuzzles = mediumPuzzles
            break
        case "hard-level":
            console.log("hard level")
            chosenPuzzles = hardPuzzles
            break
        default:
            // easy level
            chosenPuzzles = easyPuzzles
    }
    let idx = Math.floor(Math.random() * chosenPuzzles.length)
    // apply a random transformation to this board
    return maybeApplyTransformation(chosenPuzzles[idx])
}

export function loadSolvedBoard(puzzle) {
    let toSolve = puzzle
    solve(toSolve)
    // puzzle now solved
    return toSolve
}