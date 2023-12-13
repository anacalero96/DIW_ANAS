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

ctx.font = "bold 16px Arial";
ctx.fillText(sales[0].product, 140, 480);

ctx.font = "bold 16px Arial";
ctx.fillText(sales[1].product, 310, 480);

ctx.font = "bold 16px Arial";
ctx.fillText(sales[2].product, 460, 480);


//Primer gráfico.
const grd = ctx.createLinearGradient(130, 0, 240, 0);
grd.addColorStop(0, "#fcaf27");
grd.addColorStop(1, "#EFE2F7");

ctx.fillStyle = grd;
ctx.fillRect(130, 169, 100, 280);

//Segundo gráfico
const grd2 = ctx.createLinearGradient(340, 0, 400, 0);
grd2.addColorStop(0, "#1d9cc3");
grd2.addColorStop(1, "#EFE2F7");

ctx.fillStyle = grd2;
ctx.fillRect(300, 249, 100, 200);

//Tercer gráfico

const grd3 = ctx.createLinearGradient(450, 0, 200, 0);
grd3.addColorStop(0, "#f17d4c");
grd3.addColorStop(1, "#EFE2F7");

ctx.fillStyle = grd3;
ctx.fillRect(475, 200, 100, 249);