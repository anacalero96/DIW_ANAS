//Juego de memoria

$(document).ready(function(){

    let nRandom;
    let aux = false;        //Variable para comprobar si hay dos cartas giradas.
    let girada;
     
    let cantidadCartas = 21;    //Cantidad de cartas disponibles.

    let img = ['abejabee.webp', 'aldeano.jpg', 'creeper.png', 'enderman.gif', 'espada.jpg', 'gatocreeper.webp', 'oveja.gif', 'panda-rolling.gif', 'pico.jpg', 'zombie.jpg'];

    while(cantidadCartas < 4 || cantidadCartas > 20 || cantidadCartas%2 != 0){      //Compara el regango de cartas que vamos a usar y después si son pares.
        cantidadCartas = Math.floor((Math.random()*10)*2);
        console.log(cantidadCartas);
    }
    let nPartida = new Array(cantidadCartas/2); //nPartida son los números que usamos en la partida.

    let nRepeticiones = new Array(cantidadCartas/2);      // Array para verificar que cada numero no se repite más de dos veces.
    
    for(i = 0; i < cantidadCartas/2; i++){
        nRepeticiones[i] = 0;   //Este bucle se utiliza para inicializar nRepeticiones a 0.
    }

    for(i = 0; i < cantidadCartas/2;){
        nRandom = Math.floor((Math.random()*10)+1);
        if(nPartida.indexOf(nRandom) == -1){
            nPartida[i] = nRandom;
            i++;
        }
    };

    
    for(i = 0; i < cantidadCartas;){
        nRandom = Math.floor((Math.random()*10));
        if(nRandom < cantidadCartas/2){
            if(nRepeticiones[nRandom]<2){
                nRepeticiones[nRandom]++;  
                i++;    //Aumenta una vez añadida la carta.
          
                $(".cartas").append($("<div class='card' value='"+nPartida[nRandom]+"'>"+'<img src="./img/fondo.jpg">'+"</div>"));
            } 
        }
        //  $(".cartas").append($("<div class='card' value='"+nPartida[nRandom]+"'>"+'&nbsp'+"</div>"));

    };

    $(".card").on("click", function(){
        if($(this).html().indexOf('img src="."') == -1){
            $(this).html('<img src="./img/'+img[$(this).attr('value')-1]+'">');
        } 

        if(aux == true){
            aux = false;
            if($(this).attr('value') == girada.attr('value')){
                $(".mensaje").text("Las cartas son iguales");
            } else {
                $(".mensaje").text("No coinciden las cartas");
                setTimeout(() => { 
                    $(this).html('<img src="./img/fondo.jpg">'); 
                    girada.html('<img src="./img/fondo.jpg">'); 
                    $(".mensaje").text("");
                }, 500);
            }
        } else {
            aux = true;
            girada = $(this);
        }
    });

});