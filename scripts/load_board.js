const boards = [
    [
        [5, 3, 0, 0, 7, 0, 0, 0, 0],
        [6, 0, 0, 1, 9, 5, 0, 0, 0],
        [0, 9, 8, 0, 0, 0, 0, 6, 0],
        [8, 0, 0, 0, 6, 0, 0, 0, 3],
        [4, 0, 0, 8, 0, 3, 0, 0, 1],
        [7, 0, 0, 0, 2, 0, 0, 0, 6],
        [0, 6, 0, 0, 0, 0, 2, 8, 0],
        [0, 0, 0, 4, 1, 9, 0, 0, 5],
        [0, 0, 0, 0, 8, 0, 0, 7, 9]
    ],
    [
        [0, 9, 0, 0, 4, 2, 1, 3, 6],
        [0, 0, 0, 9, 6, 0, 4, 8, 5],
        [0, 0, 0, 5, 8, 1, 0, 0, 0],
        [0, 0, 4, 0, 0, 0, 0, 0, 0],
        [5, 1, 7, 2, 0, 0, 9, 0, 0],
        [6, 0, 2, 0, 0, 0, 3, 7, 0],
        [1, 0, 0, 8, 0, 4, 0, 2, 0],
        [7, 0, 6, 0, 0, 0, 8, 1, 0],
        [3, 0, 0, 0, 9, 0, 0, 0, 0],
    ]
    ];
const SIZE = boards.length;

export function loadRandomBoard() {
    const inputs = document.querySelectorAll("input")
    let idx = Math.floor(Math.random() * SIZE)
    let chosenBoard = boards[idx].flat(1)
    console.log(chosenBoard)

    for (let i = 0; i < chosenBoard.length; i++) {
        if (chosenBoard[i] == 0) {
            inputs[i].value = ""
            inputs[i].disabled = false
        } else {
            inputs[i].value = chosenBoard[i]
            inputs[i].disabled = true
        }
    }
}