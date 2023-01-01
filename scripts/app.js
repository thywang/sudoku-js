import { drawGame, setGame, solveGame} from "./game.js"
import { pauseResumeTimer } from "./timer.js"
import { playBgm } from "./music.js"
import { toggle } from "./toggle.js"

const musicButton = document.querySelector("#music")
const solveButton = document.querySelector("#solve-button")
const newGameButton = document.querySelector("#new-game-button")
const pauseResumeButton = document.querySelector("#pause-resume-button")
const toggleButton = document.querySelector("#toggle")

function main() {
    drawGame()
    setGame()
    musicButton.addEventListener("click", () => playBgm(musicButton))
    solveButton.addEventListener("click", () => solveGame())
    newGameButton.addEventListener("click", () => setGame())
    pauseResumeButton.addEventListener("click", () => pauseResumeTimer())
    toggleButton.addEventListener("click", () => toggle())

}

main()