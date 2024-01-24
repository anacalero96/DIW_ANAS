//https://jqueryui.com/draggable/

//Contadores para recoger la cantidad post-it que hay en cada tablero.
var contadorVioleta = 0;
var contadorTurquesa = 0;




$(document).ready(function(){
    $( ".draggable_violeta, .draggable_turquesa" ).draggable();

    //contenedor1 es el que contiene los post-it de color lila oscuro.
    $("#contenedor1").droppable({
        accept: ".draggable_violeta",       //solo acepta los post-it color violeta/lila
        drop: function(ui){
            violetaId = ui.draggable.prop("id");
            console.log(violetaId);

            if($("div#"+ violetaId).hasClass("purple")){
                console.log("droppable");
            } else{
                contadorVioleta++;
                $("div#"+ violetaId).removeClass("purple");
                $("contenedor1").find("p").html("Hay tantos post-it"+ contadorVioleta);
            }
        }

    });
    //contenedor2 contiene los post-it de color azul.
    $("#contenedor2").droppable({
        accept: ".draggable_turquesa",
        classes: {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
        } 
    });
});




 