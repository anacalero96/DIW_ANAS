

$(document).ready(function(){
    $("textarea").countCharacters();
});

$.fn.countCharacters = function(){
    // this.css("background", "pink");
    // return this;

    var texto1 = $("textarea").val();   
    var texto2 = texto1.length;

    $("form").data("test", texto2);

    $("span").html($("form").data("test")+ "characters");


};