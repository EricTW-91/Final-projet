// Variables
let minefieldArray = [];
let mineCount_show = 10; // Showing how many landmine during playing.
let timer = 0;



function creatMinefieldArray(difficulty){ 
    let mineCount = 0;
    let sideLength = 0;
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
            tempArr.push('');
        }
    }
    tempArr.sort(()=>{return Math.random()-0.5});// It randoms landmines.

    for(c=0; c<sideLength; c++){ // Placing into the minefield
        minefieldArray.push([]);
        for(r=0; r<sideLength; r++){
            minefieldArray[c].push(tempArr[index]);
            index++;
        }
    }

}

const setpuFunctions = {
    
    // Setup difficulty.
    difficultyInput: function(){

    },
    // Setup the minefield.
    setup: function(){
        const difficulty = $('#difficulty').val();

        

        creatMinefieldArray(difficulty); // Creat a minefield array.
        $('.timer').empty().append(0);
        $('.mineCount').empty().append(mineCount_show);
        

        //test
        console.log(difficulty);
        console.log(minefieldArray);
    }
}





// Inital function
function init(){
    $('.mineCount').append(mineCount_show);
    $('.timer').append(0);
    setpuFunctions.setup();  
}


init();