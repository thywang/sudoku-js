// JavaScript version of the Python sudoku solver

// main program
// const _board = [[5, 3, 0, 0, 7, 0, 0, 0, 0],
//          [6, 0, 0, 1, 9, 5, 0, 0, 0],
//          [0, 9, 8, 0, 0, 0, 0, 6, 0],
//          [8, 0, 0, 0, 6, 0, 0, 0, 3],
//          [4, 0, 0, 8, 0, 3, 0, 0, 1],
//          [7, 0, 0, 0, 2, 0, 0, 0, 6],
//          [0, 6, 0, 0, 0, 0, 2, 8, 0],
//          [0, 0, 0, 4, 1, 9, 0, 0, 5],
//          [0, 0, 0, 0, 8, 0, 0, 7, 9]]
const _board = [
    [0, 9, 0, 0, 4, 2, 1, 3, 6],
    [0, 0, 0, 9, 6, 0, 4, 8, 5],
    [0, 0, 0, 5, 8, 1, 0, 0, 0],
    [0, 0, 4, 0, 0, 0, 0, 0, 0],
    [5, 1, 7, 2, 0, 0, 9, 0, 0],
    [6, 0, 2, 0, 0, 0, 3, 7, 0],
    [1, 0, 0, 8, 0, 4, 0, 2, 0],
    [7, 0, 6, 0, 0, 0, 8, 1, 0],
    [3, 0, 0, 0, 9, 0, 0, 0, 0],
];
console.log(solve(_board))
print_board(_board)

function is_possible(board, row, col, n) {
    // check the row
    for (let i = 0; i < 9; i++) {
        if (board[row][i] == n) {
            return false   
        }
    }
    // check the column
    for (let i = 0; i < 9; i++) {
        if (board[i][col] == n) {
            return false
        }
    }
    // check the square
    const sq_x = Math.floor(col / 3) * 3
    const sq_y = Math.floor(row / 3) * 3
    for (let i = sq_y; i < sq_y + 3; i++) {
        for (let j = sq_x; j < sq_x + 3; j++) {
          // second condition is to prevent checking where we want to place value in
          if (board[i][j] == n && (i, j) != (row, col)) {
            return false
          }  
        }
    }
    // number is not in the row, column or square
    return true
}

// This function solves a 9x9 sudoku puzzle
function solve(board) {
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            // if cell is empty
            if (board[i][j] == 0) {
                // check through 1 to 9 to see if any number(s) can go in
                for (let k = 1; k <= 9; k++) {
                    if (is_possible(board, i, j, k)) {
                        board[i][j] = k
                        if (solve(board)) {
                            return true
                        } else {
                            board[i][j] = 0
                        }
                    }
                }
                return false
            }
        }
    }
    return true
}

// helper function to print out the board
function print_board(board) {
    let output = ""
    for (let y = 0; y < 9; y++) {
        let min = 0
        let max = 3
        while (max <= 9) {
            output += "|  "
            for (let x = min; x < max; x++) {
                if (!(board[y][x])) {
                    output += "-  "
                } else {
                    output += board[y][x] + "  "
                }
            }
            min = max
            max += 3
        }
        output += "|\n"
        if (y + 1 < 9 && (y + 1) % 3 == 0) {
            for (i = 0; i < 19; i++){
                output += "- "
            }
            output += "\n"
        }
    }
    console.log(output)
}