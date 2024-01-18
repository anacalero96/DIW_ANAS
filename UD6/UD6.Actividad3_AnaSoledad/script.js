

$(document).ready(function(){
    $("textarea").countCharacters();
});

//https://api.jquery.com/keyup/#on-

$.fn.countCharacters = function(){
    // this.css("background", "pink");
    // return this;

    var texto1 = $("textarea").val();   
    var texto2 = texto1.length;

    $("form").data("test", texto2);

    $("span").html($("form").data("test")+ "characters");

    $("#text1").keyup(function(){

    });


};