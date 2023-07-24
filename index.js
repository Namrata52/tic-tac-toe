const boxes =document.querySelectorAll(".box");
const gameInfo =document.querySelector(".game-info");
const newGameBtn =document.querySelector(".btn");

let currentPlayer;
let gameGrid;

const winningPositions= [ [0,1,2] , [3,4,5], [6,7,8],
[1,4,7], [2,5,8],[0,4,8],[2,4,6]];

//lets create a function to initialize the game
function initGame(){
    currentPlayer ="X";
    gameGrid=["","","","","","","","",""];

    boxes.forEach((box,index) =>{
        box.innerText ="";
        boxes[index].style.pointerEvents ="all"
        
        box.classList =`box box${index+1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}
initGame();

function swapTurn(){
    if(currentPlayer ==="X"){
        currentPlayer="O";
    }else{
        currentPlayer="X";
    }
    //UI ko update kr
    gameInfo.innerText =`Current Player -${currentPlayer}`;
}

function checkGameOver(){
    let answer ="";

    winningPositions.forEach((position) =>{
        if( (gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "") 
        && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]]) ){
            //chcek if winner is x
            if(gameGrid[position[0]] ==="X"){
                answer ="X";

            }else{
                answer="O";
            }
            //disable pointer
            boxes.forEach((box)=>{
                box.style.pointerEvents ="none";
            })

            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    })
    if(answer !==""){
    gameInfo,innerText = `Winner Player -${answer}`;
    newGameBtn.classList.add("active");
    return;
    }

 //when there is no answer
  let fillCount =0;
   gameGrid.forEach((box)=>{
    if(box !== ""){
        fillCount++;
    }
  });
   //board is filled
      if (fillCount === 9){
    gameInfo.innerText ="Game Tied!";
    newGameBtn.classList.add("active");
     }

}



boxes.forEach((box,index)=> {
    box.addEventListener("click",() =>{
        handleClick(index);
    })
});

function handleClick(index){
    if(gameGrid[index] ===""){
        //make changes in UI
       boxes[index].innerText =currentPlayer;
       gameGrid[index] =currentPlayer;
       //make pointer events none
       boxes[index].style.pointerEvents ="none";
       //swap
       swapTurn();

       //checkkoi jeet to nhi gaya
       checkGameOver();

    }
}

newGameBtn.addEventListener("click", initGame);
