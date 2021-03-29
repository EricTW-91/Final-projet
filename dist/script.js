// Variables
let minefieldArray = [];
let timerFlag = false;
let timer = 0;
let mineCount = 10;
let sideCellsCount = 8;
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext("2d");
let cellLength = 35;
let cellObj = {};
let unrevealedCount = 0;
let arrayCol, arrayRow, choosenCell, positionX, positionY;




// Setup inital status.
function init(){
    // $('.mineCount').append(mineCount_show);
    // $('.timer').append(0);
    setField();  
}

//
function levelSet(level){
    if(level == 'easy'){ // easy: 8*8(10)
        mineCount = 10;
        sideCellsCount = 8;
    }else if(level == 'medium'){ // medium: 14*14(40)
        mineCount = 40;
        sideCellsCount = 14;
    }else if(level == 'hard'){ // hard: 20*20(99)
        mineCount = 99;
        sideCellsCount = 20;
    }
    unrevealedCount = sideCellsCount ** 2;

}

// Setup the minefield.
function setField(){
    const difficulty = document.getElementById('difficulty').value;

    timer = 0;
    timerFlag = false;
    $('.timer').text(timer);// Reset timer.     

    levelSet(difficulty);
    $('.mineCount').text(mineCount);// Reset mine count.

    creatMinefieldArray(difficulty);
    
    // Using Canvas to creat the minefield.
    creatCanvas(sideCellsCount);

}

// Creat a minefield array
function creatMinefieldArray(difficulty){ 
    let index = 0;
    let tempArr = [];
    let arroundCount = 0;

    // Creat a 2 dimentional empty array.
    minefieldArray = Array.from(Array(sideCellsCount), () => new Array(sideCellsCount));
    
    // Set landmines in the minefieldArray.
    for(i=0; i<(sideCellsCount**2); i++){
        if(i<mineCount){
            tempArr.push('x');
        }else{
            tempArr.push('');
        }
    }
    tempArr.sort(()=>{return Math.random()-0.5});// It randoms landmines.

    for(r=0; r<sideCellsCount; r++){ // Placing into the minefield.
        for(c=0; c<sideCellsCount; c++){
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
    for(r=0; r<sideCellsCount; r++){
        for(c=0; c<sideCellsCount; c++){
            arroundCount = 0;
            if(minefieldArray[r][c].content != 'x'){
                cellObj = {};
                // Check landmines arround.
                for(i=(-1); i<2; i++){
                    for(j=(-1); j<2; j++){
                        if((r+i)>=0 && (c+j)>=0 && (r+i)<sideCellsCount && (c+j)<sideCellsCount && minefieldArray[r+i][c+j].content == 'x'){
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

function creatCanvas(sideCount){
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
    
    for(r=0; r<sideCellsCount; r++){
        for(c=0; c<sideCellsCount; c++){
            let cell = minefieldArray[r][c];
            positionX = (canvas.width / sideCellsCount) * cell.x + 10;
            positionY = (canvas.height / sideCellsCount) * cell.y + 30;
            if(cell.status == true && cell.flag == false){
                ctx.fillStyle = "#000000";
                ctx.font = "30px Verdana";
                ctx.fillText(cell.content, positionX, positionY);
            }
        }
    }

    
    
}

function gameOver(result){
    timerFlag = false;
    for(r=0; r<sideCellsCount; r++){
        for(c=0; c<sideCellsCount; c++){
            let cell = minefieldArray[r][c];
        
            if(cell.status == false){
                cell.status = true;
            }
        }
    }
    printout();
    alert(result);
}

function expand(){
    let expandFlag = true;
    while(expandFlag){
        expandFlag = false;
        for(r=0; r<sideCellsCount; r++){
            for(c=0; c<sideCellsCount; c++){
                if(minefieldArray[r][c].content == '0' && minefieldArray[r][c].status == true){
                    // Turn status of landmines arround into true.
                    for(i=(-1); i<2; i++){
                        for(j=(-1); j<2; j++){
                            if((r+i)>=0 && (c+j)>=0 && (r+i)<sideCellsCount && (c+j)<sideCellsCount && minefieldArray[r+i][c+j].status == false){
                            expandFlag = true;
                            }
                            if((r+i)>=0 && (c+j)>=0 && (r+i)<sideCellsCount && (c+j)<sideCellsCount){
                                minefieldArray[r+i][c+j].status = true;
                            }
                        }
                    }
                }
            }
        }
    }
}

function cellRevealed(event){
    timerFlag = true;
    
    let coord = getCoordinate(event);

    // Match coord with minefield array.
    arrayCol = parseInt(coord[0] / (canvas.width / sideCellsCount));
    arrayRow = parseInt(coord[1] / (canvas.height / sideCellsCount));
    choosenCell = minefieldArray[arrayRow][arrayCol];
    
    if(event.button == 0 && choosenCell.flag == false){
        if(choosenCell.status == false){
            choosenCell.status = true;
            unrevealedCount--;
            
            if(unrevealedCount == 0){
                timerFlag = false;
            }
    
            
            if(choosenCell.content == "x"){
                gameOver("lose");
            }else if(choosenCell.content == "0"){
                expand();
            }
            
            
            
            
        }
        
    }else if(event.button == 2){
        positionX = (canvas.width / sideCellsCount) * choosenCell.x + 10;
        positionY = (canvas.height / sideCellsCount) * choosenCell.y + 30;
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
    
    printout();
    
    // Test!!
    
    console.log(minefieldArray[parseInt(arrayRow)][parseInt(arrayCol)]);
    console.log(minefieldArray);
    
}

function getCoordinate(event){
    let rectBounding = document.querySelector('canvas').getBoundingClientRect();
    return [parseInt(event.clientX-rectBounding.left), parseInt(event.clientY-rectBounding.top)];
}

init();

// Count the time.
setInterval(() => {
    if(timerFlag) {
        timer++;
        $('.timer').text(timer);  
    }
}, 1000)  




// Constructor function test

function Test(e) {
    this.a = e;
    console.log(this);
}
Test(3);

// Mouse move x,y test
function draw(event){
    let rectBounding = document.querySelector('canvas').getBoundingClientRect();
    // console.log(`${parseInt(event.clientX-rectBounding.left)}, ${parseInt(event.clientY-rectBounding.top)}`);
}


