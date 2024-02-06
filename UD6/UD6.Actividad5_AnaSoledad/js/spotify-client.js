var client_id = '';
var client_secret = '';
var access_token = '';

//We create the Spotify class with the API to make the call to
function Spotify() {
  this.apiUrl = 'https://api.spotify.com/';
}

//El $.ajax está comentado porque no me funciona, anteriormente si consegui que fuera, pero ahora solo
//me deja consultar los datos utilizando las variables de arriba y poniendo las credenciales ''.

// $.ajax({
//   url: './js/keys.json',
//   dataType: 'json',
//   success: function (data) {
//     client_id = data.client_id;
//     client_secret = data.client_secret;  
//   }
// });

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
    url: this.apiUrl + 'v1/search?type=artist,track&q=' + artist,
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    $("#results").empty("");
    $("#tracks").empty("");
    // console.log(response);
    let items = response.artists.items;

    items.map(function(item){
      let id = item.id;
      // let urlSpotify = item.external_urls.spotify;

      let name = item.name;   //Variable to obtain the artist.

      //Shows the artist's popularity number.
      let popularity = item.popularity; 
      
      //Comprueba si hay url para las imagenes, en el caso que no hay se pone una imagen predeterminada.
      let src = item.images.length !=0? item.images[0].url :'No_Image_Available.jpg';

      $("#results").append(`
        <div>
          <h3>${name}</h3>
          <h4>Popularity: ${popularity}</h4>
          <img id="${id}" src='${src}'>
        </div>
      `); 
    
      $("#" + id).on("click", function(){
        $("#results").empty("");
        $("#tracks").empty("");
        spotify.getArtistById(id);
      });
    });  

    let trackItems = response.tracks.items;

    trackItems.map(function(item){
      let id = item.id;
      let name = item.name;   //Variable to obtain the artist.
      
      $("#tracks").append(`
        <div>
          <h3>${name}</h3>
          <img id="${id}" src=''>
        </div>
      `); 
      spotify.getTracksById(id);
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
    let items = response.items;

    items.map(function(item){
      let id = item.id;
      let name = item.name;
      let src = item.images.length !=0? item.images[0].url :'No_Image_Available.jpg';

      $("#results").append(`
        <div id="${id}">
          <h3>${name}</h3>
          <img src='${src}'>
        </div>
      `);
      
      //When you click on an album, you get the songs.
      $("#" + id + ">img").on("click", function(){
        $("#tracks").empty("");
        spotify.getTracks(id);
      });
    });
  });
};

//Displays the songs in the selected albums.
Spotify.prototype.getTracks = function (albumName) { 
  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/albums/' + albumName + '/tracks',
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    
    let items = response.items;

  //Gets values and inserts them into the html using append.
      items.map(function(item) {
        let name = item.name;  
        let id = item.id;
        $("#tracks").append(`
          <div>
            <h3>${name}</h3>
            <img id="${id}" src=''>
          </div>
        `); 
        spotify.getTracksById(id);
      });
  });
};

//Gets the url of the album image that belongs to a song and allows you to add an image when searching.
Spotify.prototype.getTracksById = function (trackId) {
  $.ajax({
    type: "GET",
    url: this.apiUrl + 'v1/tracks/' + trackId ,
    headers: {
      'Authorization' : 'Bearer ' + access_token
    },
  }).done( function(response){
    console.log(response);

    let src = response.album.images.length !=0? response.album.images[0].url :'No_Image_Available.jpg';
  
    $("#" + trackId).attr("src", src);
  });
}

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

  $('#bgetArtist').on('click', function () {
    // console.log($('#artistName').val());
    spotify.getArtist($('#artistName').val());
  });

  $('#results').on('click', '.artistId', function () {
    // $("#results").empty("");
    spotify.getArtistById($(this).attr("data-id"));
  });
});