//Juego de memoria

$(document).ready(function(){

    let nRandom;

    //Buscar como filtrar los números de manera que no se repita más de dos veces.
    
    for(i = 0; i <20; i++){
        nRandom = Math.floor((Math.random()*10)+1);
        $(".cartas").append($("<div class='card' value='"+nRandom+"'>"+nRandom+"</div>"));
    };



});