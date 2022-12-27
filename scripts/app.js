import { drawGame, setGame} from "./draw_game.js"

const solveButton = document.querySelector("#solve-button")
const clearButton = document.querySelector("#clear-button")
const newGameButton = document.querySelector("#new-game-button")

function main() {
    drawGame()
    setGame()
    clearButton.addEventListener("click", () => location.reload())
    newGameButton.addEventListener("click", () => setGame())
}

main()