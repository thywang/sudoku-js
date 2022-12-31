import { drawGame, setGame, solveGame} from "./game.js"
import { pauseResumeTimer } from "./timer.js"
import { playBgm } from "./music.js"

const musicButton = document.querySelector("#music-button")
const solveButton = document.querySelector("#solve-button")
const newGameButton = document.querySelector("#new-game-button")
const pauseResumeButton = document.querySelector("#pause-resume-button")

function main() {
    drawGame()
    setGame()
    musicButton.addEventListener("click", () => playBgm())
    solveButton.addEventListener("click", () => solveGame())
    newGameButton.addEventListener("click", () => setGame())
    pauseResumeButton.addEventListener("click", () => pauseResumeTimer())
}

main()