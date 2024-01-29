

$(document).ready(function(){
    $("textarea").countCharacters();
});


$.fn.countCharacters = function(){
    // this.css("background", "pink");
    // return this;

    var texto1 = $("#text1").val().length;   //Representa el primer textarea
    $("#text1").after("<p> <span id='paco'></span> </p>");

    $("form").data("test", texto1); 
    $("#paco").html($("form").data("test")+ " characters");

    $("#text1").keyup(function(){
        texto1 = $("#text1").val().length; 
        $("form").data("test", texto1); 
        $("#paco").html($("form").data("test")+ " characters");
    });


    var texto2 = $("#text2").val().length;
    $("#text2").after("<p> <span id='paco2'></span> </p>" );

    $("form").data("test2", texto2); 
    $("#paco2").html($("form").data("test2")+ " characters");
  

    $("#text2").keyup(function(){ 
        texto2 = $("#text2").val().length; 
        $("form").data("test2", texto2);
        $("#paco2").html($("form").data("test2")+ " characters");
    });
};

//He usado el nombre de paco en las dos 'id' porque es un nombre recurrente a la hora de hacer pruebas!