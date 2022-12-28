import { drawGame, setGame, solveGame} from "./game.js"

const solveButton = document.querySelector("#solve-button")
const newGameButton = document.querySelector("#new-game-button")

function main() {
    drawGame()
    setGame()
    solveButton.addEventListener("click", () => solveGame())
    newGameButton.addEventListener("click", () => setGame())
}

main()