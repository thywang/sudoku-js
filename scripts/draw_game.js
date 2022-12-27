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
    console.log("square selected")
}

function drawDigits() {
    const digits = document.querySelector("#digits")

    for (let i = 1; i <= 9; i++) {
        const digit = document.createElement("div")
        digit.id = i
        digit.innerHTML = i
        digit.addEventListener("click", selectDigit)
        digit.classList.add("digit")
        digits.append(digit)
    }
}

function selectDigit() {
    if (digitSelected == this) { // digit already selected so toggle on or off
        if (digitSelected.classList.contains("digit-selected")) {
            digitSelected.classList.remove("digit-selected")
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

export function drawGame() {
    drawBoard()
    drawDigits()
}