var client_id = '';
var client_secret = '';
var access_token = '';

//We create the Spotify class with the API to make the call to
function Spotify() {
  this.apiUrl = 'https://api.spotify.com/';
}

var spotify = new Spotify();

$.ajax({
  url: './js/keys.json',
  dataType: 'json',
  success: function (data) {
    client_id = data.client_id;
    client_secret = data.client_secret;
  }
});

//Search for information on an artist, adding the possibility of obtaining their albums.
Spotify.prototype.getArtist = function (artist) {
  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/search?type=artist&q=' + artist,
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    $("#results").empty("");
    // console.log(response);

    let items = response.artists.items;

    items.map(function(item){
      let id = item.id;
      let urlSpotify = item.external_urls.spotify;
      let name = item.name;   //variable para obtener el nombre del artista.

      //Muestra el numero de popularidad del artista.
      let popularity = item.popularity; 
      
      //Comprueba si hay url para las imagenes, en el caso que no hay se pone una imagen predeterminada.
      let src = item.images.length !=0? item.images[0].url :'No_Image_Available.jpg';

      $("#results").append(`
      <div>
        <h3>${name}</h3>
        <h4>${popularity}</h4>
        <a href='${urlSpotify}'><img src='${src}'></a>
      </div>
      `); 
      spotify.getArtistById({id});
      // console.log({src});
    });
  });
};

//Search the albums of an artist, given the id of the artist
Spotify.prototype.getArtistById = function (artistId) {

  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/artists/' + artistId + '/albums',
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    console.log(response);

    $("#results").empty("");

    let items = response.items;

    items.map(function(item){
      let id = item.id;
      let urlSpotify = item.external_urls;
      let name = item.name;

      let src = item.images.length !=0? item.images[0].url :'No_Image_Available.jpg';

      $("#results").append(`
        <div>
          <h3>${name}</h3>
          <a href='${urlSpotify}'><img src='${src}'></a>
        </div>
      `);
      console.log({item});
    });
  });
};

//This fragment is the first thing that is loaded, when the $(document).ready
$(function () {
  $.ajax({
    type: "POST",
    url: "https://accounts.spotify.com/api/token",
    beforeSend: function (xhr) {
      xhr.setRequestHeader ("Authorization", "Basic " + btoa(client_id + ":" + client_secret));
    },
    dataType: "json",
    data: { grant_type: "client_credentials" }
  }).done( function(response) {    
    access_token = response.access_token;    
  });

  // var spotify = new Spotify();

  $('#bgetArtist').on('click', function () {
    // console.log($('#artistName').val());
    spotify.getArtist($('#artistName').val());
  });

  $('#results').on('click', '.artistId', function () {
    spotify.getArtistById($(this).attr("data-id"));
  });

});