// DOM Variables
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
// Global Variables
let sideCount, arrayCol, arrayRow, choosenCell, positionX, positionY, minefieldArray;
let timer = 0;
let mineCount = 10;
let gameStart = false;
let gameOverFlag;
let cellLength = 35; // Define the size of per cell.
let cellObj = {};
let coveredCells = 0;




// Setup inital status.
function init(){
    setField();  
}

function levelSet(level){
    if(level == 'easy'){ // easy: 8*8(10)
        mineCount = 10;
        sideCount = 8;
    }else if(level == 'medium'){ // medium: 14*14(40)
        mineCount = 40;
        sideCount = 14;
    }else if(level == 'hard'){ // hard: 20*20(99)
        mineCount = 99;
        sideCount = 20;
    }
}

// Setup the minefield.
function setField(){
    // $('main').empty().append(`<canvas></canvas>`);

    const difficulty = document.getElementById('difficulty').value;
    timer = 0;
    gameStart = false;
    gameOverFlag = false;
    $('.timer').text(timer);// Reset timer.     

    levelSet(difficulty);
    $('.mineCount').text(mineCount);// Reset mine count.

    creatMinefieldArray(difficulty);
    
    // Using Canvas to creat the minefield.
    creatCanvas();

}

// Creat a minefield array with objects.
function creatMinefieldArray(){ 
    let index = 0;
    let tempArr = [];
    let arroundCount = 0;

    // Creat a 2 dimentional empty array.
    minefieldArray = Array.from(Array(sideCount), () => new Array(sideCount));
    
    // Set landmines in the minefieldArray.
    for(i=0; i<(sideCount**2); i++){
        if(i<mineCount){
            tempArr.push('x');
        }else{
            tempArr.push('');
        }
    }
    tempArr.sort(()=>{return Math.random()-0.5});// It randoms landmines.

    for(r=0; r<sideCount; r++){ // Placing into the minefield.
        for(c=0; c<sideCount; c++){
            cellObj = {};
            cellObj.x = c;
            cellObj.y = r;
            cellObj.status = false; // Reveal or not.
            cellObj.flag = false; // Set flag or not.
            if(tempArr[index] == "x"){
                cellObj.content = "x"; // "x" as mine.
            }else{
                // cellObj.content = "";
            }
            minefieldArray[r][c] = cellObj;
            index++;
        }
    }

    // Set numbers in other cells.
    for(r=0; r<sideCount; r++){
        for(c=0; c<sideCount; c++){
            arroundCount = 0;
            if(minefieldArray[r][c].content != 'x'){
                cellObj = {};
                // Check landmines arround.
                for(i=(-1); i<2; i++){
                    for(j=(-1); j<2; j++){
                        if((r+i)>=0 && (c+j)>=0 && (r+i)<sideCount && (c+j)<sideCount && minefieldArray[r+i][c+j].content == 'x'){
                            arroundCount++;
                        }

                    }
                }
                cellObj.x = c;
                cellObj.y = r;
                cellObj.status = false; // Reveal or not.
                cellObj.content = arroundCount.toString();
                cellObj.flag = false;
                minefieldArray[r][c] = cellObj;
            }
        }
    }


}

function creatCanvas(){
    canvas.width = cellLength * sideCount + sideCount * 3 + 3;
    canvas.height = canvas.width;
    
    // Creat a grid by difficulty
    for(r=0; r<sideCount; r++){
        let x = 3;
        let y = r * (cellLength + 3) + 3;
        for(c=0; c<sideCount; c++){
            x = c * (cellLength + 3) + 3;
            ctx.strokeRect(x,y,cellLength,cellLength);

        }
    }




}

