
const pauseResumeButton = document.querySelector("#pause-resume-button")
let timer = document.querySelector(".timer")
let [minutes, seconds] = [0, 0]
let interval = null

export function displayTimer() {
    if (interval) {
        clearInterval(interval)
    }
    interval = setInterval(updateTimer, 1000) // update every 1000 ms = 1 second 
}

export function pauseResumeTimer() {
    if (pauseResumeButton.classList.contains("paused")) {
        pauseResumeButton.classList.remove("paused")
        displayTimer()
    } else {
        pauseResumeButton.classList.add("paused")
        clearInterval(interval)
    }
}

export function resetTimer(hideButton = false) {
    if (hideButton) { 
        pauseResumeButton.classList.add("hide")
    } else {
        pauseResumeButton.classList.remove("hide")
    }
    /* restore button to default (i.e. pause) */
    pauseResumeButton.classList.remove("paused")
    clearInterval(interval)
    minutes = 0
    seconds = 0
    timer.innerText = `00:00`
}

function updateTimer() {
    seconds++
    if (seconds == 60) {
        seconds = 0
        minutes++
    }
    let m = minutes < 10 ? "0" + minutes : minutes
    let s = seconds < 10 ? "0" + seconds : seconds
    timer.innerText = `${m}:${s}`
}
