//Juego de memoria

$(document).ready(function(){

    let nRandom;

    for(i = 0; i <20; i++){
        nRandom = Math.floor((Math.random()*10)+1);
        $(".cartas").append($("<div class='card' value='"+nRandom+"'>"+nRandom+"</div>"));
    };

});