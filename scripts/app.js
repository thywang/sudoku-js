import { drawBoard } from "./draw_board.js"
import { loadRandomBoard } from "./load_board.js"

const newGameButton = document.querySelector("#new-game-button")

function main() {
    drawBoard()
    newGameButton.addEventListener("click", () => loadRandomBoard())
}

main()