let canvas;
let context;
let sound = document.querySelector("#boing");

canvas = document.getElementById('2d-animation-canvas');
context = canvas.getContext('2d');

function draw(x, y) {
  context.fillStyle = "#8E6FA4";
  context.beginPath();
  context.arc(x,y,10,0,Math.PI * 2,true);
  context.fill();
}

function clearCanvas() {
  canvas.width = canvas.width;
}

var ballX = 60;
var ballY = 60;
var directionX = 2;
var directionY = 2;

draw(ballX, ballY);

function moverBola(){
    setInterval(function(){
    if (ballX > 520 || ballX < 0){
      directionX *= -1;
      sound.play();
    }

    if (ballY < 0 || ballY > 520){
      directionY *= -1;
      sound.play();
    }

    ballX += directionX;
    ballY += directionY;
    clearCanvas();
    draw(ballX, ballY);

  }, 35)
};

//Variable para parar el intervalo

function stopInterval(){
  
}