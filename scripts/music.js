let playing = false // initially not playing
let bgm = new Audio('assets/Marshmallow (Prod. by Lukrembo).mp3')

export function playBgm() {
    bgm.volume = 0.5 // err on safe side so volume at 50%
    bgm.loop = true
    playing = !playing
    playing ? bgm.play() : bgm.pause()
}