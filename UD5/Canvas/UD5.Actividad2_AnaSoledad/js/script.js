//Actividad de Canvas

var sales = [{
    product: "BasketBalls",
    units: 150
}, {
    product: "Baseballs",
    units: 125
}, {
    product: "Footballs",
    units: 300
}];

//Variables 
const canvas = document.getElementById("canvas");
var ctx = canvas.getContext("2d");

ctx.beginPath();

ctx.moveTo(100, 5);
ctx.lineTo(100, 5);

ctx.lineTo(100, 450);
ctx.lineTo(650, 450);

ctx.stroke();

