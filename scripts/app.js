import { drawGame, fillBoard} from "./draw_game.js"
import { loadRandomBoard } from "./load_board.js"

const solveButton = document.querySelector("#solve-button")
const clearButton = document.querySelector("#clear-button")
const newGameButton = document.querySelector("#new-game-button")

function main() {
    drawGame()
    clearButton.addEventListener("click", () => location.reload())
    newGameButton.addEventListener("click", () => fillBoard(loadRandomBoard()))
}

main()