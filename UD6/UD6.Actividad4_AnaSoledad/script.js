//https://jqueryui.com/draggable/

$(document).ready(function(){
    $( ".draggable_violeta, .draggable_turquesa" ).draggable();

    //contenedor1 es el que contiene los post-it de color lila oscuro.
    $("#contenedor1").droppable({
        accept: ".draggable_violeta",       //solo acepta los post-it color violeta/lila
        classes: {
            "ui-droppable-active": "ui-state-active",
            "ui-droppable-hover": "ui-state-hover"
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




 