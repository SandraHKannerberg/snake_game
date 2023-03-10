import { 
    update as updateSnake, 
    draw as drawSnake, 
    SNAKE_SPEED,
    getSnakeHead,
    snakeInterSection,
} from './snake.js'

import { 
    update as updateFood, 
    draw as drawFood 
} from './food.js'

import { outsideGrid } from './grid.js';

let lastRenderTime = 0;
let gameOver = false;
const gameBoard = document.getElementById('game-board')

//A game-loop
function main(currentTime) {
    if(gameOver) {
        if (confirm('You Lost. Press OK to restart')) {
            window.location = 'https://sandrahkannerberg.github.io/snake_game/' //Refresh the page
        }
        return //No refresh of the game
    }

    window.requestAnimationFrame(main)
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return;

    console.log('Render')
    lastRenderTime = currentTime;

    update()
    draw()
}

window.requestAnimationFrame(main)

function update(){
    updateSnake()
    updateFood()
    checkDeath()
}

function draw(){
    gameBoard.innerHTML = '';
    drawSnake(gameBoard)
    drawFood(gameBoard)
}

function checkDeath() {
    gameOver = outsideGrid(getSnakeHead()) || snakeInterSection()
}