import { drawGame, setGame, solveGame} from "./game.js"
import { pauseResumeTimer } from "./timer.js"

const solveButton = document.querySelector("#solve-button")
const newGameButton = document.querySelector("#new-game-button")
const pauseResumeButton = document.querySelector("#pause-resume-button")

function main() {
    drawGame()
    setGame()
    solveButton.addEventListener("click", () => solveGame())
    newGameButton.addEventListener("click", () => setGame())
    pauseResumeButton.addEventListener("click", () => pauseResumeTimer())
}

main()