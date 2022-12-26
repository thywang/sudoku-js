export function drawBoard() {
    const board = document.querySelector("#sudoku-board")
    const NUM_SQUARES = 81

    for (let i = 0; i < NUM_SQUARES; i++) {
        const inputElement = document.createElement("input")
        inputElement.setAttribute("type", "number")
        inputElement.setAttribute("min", 1)
        inputElement.setAttribute("max", 9)
        board.appendChild(inputElement)
    }
}