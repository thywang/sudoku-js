const sudoku_solver = document.querySelector(".sudoku-solver")
const game_buttons = document.querySelectorAll(".btn-light")
export function toggle() {
    sudoku_solver.classList.toggle("dark")
    console.log(game_buttons)
    for (let i = 0; i < game_buttons.length; i++) {
        console.log(game_buttons[i])
        game_buttons[i].classList.toggle("btn-light")
        game_buttons[i].classList.toggle("btn-dark")
    }
}