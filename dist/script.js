// Variables
let minefieldArray = [];
let mineCount_show = 10; // Showing how many landmine during playing.
let timerFlag = false;
let timer = 0;
let mineCount = 0;
let sideLength = 0;





// Setup the minefield.
function setup(){
    const difficulty = $('#difficulty').val();

    
    creatMinefieldArray(difficulty);
    $('.timer').text(0);// Reset timer.
    $('.mineCount').text(mineCount_show);// Reset mine count.
    
    $('.minefield').empty().css('grid-template-columns', `repeat(${sideLength} ,1fr)`);

    for(r=0; r<sideLength; r++){
        for(c=0; c<sideLength; c++){
            $('.minefield').append(`<div class="cell">${minefieldArray[r][c]}</div>`)
        }
    }

    //test
    console.log(sideLength);
    console.log(minefieldArray);
}

// Creat a minefield array
function creatMinefieldArray(difficulty){ 
    
    let index = 0;
    let tempArr = [];

    minefieldArray = [];
    

    if(difficulty == 'easy'){ // easy: 8*8(10)
        mineCount = 10;
        sideLength = 8;
        mineCount_show = 10;
    }else if(difficulty == 'medium'){ // medium: 14*14(40)
        mineCount = 40;
        sideLength = 14;
        mineCount_show = 40;
    }else if(difficulty == 'hard'){ // hard: 20*20(99)
        mineCount = 99;
        sideLength = 20;
        mineCount_show = 99;
    }

    // Set landmines in the minefieldArray.
    for(i=0; i<(sideLength**2); i++){
        if(i<mineCount){
            tempArr.push('m');
        }else{
            tempArr.push('x');
        }
    }
    tempArr.sort(()=>{return Math.random()-0.5});// It randoms landmines.

    for(r=0; r<sideLength; r++){ // Placing into the minefield
        minefieldArray.push([]);
        for(c=0; c<sideLength; c++){
            minefieldArray[r].push(tempArr[index]);
            index++;
        }
    }

}

// Setup inital status.
function init(){
    $('.mineCount').append(mineCount_show);
    $('.timer').append(0);
    setup();  
}


init();

// Count the time.
setInterval(()=>{
    if(timerFlag){
        timer++;
        $('.timer').text(timer);  
    }
}, 1000)  