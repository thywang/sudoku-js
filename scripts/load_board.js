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

export function initAllPuzzles() {
    readPuzzleTextFile(EASY, parseDataIntoPuzzles, "easy")
    readPuzzleTextFile(MEDIUM, parseDataIntoPuzzles, "medium")
    readPuzzleTextFile(HARD, parseDataIntoPuzzles, "hard")
}

export function loadRandomBoard() {
    const radioButtons = document.querySelectorAll('input[name="btnradio"]');

    let selectedDifficulty
    for (const radioButton of radioButtons) {
        if (radioButton.checked) {
            selectedDifficulty = radioButton.id
            break
        }
    }
    switch(selectedDifficulty) {
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
    let chosenBoard = chosenPuzzles[idx]
    return chosenBoard
}

export function loadSolvedBoard(puzzle) {
    let toSolve = puzzle
    solve(toSolve)
    // puzzle now solved
    return toSolve
}