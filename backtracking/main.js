
//grid size
let N = 4;

let board;
let bw = 360;
let bh = 360;
let p = 4;

let canvas = document.getElementById("canvas");
let context = canvas.getContext("2d");
let btnAdd = document.getElementById("btnAdd");

drawBoard();

btnAdd.onclick= function(e){   
    findQueenSolution();
}

function drawBoard(){

for (let x = 0; x <= bw; x += 90) {
    context.moveTo(0.5 + x + p, p);
    context.lineTo(0.5 + x + p, bh + p);
}

for (let x = 0; x <= bh; x += 90) {
    context.moveTo(p, 0.5 + x + p);
    context.lineTo(bw + p, 0.5 + x + p);
}


context.strokeStyle = "black";
context.stroke();
}

function drawQueen(queen, x,y){
    
    let img = document.getElementById(queen);

    x += 25;
    y += 25;
    
    context.drawImage(img,y,x); // +90
}

function findQueenSolution(){
    
    //empty board

    board = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
    ];

    //starts in column 0
    solve(board, 0);
}

function hasNoConflicts (board, row, col){
    
    let i,j;

    /* Check this row on left side */
    for(i =0; i < col; i++){
        if(board[row][i]){
            return false;
        }
    }

     /* Check upper diagonal on left side */
    for(i=row, j=col; i>=0 && j>=0; i--, j--){
        if(board[i][j]){
            return false;
        }
    }

     /* Check lower diagonal on left side */

     for (i=row, j=col; j>=0 && i<N; i++, j--){
         if(board[i][j]){
             return false;
         }
     }

     return true;
}

function solve (board, col) {

    if(col >= N){
        //if all queens are on the board
        return true;
    }

    for (let i = 0; i < N; i++) {

        drawQueen("checker",i*90, col*90);

        if(hasNoConflicts(board, i, col)){
            //put queen on board
            board[i][col] = 1;

            drawQueen("space",i*90,col*90);
            drawQueen("queen",i*90,col*90);

            //next column
            if(solve(board, col+1)){
                return true
            }
            //remove queen on board
            board[i][col] = 0;
            drawQueen("space",i*90,col*90);
        }
        else{
            drawQueen("space", i*90, col*90);
        }
    }
    return false;
}