function printout(){
    
    for(r=0; r<sideCount; r++){
        for(c=0; c<sideCount; c++){
            let cell = minefieldArray[r][c];
            positionX = (canvas.width / sideCount) * cell.x + 10;
            positionY = (canvas.height / sideCount) * cell.y + 30;

            if(gameOverFlag == true && cell.flag == true && cell.content != "x"){
                positionX = (canvas.width / sideCount) * cell.x + 10;
                positionY = (canvas.height / sideCount) * cell.y + 30;
                ctx.fillStyle = "red";
                ctx.fillRect(positionX-6, positionY-25, 28, 28);
                ctx.fillStyle = "#FFFFFF";
                ctx.font = "30px Verdana";
                ctx.fillText(cell.content, positionX, positionY);
    
            }else if(cell.status == true && cell.flag == false){
                switch(cell.content){
                    case "x":
                        ctx.fillStyle = "#FFFFFF";
                        ctx.fillRect(positionX-6, positionY-25, 28, 28);
                        ctx.fillStyle = "#FF0000";
                        ctx.font = "30px Verdana";
                        ctx.fillText(cell.content, positionX, positionY);
                        break;
                    case "0":
                        ctx.fillStyle = "#AAAAAA";
                        ctx.fillRect(positionX-6, positionY-25, 28, 28);
                        break;
                    case "1":
                        ctx.fillStyle = "#FFFFFF";
                        ctx.fillRect(positionX-6, positionY-25, 28, 28);
                        ctx.fillStyle = "#000000";
                        ctx.font = "30px Verdana";
                        ctx.fillText(cell.content, positionX, positionY);
                        break;
                    case "2":
                        ctx.fillStyle = "#FFFFFF";
                        ctx.fillRect(positionX-6, positionY-25, 28, 28);
                        ctx.fillStyle = "#0000FF";
                        ctx.font = "30px Verdana";
                        ctx.fillText(cell.content, positionX, positionY);
                        break;
                    case "3":
                        ctx.fillStyle = "#FFFFFF";
                        ctx.fillRect(positionX-6, positionY-25, 28, 28);
                        ctx.fillStyle = "#00BB00";
                        ctx.font = "30px Verdana";
                        ctx.fillText(cell.content, positionX, positionY);
                        break;
                    case "4":
                        ctx.fillStyle = "#FFFFFF";
                        ctx.fillRect(positionX-6, positionY-25, 28, 28);
                        ctx.fillStyle = "#FFBB00";
                        ctx.font = "30px Verdana";
                        ctx.fillText(cell.content, positionX, positionY);
                        break;
                    case "5":
                        ctx.fillStyle = "#FFFFFF";
                        ctx.fillRect(positionX-6, positionY-25, 28, 28);
                        ctx.fillStyle = "#FF00FF";
                        ctx.font = "30px Verdana";
                        ctx.fillText(cell.content, positionX, positionY);
                        break;

                    case "6":
                        ctx.fillStyle = "#FFFFFF";
                        ctx.fillRect(positionX-6, positionY-25, 28, 28);
                        ctx.fillStyle = "#FF0000";
                        ctx.font = "30px Verdana";
                        ctx.fillText(cell.content, positionX, positionY);
                        break;

                    case "7":
                        ctx.fillStyle = "#FFFFFF";
                        ctx.fillRect(positionX-6, positionY-25, 28, 28);
                        ctx.fillStyle = "#00FFFF";
                        ctx.font = "30px Verdana";
                        ctx.fillText(cell.content, positionX, positionY);
                        break;
                    case "8":
                        ctx.fillStyle = "#FFFFFF";
                        ctx.fillRect(positionX-6, positionY-25, 28, 28);
                        ctx.fillStyle = "#900090";
                        ctx.font = "30px Verdana";
                        ctx.fillText(cell.content, positionX, positionY);
                        break;
                }

            }
        }
    }

    
    
}

function gameOver(result){
    gameStart = false;
    gameOverFlag = true;
    for(r=0; r<sideCount; r++){
        for(c=0; c<sideCount; c++){
            let cell = minefieldArray[r][c];
        
            if(cell.status == false){
                cell.status = true;
            }
        }
    }
    alert(result);
    printout();
}

function expand(){
    let expandFlag = true;
    while(expandFlag){
        expandFlag = false;
        for(r=0; r<sideCount; r++){
            for(c=0; c<sideCount; c++){
                if(minefieldArray[r][c].content == '0' && minefieldArray[r][c].status == true){
                    // Turn status of landmines arround into true.
                    for(i=(-1); i<2; i++){
                        for(j=(-1); j<2; j++){
                            if((r+i)>=0 && (c+j)>=0 && (r+i)<sideCount && (c+j)<sideCount){
                                if(minefieldArray[r+i][c+j].status == false){
                                expandFlag = true; // Loop untill there is no uncovered cell been checked.
                                }
                                minefieldArray[r+i][c+j].status = true;
                            }
                        }
                    }
                }
            }
        }
        printout();

    }
}

