const canvas = document.getElementById('snakecanvas');
const ctx = canvas.getContext('2d');
const box = 20;
let snake = [{ x: 10, y: 10 }];
let direction = 'right';
let food = {};
let comidaconsumida=0;
let speed=150;

function drawsnake() {
    ctx.fillStyle = 'green';
    snake.forEach(segment => {
        ctx.fillRect(segment.x * box, segment.y * box, box, box);
        ctx.strokeStyle = 'white';
        ctx.strokeRect(segment.x * box, segment.y * box, box, box);

    });


}

function drawfood(){
    ctx.fillStyle='red';
    ctx.fillRect(food.x*box,food.y*box,box,box);
}

function drawscore(){
    ctx.fillStyle='black';
    ctx.font= '30px Arial' ;
    ctx.fillText(`score: ${comidaconsumida}`,10,30);
}



function gerenciaposicao( ){
    let foodx,foody;
    do{
        foodx=Math.floor(Math.random()* (canvas.width/box));
        foody=Math.floor(Math.random()* (canvas.height/box));
    }
    while(snake.some(segment => segment.x===foodx && segment.y===foody));
    return{x:foodx, y:foody};
}

function movesnake() {
    const head = { x: snake[0].x, y: snake[0].y };

    switch (direction) {
        case 'up':
            head.y--;
            break;

        case 'down':
            head.y++;
            break;
        case 'left':
            head.x--;
            break;
        case 'right':
            head.x++;
            break;
    }
    if(head.x < 0 || head.x>= canvas.width/box || head.y<0 || head.y>= canvas.height/box){
        clearInterval(game);
        alert('gameover você bateu na borda');
        return;
    }

    if(head.x === food.x && head.y=== food.y){
        food=gerenciaposicao();
        comidaconsumida++;
        if(comidaconsumida%5===0){
            speed *=0.8;
            clearInterval(game);
            game=setInterval(gameLoop,speed);
        }
    }
    else{
         snake.pop();
    }
    snake.unshift(head);
   
}

function drawboard() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < canvas.width / box; i++) {
        for (let j = 0; j < canvas.height / box; j++) {

            ctx.fillStyle = (i + j) % 2 === 0 ? '#ffffff' : '#cdcdcd';

            ctx.fillRect(i * box, j * box, box, box);

        }




    }
}

document.addEventListener('keydown', e => {
    switch (e.key) {

        case 'w':

            direction = 'up';

            console.log("para cima");

            break;

        case 's':

            direction = 'down';

            console.log("para baixo");

            break;

        case 'a':

            direction = 'left';

            console.log("esquerda");

            break;

        case 'd':

            direction = 'right';

            console.log("direita");

            break;

    }
});

function gameLoop() {
  
    drawboard();

    drawsnake();
    movesnake();
    drawfood();
    drawscore();
}
food=gerenciaposicao();
let game=setInterval(gameLoop, 150);