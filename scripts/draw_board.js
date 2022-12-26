export function drawBoard() {
    const board = document.querySelector("#sudoku-board")
    const NUM_SQUARES = 81

    for (let i = 0; i < NUM_SQUARES; i++) {
        const inputElement = document.createElement("input")
        inputElement.setAttribute("type", "number")
        inputElement.setAttribute("min", 1)
        inputElement.setAttribute("max", 9)

        if (i % 3 == 0 && i % 9 != 0) {
            inputElement.classList.add("thicker-border-left")
        } 
        if ((18 <= i && i < 18+9) || (45 <= i && i < 45+9)) {
            inputElement.classList.add("thicker-border-below")
        }

        board.appendChild(inputElement)
    }
}