let canvas;
let context;
let sound = document.querySelector("#boing");

let start = document.getElementById("btn_start");
let stop = document.getElementById("btn_stop");

let axisX = document.getElementById("axisx");
let axisY = document.getElementById("axisy");

canvas = document.getElementById('2d-animation-canvas');
context = canvas.getContext('2d');

let intervalo;



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
   
};

//Variable para parar el intervalo

start.addEventListener("click", (e) =>{
  //añadir los axis
  intervalo = setInterval(moverBola, 20);
});

stop.addEventListener("click", (e) => {
  clearInterval(intervalo);
});

