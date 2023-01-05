import { shuffle } from "./load_board.js"

/* global variables and constants */
const PATH_PREFIX = "assets/bgm/"
const PATH_SUFFIX = ".mp3"
const songs = [ 
    "Marshmallow (Prod. by Lukrembo)",
    "Bread (Prod. by Lukrembo)",
    "By Your Side.",
    "See You Tomorrow",
    "Hanging With The Boys",
    "Finding Shapes in the Clouds",
    "A Home For Flowers (Tulip)",
    "A Warrior's Holiday",
    "To Far Away Times",
].map((file_name) => { return PATH_PREFIX + file_name + PATH_SUFFIX})

// shuffle playlist
let playlist = shuffle(songs)
let idx = 0 // starting index

let bgm = new Audio(playlist[idx])
// constant setting for audio object
bgm.volume = 0.5 // err on safe side so volume at 50%
bgm.loop = false

export function playBgm(musicButton) {
    musicButton.classList.toggle("play-bgm")
    bgm.onended = () => {
        // console.log("ended")
        idx = ++idx < playlist.length ? idx : 0
        console.log(idx)
        bgm.src = playlist[idx] // pick random song
        musicButton.classList.remove("play-bgm") // remove so playBgm can add again
        playBgm(musicButton) // recursive call
    }
    musicButton.classList.contains("play-bgm") ? bgm.play() : bgm.pause()
}