var digitSelected = null

function drawBoard() {
    const board = document.querySelector("#sudoku-board")

    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            const square = document.createElement("div")
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
        this.innerText = digitSelected.id
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
    for (let i = 0; i < squares.length; i++) {
        if (puzzle[i] != 0) {
            squares[i].innerText = puzzle[i]
            squares[i].classList.add("prefilled")
        } else {
            squares[i].innerText = ""
            squares[i].classList.remove("prefilled")
        }
    }
}

export function drawGame() {
    drawBoard()
    drawDigits()
}