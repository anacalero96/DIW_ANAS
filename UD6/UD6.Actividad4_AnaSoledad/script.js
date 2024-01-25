//https://jqueryui.com/draggable/

//Contadores para recoger la cantidad post-it que hay en cada tablero.
var contadorVioleta = 0;
var contadorTurquesa = 0;

var purpleId = 0; //Hace referencia a la id del post-it violeta.
var turquoiseId = 0;


$(document).ready(function(){
    $( ".draggable_violeta, .draggable_turquesa" ).draggable();

    //contenedor1 es el que contiene los post-it de color lila oscuro.
    $("#contenedor1").droppable({
        accept: ".draggable_violeta",       //solo acepta los post-it color violeta/lila
        drop: function(event, ui) {
            violetaId = ui.draggable.prop("id");
            console.log(violetaId);

            if($("div#"+ violetaId).hasClass("purple")){
                console.log("droppable");
            } else{
                contadorVioleta++;
                console.log("OH NO!");
                $("div#"+ violetaId).removeClass("purple");
                $(this).find("p").html("Hay tantos post-it "+ contadorVioleta);
            }
        }
    });

    //contenedor2 contiene los post-it de color azul.
    $("#contenedor2").droppable({
        accept: ".draggable_turquesa",
        drop: function(event, ui){
            turquesaId = ui.draggable.prop("id");
            console.log(turquesaId);

            if($("div#"+ turquesaId).hasClass("turquoise")){
                console.log("droppable");   
            } else {
                contadorTurquesa++;
                console.log("!!!");
                $("div#"+ turquesaId).removeClass("turquoise");
                $(this).find("p").html("Hay tantos post-it "+ contadorTurquesa);
            }
        }
    });
});


$("#crearPost").on("click", function(){
    randPost = Math.floor((Math.random()*2) + 1);
    
    if(randPost === 1){
        purpleId++;
        $("main").append($("<div class='draggable_violeta' id='violeta_"+purpleId+"' ><p></p>post-it</div>"));
    } else {
        turquoiseId++;
        $("main").append($("<div class='draggable_turquesa' id='turquesa_"+turquoiseId+"' ><p></p>post-it</div>"));

    }

});

 