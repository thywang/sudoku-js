let bgm = new Audio('assets/Marshmallow (Prod. by Lukrembo).mp3')

export function playBgm(musicButton) {
    musicButton.classList.toggle("play-bgm")

    bgm.volume = 0.5 // err on safe side so volume at 50%
    bgm.loop = true
    musicButton.classList.contains("play-bgm") ? bgm.play() : bgm.pause()
}