function revealAround(cell){
    let arroundFlagCount = 0;
    for(i=(-1); i<2; i++){
        for(j=(-1); j<2; j++){
            if((cell.y+i)>=0 && (cell.x+j)>=0 && (cell.y+i)<sideCount && (cell.x+j)<sideCount && minefieldArray[cell.y+i][cell.x+j].flag == true){
                arroundFlagCount++;
            }
        }
    }

    console.log(arroundFlagCount);
    if(arroundFlagCount >= parseInt(cell.content)){
        for(i=(-1); i<2; i++){
            for(j=(-1); j<2; j++){
                if((cell.y+i)>=0 && (cell.x+j)>=0 && (cell.y+i)<sideCount && (cell.x+j)<sideCount && minefieldArray[cell.y+i][cell.x+j].status == false && minefieldArray[cell.y+i][cell.x+j].flag == false){
                    minefieldArray[cell.y+i][cell.x+j].status = true;
                    if(minefieldArray[cell.y+i][cell.x+j].content == "x"){
                        return gameOver("You lose!!!");
                    }else if(minefieldArray[cell.y+i][cell.x+j].content == "0"){
                        expand();
                    }
                }
            }
        }

    }

    printout();
    
}

function checkProgress(){
    coveredCells = sideCount ** 2;
    for(r=0; r<sideCount; r++){
        for(c=0; c<sideCount; c++){
            if(minefieldArray[r][c].flag == true || minefieldArray[r][c].status == true){
                coveredCells--;
            }
        }
    }

    if(coveredCells == 0){
        gameStart = false;
        gameOver("You win!!!");
    }
}

function checkEasyPlay(event){

    let coord = getCoordinate(event);
    
    // Match coord with minefield array.
    arrayCol = parseInt(coord[0] / (canvas.width / sideCount));
    arrayRow = parseInt(coord[1] / (canvas.height / sideCount));
    choosenCell = minefieldArray[arrayRow][arrayCol];

    while(gameStart == false && choosenCell.content != "0"){
        creatMinefieldArray();
        choosenCell = minefieldArray[arrayRow][arrayCol];
        if(choosenCell.content == "0"){
            gameStart = true;
        }
    }

    if(gameStart == true){
        cellRevealed(event);
    }

    console.log(gameStart);
    console.log(minefieldArray);
}

function cellRevealed(event){

    // coord = getCoordinate(event);
    
    // // Match coord with minefield array.
    // arrayCol = parseInt(coord[0] / (canvas.width / sideCount));
    // arrayRow = parseInt(coord[1] / (canvas.height / sideCount));
    // choosenCell = minefieldArray[arrayRow][arrayCol];


    
    if(event.button == 0 && choosenCell.status == true && gameOverFlag == false){
        // Auto reveal cells around the uncoverd cell if enough flags arround.
        revealAround(choosenCell);
    }else if(event.button == 0 && choosenCell.flag == false && gameOverFlag == false && choosenCell.status == false){
        
        gameStart = true;

        choosenCell.status = true;
        if(choosenCell.content == "x"){
            gameStart = false;
            gameOver("You lose!!!");
        }else if(choosenCell.content == "0"){
            expand();
        }
        printout();
        
    }else if(event.button == 2 && gameOverFlag == false){ // Right click on a cell
        positionX = (canvas.width / sideCount) * choosenCell.x + 10;
        positionY = (canvas.height / sideCount) * choosenCell.y + 30;
        if(choosenCell.flag == false){
            choosenCell.flag = true;

            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(positionX-6, positionY-25, 28, 28);
            ctx.font = "30px Verdana";
            ctx.fillStyle = "#000000";
            ctx.fillText("F", positionX, positionY);
        }else if(choosenCell.flag == true){
            choosenCell.flag = false;

            ctx.fillStyle = "#FFFFFF";
            ctx.fillRect(positionX-6, positionY-25, 28, 28);
        }
    }

    if(gameOverFlag == false){
        checkProgress()
    }

    // printout();


}    


function getCoordinate(event){
    let rectBounding = document.querySelector('canvas').getBoundingClientRect();
    return [parseInt(event.clientX-rectBounding.left), parseInt(event.clientY-rectBounding.top)];
}

init();

// Count the time.
setInterval(() => {
    if(gameStart) {
        timer++;
        $('.timer').text(timer);  
    }
}, 1000);





