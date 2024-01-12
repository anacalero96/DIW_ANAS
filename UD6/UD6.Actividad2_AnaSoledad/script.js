//Juego de memoria

$(document).ready(function(){

    let nRandom;
    let posicionRandom = new Array(20); 
    let aux = false;        // Variable para comprobar si hay dos cartas giradas.
    let girada;
    let nRepeticiones = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];     //Número de veces que se repite el número.

    for(i = 0; i <20;){
        nRandom = Math.floor((Math.random()*10)+1);
        if(nRepeticiones[nRandom -1]<2){
            nRepeticiones[nRandom-1]++;  
            posicionRandom[i] = nRandom;
            i++;    //aumenta una vez añadida la carta.
          
            $(".cartas").append($("<div class='card' value='"+nRandom+"'>"+''+"</div>"));
        }
    };

    $(".card").on("click", function(){
        if($(this).text() != $(this).attr("value")){
            $(this).text($(this).attr("value"));
        } 

        if(aux == true){
            aux = false;
            if($(this).text() == girada.text()){
                $(".mensaje").text("Las cartas son iguales");
            } else {
                $(".mensaje").text("No coinciden las cartas");
                setTimeout(() => { 
                    $(this).text(""); 
                    girada.text(""); 
                    $(".mensaje").text("");
                }, 1000);
            }
        } else {
            aux = true;
            girada = $(this);
        }
    });

    //  $(this).text("");

});