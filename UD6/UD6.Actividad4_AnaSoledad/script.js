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
            //Comprueba que la clase está añadida.
            if($("#div#" + violetaId).hasClass("purple-contador")){
                console.log("Este post-it está dentro del cuadro");
            } else {
                contadorVioleta++;
                $("div#" + violetaId).addClass("purple-contador");
                $(this).find("p").html("Hay tantos post-it " + contadorVioleta + " de color violeta");
                console.log(contadorVioleta);
            }
        },
        out: function(event, ui){
            violetaId = ui.draggable.prop("id");

            if($("div#"+ violetaId).hasClass("purple-contador")){
                contadorVioleta--;

                console.log("OH NO!");
                $("div#"+ violetaId).removeClass("purple-contador");
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

            if($("div#"+ turquesaId).hasClass("turquoise-contador")){
                console.log("droppable");   
            } else {
                contadorTurquesa++;
                console.log("!!!");
                $("div#"+ turquesaId).removeClass("turquoise-contador");
                $(this).find("p").html("Hay tantos post-it "+ contadorTurquesa);
            }
        },
        out: function(event, ui){
            turquesaId = ui.draggable.prop("id");

            if($("div#"+ violetaId).hasClass("turquoise-contador")){
                contadorTurquesa--;
                $("div#"+ turquesaId).removeClass("turquoise-contador");
                $(this).find("p").html("Hay tantos post-it "+ contadorTurquesa);
            } 
        }
    });

    $(document).on("click", ".borrar", function(){
        //Coge la id del padre (post-it)
        postId = $(this).parent().attr("id");
        $("#dialog-confirm").dialog("open");
    });

    $(document).on("click", ".mxmin", function(){
        postMxmin = $(this).parent().attr("id");

        $("div#" + postMxmin).removeClass("maximizar");
        $("div#" +  postMxmin).addClass("minimizar");

    });
    $(document).on("click", ".max", function(){
        postMxmin = $(this).parent().attr("id");

        $("div#" + postMxmin).removeClass("minimizar");
        $("div#" +  postMxmin).addClass("maximizar");
    });

    $("#dialog-confirm").dialog({
        resizable: false,
        height: "auto",
        width: 400,
        modal: true,
        autoOpen: false,
        buttons: {
            "Delete all items": function() {
                $('#' + postId).remove();
                $( this ).dialog("close");
            },
            Cancel: function() {
                $( this ).dialog("close");
            }
        }
    });
    
});


$("#crearPost").on("click", function(){
    randPost = Math.floor((Math.random()*2) + 1);
    
    if(randPost === 1){
        purpleId++;
        $("main").append($("<div class='draggable_violeta' id='violeta_"+purpleId+"'><button class='borrar'>x</button><button class='mxmin'>-</button><textarea maxlength='100'></textarea></div>"));
        $( ".draggable_violeta").draggable();
    } else {
        turquoiseId++;
        $("main").append($("<div class='draggable_turquesa' id='turquesa_"+turquoiseId+"'><button class='borrar'>x</button><button class='mxmin'>-</button><textarea maxlength='100'></textarea></div>"));
        $( ".draggable_turquesa" ).draggable();
    }
});

 