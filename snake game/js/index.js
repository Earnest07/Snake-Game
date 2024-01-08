let inputDir = {x:0, y:0};
let speed = 5;
let lastPaintTime = 0;
let score = 0;
let foodSound1 = new Audio('../assets/food.mp3');
let foodSound2 = new Audio('./assets/foodNew.mp3');
let gameOverSound = new Audio('./assets/KO.mp3');
let musicSound = new Audio('./assets/music.mp3');

let snakeArr = [
    {x: 13, y: 15}
]
food = {x: 6, y: 7};

//   Game Function()\
function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime-lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

function isCollide(snake){
    // If you bump into yourself
    for (let index = 1; index < snake.length; index++) {
        if(snake[index].x === snake[0].x && snake[index].y === snake[0].y){
            return true;
        }
    }
    
    // If you collide in wall
    if(snake[0].x >= 18 || snake[0].x <= 0 || snake[0].y >= 18 || snake[0].y <= 0){
        return true;
    }
        
}

function gameEngine(){
    // Part 1: Updating the game Engine snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x: 0, y: 0};
        alert("Game Over");
        snakeArr = [{x: 13, y: 15}];
        musicSound.play();
        score = 0;
    }

    // If you have eaten the food, increament the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        foodSound1.play();
        foodSound2.play();
        score += 1;
        scoreBox.innerHTML = "Score: "+ score;
        snakeArr.unshift({
            x: snakeArr[0].x + inputDir.x, 
            y: snakeArr[0].y + inputDir.y
        });
        let a = 2; 
        let b = 16;
        food = {
            x: Math.round(a + (b-a)*Math.random()),
            y: Math.round(a + (b-a)*Math.random())
        };
    }

    //Moving the snake
    for (let i = snakeArr.length-2 ; i >= 0; i--) {
        snakeArr[i+1] = {...snakeArr[i]};
    }

    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;

    board.innerHTML = "";
    snakeArr.forEach((e, index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index === 0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('body');
        }
        board.appendChild(snakeElement);
    });

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}



window.requestAnimationFrame(main);
window.addEventListener('keydown', e=>{
    inputDir = {x: 0, y: 1};
    musicSound.play();
    switch (e.key) {
        case 'ArrowUp':
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case 'ArrowDown':
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;
        case 'ArrowLeft':
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;
        case 'ArrowRight':
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }
});